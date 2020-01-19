import '../../io.dart';

class Routers {
  IO _io = IO();
  String _root;
  String _dir;

  Routers(this._root) {
    this._dir = this._root + 'src/routes/';
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
    Map<String, List<Map<List<String>, List<String>>>> routes = Map();

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
        if (e.path.contains('auth'))
          return name;
        else if (name.contains(':'))
          name = name[1].toUpperCase() + name.substring(2, name.indexOf('ID'));
        else
          name = name[0].toUpperCase() + name.substring(1);

        if (e.method == "GET")
          func = 'get' + name;
        else if (e.method == "POST") {
          name = e.params[0].substring(0, e.params[0].indexOf('ID'));
          func = 'create' + name[0].toUpperCase() + name.substring(1);
        } else if (e.method == "PUT")
          func = 'update' + name;
        else if (e.method == "DELETE") func = 'delete' + name;
        return func + '';
      }

      String r = e.path.contains('auth') ? 'auth' : _getRoute();
      List<String> content = [];
      content.add(e.method);
      content.add(e.path);
      content.add(_getFunName());

      if (routes[r] == null) routes[r] = [];
      routes[r].add({e.params: content});
    });

    routes.forEach((k, r) {
      String _getFunctions() {
        String content = '';
        r.forEach((f) {
          f.forEach((p, c) => {content += c[2] + ', '});
        });
        return content;
      }

      String _getModel() {
        String content = '';
        this._io.getTables().forEach((t) {
          String model;
          Map<String, dynamic> params = Map();
          if (t.name.toLowerCase() == 'users' && k == 'auth') {
            model = 'auth';
            t.params.forEach((p) {
              if (p[1].contains('INT'))
                params.addAll({p[0]: 0});
              else if (!p[1].contains('CHAR') && p[1].length > 0)
                params.addAll({p[0]: "{mimetype: '" + p[1] + "',}"});
              else
                params.addAll({p[0]: "''"});
            });
            content += """
            let type: UserModel = 
              """ +
                params.toString() +
                """
            """;
          }
          if (t.name.toLowerCase() == k) {
            model = t.params[0][0][0].toUpperCase() +
                t.params[0][0].substring(1, t.params[0][0].indexOf('ID'));
            t.params.forEach((p) {
              if (p[1].contains('INT'))
                params.addAll({p[0]: 0});
              else if (!p[1].contains('CHAR') && p[1].length > 0)
                params.addAll({p[0]: "{mimetype: '" + p[1] + "',}"});
              else
                params.addAll({p[0]: "''"});
            });
            content += """
            let type: """ +
                model +
                """Model = 
              """ +
                params.toString() +
                """
            """;
          }
        });
        return content;
      }

      String _getFunContent(List<String> p, String func) {
        String _getParameters(List<String> p) {
          String content = "";
          p.forEach((s) => content += "'" + s + "', ");
          return content;
        }

        String content;
        if (func == 'signup') {
          content = '''
        let accepted: string[] = [''' +
              _getParameters(p) +
              ''']
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await signup(body);
        res.status(200).send();
          ''';
        } else if (func == 'login') {
          content = '''
        let accepted: string[] = [''' +
              _getParameters(p) +
              ''']
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        let data = await login(body);
        res.status(200).send(data);
          ''';
        } else if (func.contains('get')) {
          content = '''
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = [''' +
              _getParameters(p) +
              '''];
        let data = await ''' +
              func +
              '''(query, accepted);
        res.status(200).send(JSON.stringify(data));
          ''';
        } else if (func.contains('delete')) {
          content = '''
          // TODO: implementation
          ''';
        } else {
          content = '''
        let query = { ...req.params, ...utilities.checkQuery(req.query, type) };
        let accepted: string[] = [''' +
              _getParameters(p) +
              ''']
        let body = utilities.acceptedBody(accepted, await utilities.checkBody(req.body, type, req.params));
        await ''' +
              func +
              '''(query, body);
        res.status(200).send();
          ''';
        }
        return content + '';
      }

      String _getRoutes() {
        String content = '';
        r.forEach((f) {
          f.forEach((p, c) => {
                content += '''
          {
            path: "''' +
                    c[1] +
                    '''",
            method: "''' +
                    c[0].toLowerCase() +
                    '''",
            handler: [
              async (req: any, res: any) => {
                ''' +
                    _getFunContent(p, c[2]) +
                    '''
              }
            ]
          },

          '''
              });
        });
        return content;
      }

      String content = '''
import * as utilities from "../utilities";
      import { ''' +
          _getFunctions() +
          ''' } from "../services/''' +
          k +
          '''.service";

          ''' +
          _getModel() +
          '''

      export default [ 
        ''' +
          _getRoutes() +
          '''
      ];
      ''';
      _io.createFile(this._dir + k + '.routes.ts');
      _io.writeFile(this._dir + k + '.routes.ts', content);
    });
    this._generateRouterIndex(routes.keys.toList());
  }
}
