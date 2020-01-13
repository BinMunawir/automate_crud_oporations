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
        if (name.contains(':'))
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

      String s = _getService();
      if (services[s] == null) services[s] = [];
      services[s].add(_getFuncName());
    });

    services.forEach((k, v) {
      String _getFunctions() {
        String tableName = k[0].toUpperCase() + k.substring(1);
        String content = '';
        v.forEach((f) {
          if (f.contains('get')) {
            if (f == 'get' + tableName)
              content += """
              export async function """ +
                  f +
                  """(params: any, query: any, headers: any) {

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

                try {
                    let dbQuery = { ...params, ...query };
                    let d = await facade.sqlStorage.sqlRead('""" +
                  tableName +
                  """', dbQuery)
                    if (d.length() == 0)
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
        import { } from "../utilities";
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
