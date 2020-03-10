import '../../../../src/endpoint.dart';
import '../../../../src/io.dart';
import '../../../../src/model.dart';

class Route {
  IO _io = IO();
  Model _model;
  String _content = '';

  Route(this._model);

  void run() {
    this.importContent();
    this.typeContent();
    this.routesContent();
    this.writeRoute();
    print('done');
  }

  void importContent() {
    String content = 'import { ';

    this
        ._model
        .endpoints
        .forEach((e) => content += this._getEndpointFunction(e) + ', ');

    content += '} from "../controllers/' +
        this._model.pluralName +
        '.controller";\n' +
        'import { checkQuery, verifyToken, checkBody, acceptedBody } from "../utilities";\n\n';
    this._content += content;
  }

  void typeContent() {
    String content = 'let ' +
        this._model.singlarName +
        'Type: ' +
        this._model.singlarName[0] +
        this._model.singlarName.substring(1) +
        'Model = {\n';
    this._model.getDependencyModels().forEach((d) {
      content += d.singlarName + "ID: '',\n";
    });
    content += this._model.singlarName + "ID: '',\n";
    this._model.fields.forEach((f) {
      content += f.name + ': ';
      if (f.type.length == 0 || f.type.contains('CHAR'))
        content += "'',\n";
      else if (f.type.contains('INT')) content += '0,\n';
    });
    content += '}\n\n';

    this._content += content;
  }

  void routesContent() {
    String content = 'export default ';
    List<String> routes = [];

    this._model.endpoints.forEach((e) {
      if (e.method == 'GET')
        routes.add(this._getMethod(e));
      else if (e.method == 'POST')
        routes.add(this._postMethod(e));
      else if (e.method == 'PUT')
        routes.add(this._putMethod(e));
      else if (e.method == 'DELETE') routes.add(this._deleteMethod(e));
    });

    this._content += content + routes.toString();
  }

  String _getMethod(Endpoint e) {
    return '''
  {
    path: "''' +
        e.path +
        '''",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, ''' +
        this._model.singlarName +
        '''Type) };
        let accepted = ''' +
        this._getEndpointParams(e) +
        ''';
        let data = await ''' +
        this._getEndpointFunction(e) +
        '''(query, accepted);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
''';
  }

  String _postMethod(Endpoint e) {
    return '''
  {
    path: "''' +
        e.path +
        '''",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let preventedList: string[] = []
        let body = acceptedBody(preventedList, checkBody(req.body, ''' +
        this._model.singlarName +
        '''Type));
        await ''' +
        this._getEndpointFunction(e) +
        '''(body);
        res.status(200).send();
      }
    ]
  }
''';
  }

  String _putMethod(Endpoint e) {
    return '''
  {
    path: "''' +
        e.path +
        '''",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params, ...checkQuery(req.query, ''' +
        this._model.singlarName +
        '''Type) };
        let accepted: string[] = []
        let body = acceptedBody(accepted, await checkBody(req.body, ''' +
        this._model.singlarName +
        '''Type, req.params));
        
        await ''' +
        this._getEndpointFunction(e) +
        '''(query, body);
        res.status(200).send();
      }
    ]
  }
''';
  }

  String _deleteMethod(Endpoint e) {
    return '''
  {
    path: "''' +
        e.path +
        '''",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        let query = { ...req.params};
        await ''' +
        this._getEndpointFunction(e) +
        '''(query);
        res.status(200).send();
      }
    ]
  }
''';
  }

  void writeRoute() {
    this._io.createFile(
        this._io.generatedProjectsPath +
            '/' +
            this._io.getConfigContent()['projectName'] +
            '/src/routes/' +
            this._model.pluralName +
            '.route.ts',
        override: true);
    this._io.writeToFile(
        this._io.generatedProjectsPath +
            '/' +
            this._io.getConfigContent()['projectName'] +
            '/src/routes/' +
            this._model.pluralName +
            '.route.ts',
        this._content);
  }

  String _getEndpointParams(Endpoint e) {
    e.params = e.params.map((p) {
      return "'" + p + "'";
    }).toList();

    return e.params.toString();
  }

  String _getEndpointFunction(Endpoint e) {
    String func = '';
    if (e.method == 'GET')
      func += 'get';
    else if (e.method == 'POST')
      func += 'create';
    else if (e.method == 'PUT')
      func += 'update';
    else if (e.method == 'DELETE') func += 'delete';

    if (e.path.substring(e.path.lastIndexOf('/') + 1) ==
        ':${this._model.singlarName}ID')
      func += this._model.singlarName[0].toUpperCase() +
          this._model.singlarName.substring(1);
    else
      func += this._model.pluralName[0].toUpperCase() +
          this._model.pluralName.substring(1);

    this._model.depends.asMap().forEach((i, m) {
      this._io.getModels()[m].getDependencyModels().asMap().forEach((i, m) {
        if (!e.path.contains(m.singlarName + 'ID')) return;
        if (i == 0) func += 'By';
        func +=
            m.singlarName[0].toUpperCase() + m.singlarName.substring(1) + "ID";
        func += 'And';
      });
      Model d = this._io.getModels()[m];
      if (!e.path.contains(d.singlarName + 'ID')) return;
      if (!func.contains('By')) func += 'By';
      if (i != 0) func += 'And';
      func +=
          d.singlarName[0].toUpperCase() + d.singlarName.substring(1) + "ID";
    });

    return func;
  }
}
