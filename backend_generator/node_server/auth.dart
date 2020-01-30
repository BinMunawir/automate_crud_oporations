import '../../io.dart';

class Auth {
  IO _io = IO();
  String _root;
  String _dir;
  Map<String, List<String>> types;
  List<Table> tables = [];

  Auth(this._root) {
    this._dir = this._root + 'src/';
    types = this._io.getAuth();
    types.keys.toList().forEach((k) {
      this._io.getTables().forEach((t) {
        if (t.name != k) return;
        tables.add(t);
      });
    });
  }

  void generate() {
    this._generateRoutes();
    this._generateControllers();
  }

  void _generateRoutes() {
    List<String> typeList = [];
    this.types.keys.toList().forEach((t) {
      typeList.add("'" + t + "'");
    });
    String content = '''
import { login, signup } from "../controllers/auth.controller";



export default [
  {
    path: "/api/auth/signup",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let acceptedAuthTypes: string[] = ''' +
        typeList.toString() +
        ''';
                if (req.body.authType != null)
                  req.body.authType = req.body.authType[0].toUpperCase() + req.body.authType.substring(1);
                else
                  req.body.authType = acceptedAuthTypes[0];
                await signup({ ...req.body, ...req.params });
                res.status(200).send();
              }
            ]
          },
          {
            path: "/api/auth/login",
            method: "post",
            handler: [
              async (req: any, res: any) => {
                let acceptedAuthTypes: string[] = ''' +
        typeList.toString() +
        ''';
                if (req.body.authType != null)
                  req.body.authType = req.body.authType[0].toUpperCase() + req.body.authType.substring(1);
                else
                  req.body.authType = 'Any';
                let data = await login(req.body, acceptedAuthTypes);
                res.status(200).send(data);
              }
            ]
          },
        ];
        ''';

    _io.createFile(this._dir + 'routes/auth.routes.ts');
    _io.writeFile(this._dir + 'routes/auth.routes.ts', content);
  }

  void _generateControllers() {
    String content = """
import * as utilities from "../utilities";
import { HTTP400Error } from "../models/http400error";
const shortid = require('shortid');
import services from "../services";

""" +
        _getModels() +
        """

export async function signup(data: any) {
""" +
        _getSignupCases() +
        """
    throw new HTTP400Error(5461, 'the auth type is not supported');
}
async function exceuteSignup(table: any, data: any) {
    try {
        await services.sqlStorage.sqlCreate(table, data)
    } catch (e) {
        if (e.message.includes('Duplicate entry'))
            throw new HTTP400Error(104, 'error: the user already exist in the database')
        throw e;
    }
}

export async function login(query: any, authTypes: any[]): Promise<any> {
    if (!authTypes.toString().includes(query.authType) && query.authType != 'Any')
        throw new HTTP400Error(5461, 'the auth type is not supported');
    if (query.id == null || query.password == null)
        throw new HTTP400Error(105, 'user id and password are required');

    if (query.authType == 'Any') {
        for (let i = 0; i < authTypes.length; i++) {
            const table = authTypes[i];
            let newQuery = query;
            newQuery.authType = table;
            try {
                return await login(newQuery, authTypes);
            } catch (e) {
                if (!e.message.includes('No user'))
                    throw e;
            }
        }
        throw new HTTP400Error(6541, 'No user by that information in all types');
    }
""" +
        _getLoginCases() +
        """
}
async function exceuteLogin(table: any, query: any, requestedData: any) {
    try {
        let d = await services.sqlStorage.sqlRead(table, query, requestedData)
        if (d.length == 0)
            throw new HTTP400Error(1075, 'No user by that information')
        let token = utilities.getToken(d[0][Object.entries(d[0])[0][0]]);
        d = {
            token: token,
            profile: d
        }
        return d;
    } catch (e) {
        throw e;
    }
}

        """;

    _io.createFile(this._dir + 'controllers/auth.controller.ts');
    _io.writeFile(this._dir + 'controllers/auth.controller.ts', content);
  }

  String _getModels() {
    String content = '';
    this.tables.forEach((t) {
      Map<String, dynamic> params = Map();
      String model = t.params[0][0][0].toUpperCase() +
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
            let """ +
          params.keys
              .toList()[0]
              .substring(0, params.keys.toList()[0].indexOf('ID')) +
          """Type: """ +
          model +
          """Model = 
              """ +
          params.toString() +
          """
          
            """;
    });
    return content;
  }

  String _getSignupCases() {
    String content = '';
    this.types.forEach((t, p) {
      String _getChecker() {
        String conditions = '';
        String msg = '';
        p.forEach((c) {
          conditions += 'data.' + c + ' == null ';
          msg += c + ' ';
          if (p[p.length - 1] != c) {
            conditions += '|| ';
            msg += 'and ';
          }
        });

        String content = """
if (""" +
            conditions +
            """)
            throw new HTTP400Error(1614, '""" +
            msg +
            """are required');

""";

        return content;
      }

      List<String> _getParams() {
        List<String> params = [];
        this.tables.forEach((table) {
          if (table.name != t) return;
          table.params.forEach((p) {
            params.add(p[0]);
          });
        });
        return params;
      }

      List<String> paramsString = [];
      _getParams().forEach((p) {
        paramsString.add("'" + p + "'");
      });
      content += """
if (data.authType == '""" +
          t +
          """') {
        """ +
          _getChecker() +
          """
        let accepted: string[] = """ +
          paramsString.toString() +
          """;
         let """ +
          _getParams()[0].substring(0, _getParams()[0].indexOf('ID')) +
          """Data = utilities.acceptedBody(accepted, data);
        if (""" +
          _getParams()[0].substring(0, _getParams()[0].indexOf('ID')) +
          """Data.""" +
          _getParams()[0] +
          """ == null) """ +
          _getParams()[0].substring(0, _getParams()[0].indexOf('ID')) +
          """Data.""" +
          _getParams()[0] +
          """ = shortid.generate();
        """ +
          _getParams()[0].substring(0, _getParams()[0].indexOf('ID')) +
          """Data = await utilities.checkBody(""" +
          _getParams()[0].substring(0, _getParams()[0].indexOf('ID')) +
          """Data, """ +
          _getParams()[0].substring(0, _getParams()[0].indexOf('ID')) +
          """Type, """ +
          _getParams()[0].substring(0, _getParams()[0].indexOf('ID')) +
          """Data);
        return await exceuteSignup(data.authType, """ +
          _getParams()[0].substring(0, _getParams()[0].indexOf('ID')) +
          """Data);
    }

      """;
    });
    return content;
  }

  String _getLoginCases() {
    String content = '';
    this.types.forEach((t, p) {
      String _getReturnParams() {
        List<String> list = [];
        this.tables.forEach((table) {
          if (table.name != t) return;
          table.params.forEach((p) {
            list.add("'" + p[0] + "'");
          });
        });
        return list.toString();
      }

      content += ("""
    else if (query.authType == '""" +
          t +
          """') {
        query = { """ +
          p[0] +
          """: query.id, password: query.password }
          let requestedData: any = """ +
          _getReturnParams() +
          """;
        return await exceuteLogin('""" +
          t +
          """', query, requestedData)
    }

""");
    });
    return content;
  }
}
