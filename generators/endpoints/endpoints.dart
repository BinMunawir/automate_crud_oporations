import '../../src/endpoint.dart';
import '../../src/io.dart';
import '../../src/model.dart';

class Endpoints {
  IO _io = IO();
  List<Endpoint> _endpoints = [];

  void run() {
    this
        ._io
        .getModels()
        .forEach((k, v) => this._endpoints.addAll(this.generateEndpoints(v)));

    String content = '';
    this._endpoints.asMap().forEach((i, e) {
      content += e.formatOutput() + '\n\n';
      if (i == this._endpoints.length - 1) return;
      content += '_____\n\n';
    });

    this._io.createFile(this._io.docsPath + '/endpoints.txt', override: true);
    this._io.writeToFile(this._io.docsPath + '/endpoints.txt', content);
  }

  List<Endpoint> generateEndpoints(Model model) {
    List<Endpoint> _endpoints = [];
    String instans = this._path(model);
    String collection = instans.substring(0, instans.lastIndexOf(':') - 1);

    _endpoints.addAll(this._getEndpoints(model));
    _endpoints.add(Endpoint(model, 'POST', collection,
        model.fields.map<String>((f) => f.name).toList()));
    _endpoints.add(Endpoint(model, 'PUT', instans,
        model.fields.map<String>((f) => f.name).toList()));
    _endpoints.add(Endpoint(model, 'DELETE', instans, []));

    return _endpoints;
  }

  List<Endpoint> _getEndpoints(Model model) {
    List<Endpoint> _endpoints = [];

    String instans = this._path(model);
    String collection = instans.substring(0, instans.lastIndexOf(':') - 1);

    if (model.depends.length > 0)
      _endpoints.add(Endpoint(model, 'GET', '/' + model.pluralName,
          model.fields.map<String>((f) => f.name).toList()));

    model.depends.forEach((m) {
      String path = this._path(m) + '/' + model.pluralName;
      if (path == collection) return;
      _endpoints.add(Endpoint(model, "GET", path,
          model.fields.map<String>((f) => f.name).toList()));
    });

    _endpoints.add(Endpoint(model, 'GET', collection,
        model.fields.map<String>((f) => f.name).toList()));
    _endpoints.add(Endpoint(model, 'GET', instans,
        model.fields.map<String>((f) => f.name).toList()));

    return _endpoints;
  }

  String _path(Model model) {
    String path = '';
    model.depends.forEach((m) => path += this._path(m));
    path += '/' + model.pluralName + '/:' + model.singlarName + 'ID';

    return path;
  }
}
