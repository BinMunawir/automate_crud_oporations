import 'io.dart';

class Routers {
  IO _io = IO();
  String _root;
  String _dir;

  Routers(this._root) {
    this._dir = this._root + 'src/routers/';
    _io.createDir(this._dir);
  }

  void generate() {
    this._generateRouters();
  }

  void _generateRouterIndex(List<String> routes) {
    String _getImports() {
      String content = '';
      routes.forEach(
          (n) => content += 'import ' + n + ' from "./' + n + '.routes";\n');
      return content;
    }

    String _getExport() {
      String content = '';
      routes.forEach((n) => content += '...' + n + ', ');
      return 'export default [' + content + '];';
    }

    String content = '''
          ''' +
        _getImports() +
        '\n\n' +
        _getExport() +
        '''
        ''';

    _io.createFile(this._dir + 'index.ts');
    _io.writeFile(this._dir + 'index.ts', content);
  }

  void _generateRouters() {
    List<Endpoint> endpoints = this._io.getEndpoints();
    Map<String, List<List<String>>> routes = Map();

    endpoints.forEach((e) {
      String _getRoute() {
        List<String> pathes = e.path.split('/');
        String r = pathes[pathes.length - 1];
        if (r.contains(':')) r = pathes[pathes.length - 2];
        return r;
      }

      String _getFunName() {
        String func;
        String name = e.path.split('/')[e.path.split('/').length - 1];
        if (name.contains(':'))
          name = name[1].toUpperCase() + name.substring(2, name.indexOf('ID'));
        else
          name = name[0].toUpperCase() + name.substring(1);
        if (e.method == "GET")
          func = 'get' + name;
        else if (e.method == "POST")
          func = 'create' + name;
        else if (e.method == "PUT")
          func = 'update' + name;
        else if (e.method == "DELETE") func = 'delete' + name;
        return func + '';
      }

      String r = _getRoute();
      List<String> content = [];
      content.add(e.method);
      content.add(e.path);
      content.add(_getFunName());
      
      if (routes[r] == null) routes[r] = [];
      routes[r].add(content);
    });

    routes.forEach((k, v) {
      String _getFunctions() {
        String content = '';
        v.forEach((r) {
          content += r[2] + ', ';
        });
        return content;
      }

      String _getFunContent(String func) {
        String content;
        if (func.contains('get')) {
          content = '''
          let data = await ''' +
              func +
              '''(req.params, req.query, req.headers);
          res.status(200).send(data);
          ''';
        } else if (func.contains('delete')) {
          content = '''
          await ''' +
              func +
              '''(req.params, req.query, req.headers);
          res.status(200).send();
          ''';
        } else {
          content = '''
          await ''' +
              func +
              '''(req.params, req.query, req.headers, req.body);
          res.status(200).send();
          ''';
        }
        return content + '';
      }

      String _getRoutes() {
        String content = '';
        v.forEach((r) {
          content += '''
          {
            path: "/api/''' +
              r[1] +
              '''",
            method: "''' +
              r[0] +
              '''",
            handler: [
              async (req: Request, res: Response) => {
                ''' +
              _getFunContent(r[2]) +
              '''
              }
            ]
          },

          ''';
        });
        return content;
      }

      String content = '''
      import { Request, Response } from "express";
      import { ''' +
          _getFunctions() +
          ''' } from "../services/''' +
          k +
          '''.service";

      export default [ 
        ''' +
          _getRoutes() +
          '''
      ];
      ''';
      _io.createFile(this._dir + k + '.route.ts');
      _io.writeFile(this._dir + k + '.route.ts', content);
    });
    this._generateRouterIndex(routes.keys.toList());
  }
}
