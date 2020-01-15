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
          name = e.params[0].substring(0, e.params[0].indexOf('ID'));
          func = 'create' + name[0].toUpperCase() + name.substring(1);
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
        String _getAuth() {
          return '''
    if(params.userID != null) {
      try {
          verifyToken(params.userID, headers.auth)
      } catch (e) {
          throw new HTTP400Error(101, "error: you are not authorized to this endpoint")
      }
    }

          ''';
        }

        String tableName = k[0].toUpperCase() + k.substring(1);
        String content = '';
        v.forEach((f) {
          if (f == 'signup') {
            content += """
export async function """ +
                f +
                """(headers: any, body: any) {
    if (body.userID == null || body.password == null)
        throw new HTTP400Error(105, 'userID and password are required');
    try {
        let d = await facade.sqlStorage.sqlCreate('Users', body)
        return JSON.stringify(d);
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}
            """;
          } else if (f == 'login') {
            content += """
export async function """ +
                f +
                """(headers: any, body: any) {
    if (body.userID == null || body.password == null)
        throw new HTTP400Error(105, 'userID and password are required');
    body = { userID: body.userID, password: body.password }
    try {
        let d = await facade.sqlStorage.sqlRead('Users', body)
        if (d.length == 0)
            throw new Error('no user by that id')
        let token = getToken(body.userID);
        d = {
            token: token,
            profile: d
        }
        return JSON.stringify(d);
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
                  """(params: any, query: any, headers: any) {

                  """ +
                  _getAuth() +
                  """
                  try {
                      let dbQuery = { ...params, ...query };
                      let d = await facade.sqlStorage.sqlRead('""" +
                  tableName +
                  """', dbQuery)
                      return JSON.stringify(d);
                  } catch (e) {
                      throw e;
                  }
              }

            """;
            else
              content += """
              export async function """ +
                  f +
                  """(params: any, query: any, headers: any) {

                """ +
                  _getAuth() +
                  """
                try {
                    let dbQuery = { ...params, ...query };
                    let d = await facade.sqlStorage.sqlRead('""" +
                  tableName +
                  """', dbQuery)
                    if (d.length == 0)
                        throw new Error('error: there is no data by that id')
                    return JSON.stringify(d[0]);
                } catch (e) {
                    if (e.message.includes("there is no data by that id"))
                        throw new HTTP400Error(102, e.message);
                    throw e;
                }
              }

            """;
          } else if (f.contains('create')) {
            content += """
              export async function """ +
                f +
                """(params: any, query: any, headers: any, body: any) {
                  """ +
                _getAuth() +
                """
                  try {
                      let d = await facade.sqlStorage.sqlCreate('""" +
                tableName +
                """', body)
                      return JSON.stringify(d);
                  } catch (e) {
                      throw e;
                  }
              }

            """;
          } else if (f.contains('update')) {
            content += """
              export async function """ +
                f +
                """(params: any, query: any, headers: any, body: any) {
                  """ +
                _getAuth() +
                """
                  try {
                    let dbQuery = { ...params, ...query };
                    let d = await facade.sqlStorage.sqlUpdate('""" +
                tableName +
                """', body, dbQuery)
                      return JSON.stringify(d);
                  } catch (e) {
                      throw e;
                  }
              }
              
            """;
          } else if (f.contains('delete')) {
            content += """
              export async function """ +
                f +
                """(params: any, query: any, headers: any) {
                """ +
                _getAuth() +
                """
                try {
                    let dbQuery = { ...params, ...query };
                    let d = await facade.sqlStorage.sqlDelete('""" +
                tableName +
                """', dbQuery)
                      return JSON.stringify(d);
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
        import { getToken, verifyToken, storeImage, checkBody, checkQuery, preventBody } from "../utilities";
        import { HTTP400Error } from "../models/http400error";
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
