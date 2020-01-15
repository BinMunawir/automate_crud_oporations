import '../io.dart';

class EndpointsGenerators {
  List<Table> _tables;
  List<Endpoint> endpoints = [];

  EndpointsGenerators(this._tables);

  String generate() {
    this._getAuthEndpoints();
    _tables.forEach((t) => this._tableEndpoints(t));
  }

  Endpoint _tableEndpoints(Table t) {
    List<Endpoint> tableEndpoints = [];

    String parentPath = this._getParentPath(t.params);
    String collectionPath =
        parentPath + '/' + t.name[0].toLowerCase() + t.name.substring(1);
    String instancePath = collectionPath + '/:' + this._getID(t.params);

    List<String> params = this._getParamsName(t.params);
    tableEndpoints.add(Endpoint('GET', collectionPath, params: params));
    if (t.name != 'Users')
      tableEndpoints.add(Endpoint('POST', collectionPath, params: params));
    tableEndpoints.add(Endpoint('GET', instancePath, params: params));
    tableEndpoints.add(Endpoint('PUT', instancePath, params: params));
    tableEndpoints.add(Endpoint('DELETE', instancePath));

    tableEndpoints.forEach((e) => endpoints.add(e));
  }

  List<String> _getParamsName(List<List<String>> params) {
    List<String> r = [];
    params.forEach((param) {
      r.add(param[0]);
    });
    return r;
  }

  String _getID(List<List<String>> params) {
    String key;
    params.forEach((p) {
      if (p[2] == null) return;
      if (p[2].length == 1) key = p[0];
    });
    return key;
  }

  String _getParentPath(List<List<String>> params) {
    String parentPath = '';
    params.forEach((p) {
      if (p[2].isEmpty) return;
      if (p[2].length == 1) return;
      String collection = p[2][0].toLowerCase() + p[2].substring(1);
      String instance = p[0];
      parentPath += '/' + collection + '/:' + instance;
    });
    return parentPath;
  }

  void _getAuthEndpoints() {
    this._tables.forEach((t) {
      if (t.name == 'Users') {
        String signupMethod = 'POST';
        String signupPath = '/auth/signup';
        List<String> signupParams = this._getParamsName(t.params);
        String loginMethod = 'POST';
        String loginPath = '/auth/login';
        List<String> loginParams = ['userID', 'password'];

        this
            .endpoints
            .add(Endpoint(signupMethod, signupPath, params: signupParams));
        this
            .endpoints
            .add(Endpoint(loginMethod, loginPath, params: loginParams));
      }
    });
  }
}
