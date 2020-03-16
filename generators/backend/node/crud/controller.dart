import '../../../../src/endpoint.dart';
import '../../../../src/io.dart';
import '../../../../src/model.dart';
import 'utilities.dart';

class CrudController {
  IO _io = IO();
  Utilities _utilities = Utilities();
  Model _model;
  String _content = '';

  CrudController(this._model);

  void run() {
    this.importContent();
    this.controllersContent();
    this.writecontroller();
  }

  void importContent() {
    String content = '''
import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
const shortid = require('shortid');
import facade from "../services";


''';
    this._content += content;
  }

  void controllersContent() {
    String content = '';

    this._model.endpoints.forEach((e) {
      if (e.method == 'GET')
        content += this._getMethod(e);
      else if (e.method == 'POST')
        content += this._postMethod(e);
      else if (e.method == 'PUT')
        content += this._putMethod(e);
      else if (e.method == 'DELETE') content += this._deleteMethod(e);
    });

    this._content += content;
  }

  String _getMethod(Endpoint e) {
    if (this._utilities.getEndpointFunction(e).contains('All'))
      return """
export async function """ +
          this._utilities.getEndpointFunction(e) +
          """(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('""" +
          this._model.pluralName[0].toUpperCase() +
          this._model.pluralName.substring(1) +
          """', query, requestedData);
    } catch (e) {
        throw e;
    }
}


""";
    return """
export async function """ +
        this._utilities.getEndpointFunction(e) +
        """(query: any, requestedData: any[]) {
    try {
        let data = await facade.sqlStorage.sqlRead('""" +
        this._model.pluralName[0].toUpperCase() +
        this._model.pluralName.substring(1) +
        """', query, requestedData);
        if(data.length == 0) 
          throw new HTTP400Error(1111, 'there is no data by that ID')
        return data[0];
    } catch (e) {
        throw e;
    }
}


""";
  }

  String _postMethod(Endpoint e) {
    return """
export async function """ +
        this._utilities.getEndpointFunction(e) +
        """(data: any) {
    try {
        if (!data.""" +
        this._model.singlarName +
        """ID) data.""" +
        this._model.singlarName +
        """ID = shortid.generate();

        """ +
        this._utilities.handleFilesUpload(this._model) +
        this._utilities.handleRequiredFields(this._model) +
        """
        
                return await facade.sqlStorage.sqlCreate('""" +
        this._model.pluralName[0].toUpperCase() +
        this._model.pluralName.substring(1) +
        """', data)
            } catch (e) {
                throw e;
            }
        }
        
        
        """;
  }

  String _putMethod(Endpoint e) {
    return """
        export async function """ +
        this._utilities.getEndpointFunction(e) +
        """(query: any, data: any) {
            try {
              """ +
        this._utilities.handleFilesUpload(this._model) +
        """

                return await facade.sqlStorage.sqlUpdate('""" +
        this._model.pluralName[0].toUpperCase() +
        this._model.pluralName.substring(1) +
        """', query, data)
            } catch (e) {
                throw e;
            }
        }
        
        
        """;
  }

  String _deleteMethod(Endpoint e) {
    return """
        export async function """ +
        this._utilities.getEndpointFunction(e) +
        """(query: any) {
            try {
                return await facade.sqlStorage.sqlDelete('""" +
        this._model.pluralName[0].toUpperCase() +
        this._model.pluralName.substring(1) +
        """', query)
            } catch (e) {
                throw e;
            }
        }
        
        
        """;
  }

  void writecontroller() {
    String controllersPath = this._io.projectsPath +
        '/' +
        this._io.getConfigContent()['projectName'] +
        '/src/controllers/';

    this._io.createFile(
        controllersPath + this._model.pluralName + '.controller.ts',
        override: true);
    this._io.writeToFile(
        controllersPath + this._model.pluralName + '.controller.ts',
        this._content);
  }
}
