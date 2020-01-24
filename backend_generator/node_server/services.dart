import '../../io.dart';

class Services {
  IO _io = IO();
  String _root;
  String _dir;

  Services(this._root) {
    this._dir = this._root + 'src/services/';
    _io.createDir(this._dir);
  }

  void generate() {
    this._generateServices();
  }

  void _generateServices() {
    List<Endpoint> endpoints = this._io.getEndpoints();
    Map<String, List<String>> services = Map();

    endpoints.forEach((e) {
      String _getService() {
        List<String> pathes = e.path.split('/');
        String r = pathes[pathes.length - 1];
        if (r.contains(':')) r = pathes[pathes.length - 2];
        return r;
      }

      String _getFuncName() {
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
          // name = e.params[0].substring(0, e.params[0].indexOf('ID'));
          func = 'create' + name; // name[0].toUpperCase() + name.substring(1);
        } else if (e.method == "PUT")
          func = 'update' + name;
        else if (e.method == "DELETE") func = 'delete' + name;

        return func + '';
      }

      String s = e.path.contains('auth') ? 'auth' : _getService();
      if (services[s] == null) services[s] = [];
      services[s].add(_getFuncName());
    });

    services.forEach((k, v) {
      String _getFunctions() {
        String tableName = k[0].toUpperCase() + k.substring(1);
        String content = '';
        v.forEach((f) {
          if (f == 'signup') {
            content += """
export async function signup(data: any) {
    if (data.password == null)
        throw new HTTP400Error(105, 'password is required');

    try {
        await facade.sqlStorage.sqlCreate('Users', data)
    } catch (e) {
        if (e.message.includes('image upload failed'))
            throw new HTTP400Error(103, 'error: image upload failed')
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            """;
          } else if (f == 'login') {
            content += """
export async function login(query: any) {
    if (query.userID == null || query.password == null)
        throw new HTTP400Error(105, 'userID and password are required');
    query = { userID: query.userID, password: query.password }
    try {
        let d = await facade.sqlStorage.sqlRead('Users', query)
        if (d.length == 0)
            throw new Error('no user by that id')
        let token = utilities.getToken(query.userID);
        d = {
            token: token,
            profile: d
        }
        return d;
    } catch (e) {
        if (e.message.includes('no user'))
            throw new HTTP400Error(107, 'username or password are incorrect')
        throw e;
    }
}
            """;
          } else if (f.contains('get')) {
            if (f == 'get' + tableName)
              content += """
export async function """ +
                  f +
                  """(query: any, requestedData: any[]) {
    try {
        return await facade.sqlStorage.sqlRead('""" +
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
        let d = (await facade.sqlStorage.sqlRead('""" +
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
        await facade.sqlStorage.sqlCreate('""" +
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
        await facade.sqlStorage.sqlUpdate('""" +
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
        await facade.sqlStorage.sqlDelete('""" +
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
import facade from "../facades";

        ''' +
          _getFunctions() +
          '''
      ''';
      this._io.createFile(this._dir + k + '.service.ts');
      this._io.writeFile(this._dir + k + '.service.ts', content);
    });
  }
}
