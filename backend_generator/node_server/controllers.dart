import '../../io.dart';

class Controllers {
  IO _io = IO();
  String _root;
  String _dir;

  Controllers(this._root) {
    this._dir = this._root + 'src/controllers/';
    _io.createDir(this._dir);
  }

  void generate() {
    this._generateControllers();
  }

  void _generateControllers() {
    List<Endpoint> endpoints = this._io.getEndpoints();
    Map<String, List<String>> controllers = Map();

    endpoints.forEach((e) {
      String _getController() {
        List<String> pathes = e.path.split('/');
        String r = pathes[pathes.length - 1];
        if (r.contains(':')) r = pathes[pathes.length - 2];
        return r;
      }

      String _getFuncName() {
        String func;
        String name = e.path.split('/')[e.path.split('/').length - 1];
        if (name.contains(':'))
          name = name[1].toUpperCase() + name.substring(2, name.indexOf('ID'));
        else
          name = name[0].toUpperCase() + name.substring(1);

        if (e.method == "GET")
          func = 'get' + name;
        else if (e.method == "POST") {
          // name = e.params[0].substring(0, e.params[0].indexOf('ID'));
          func = 'create' + name; // name[0].toUpperCase() + name.substring(1);
        } else if (e.method == "PUT")
          func = 'update' + name;
        else if (e.method == "DELETE") func = 'delete' + name;

        return func + '';
      }

      String s = _getController();
      if (controllers[s] == null) controllers[s] = [];
      controllers[s].add(_getFuncName());
    });

    controllers.forEach((k, v) {
      String _getFunctions() {
        String tableName = k[0].toUpperCase() + k.substring(1);
        String content = '';
        v.forEach((f) {
          if (f.contains('get')) {
            if (f == 'get' + tableName)
              content += """
export async function """ +
                  f +
                  """(query: any, requestedData: any[]) {
    try {
        return await service.sqlStorage.sqlRead('""" +
                  tableName +
                  """', query, requestedData);
    } catch (e) {
        throw e;
    }
}

            """;
            else
              content += """
export async function """ +
                  f +
                  """(query: any, requestedData: any[]) {
    try {
        let d = (await service.sqlStorage.sqlRead('""" +
                  tableName +
                  """', query, requestedData));
                  if(d.length == 0) throw new HTTP400Error(5642, 'there is no data by that id');
                  return d[0]
    } catch (e) {
        throw e;
    }
}

            """;
          } else if (f.contains('create')) {
            content += """
export async function """ +
                f +
                """(data: any) {
    try {
        await service.sqlStorage.sqlCreate('""" +
                tableName +
                """', data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            """;
          } else if (f.contains('update')) {
            content += """
export async function """ +
                f +
                """(query: any, data: any) {
    try {
        await service.sqlStorage.sqlUpdate('""" +
                tableName +
                """', query, data);
    } catch (e) {
        throw e;
    }
}
            """;
          } else if (f.contains('delete')) {
            content += """
export async function """ +
                f +
                """(query: any) {
    try {
        await service.sqlStorage.sqlDelete('""" +
                tableName +
                """', query);
    } catch (e) {
        throw e;
    }
}
            """;
          }
        });
        return content;
      }

      String content = '''
import { HTTP400Error } from "../models/http400error";
import * as utilities from "../utilities";
import service from "../services";

        ''' +
          _getFunctions() +
          '''
      ''';
      this._io.createFile(this._dir + k + '.controller.ts');
      this._io.writeFile(this._dir + k + '.controller.ts', content);
    });
  }
}
