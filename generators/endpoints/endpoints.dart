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

    if (model.depends.length == 2) {
      collection = '/' + model.pluralName;
      instans = collection + '/:' + model.singlarName + 'ID';

      _endpoints.add(Endpoint(
          model,
          'GET',
          '/' +
              model.depends[0].pluralName +
              '/:' +
              model.depends[0].singlarName +
              'ID' +
              collection,
          model.fields.map<String>((f) => f.name).toList()));
      _endpoints.add(Endpoint(
          model,
          'GET',
          '/' +
              model.depends[1].pluralName +
              '/:' +
              model.depends[1].singlarName +
              'ID' +
              collection,
          model.fields.map<String>((f) => f.name).toList()));
      _endpoints.add(Endpoint(
          model,
          'GET',
          '/' +
              model.depends[0].pluralName +
              '/:' +
              model.depends[0].singlarName +
              'ID' +
              '/' +
              model.depends[1].pluralName +
              '/:' +
              model.depends[1].singlarName +
              'ID' +
              collection,
          model.fields.map<String>((f) => f.name).toList()));
      _endpoints.add(Endpoint(
          model,
          'GET',
          '/' +
              model.depends[0].pluralName +
              '/:' +
              model.depends[0].singlarName +
              'ID' +
              '/' +
              model.depends[1].pluralName +
              '/:' +
              model.depends[1].singlarName +
              'ID' +
              instans,
          model.fields.map<String>((f) => f.name).toList()));
      _endpoints.add(Endpoint(
          model,
          'POST',
          '/' +
              model.depends[0].pluralName +
              '/:' +
              model.depends[0].singlarName +
              'ID' +
              '/' +
              model.depends[1].pluralName +
              '/:' +
              model.depends[1].singlarName +
              'ID' +
              collection,
          model.fields.map<String>((f) => f.name).toList()));
      _endpoints.add(Endpoint(
          model,
          'PUT',
          '/' +
              model.depends[0].pluralName +
              '/:' +
              model.depends[0].singlarName +
              'ID' +
              '/' +
              model.depends[1].pluralName +
              '/:' +
              model.depends[1].singlarName +
              'ID' +
              instans,
          model.fields.map<String>((f) => f.name).toList()));
      _endpoints.add(Endpoint(
          model,
          'DELETE',
          '/' +
              model.depends[0].pluralName +
              '/:' +
              model.depends[0].singlarName +
              'ID' +
              '/' +
              model.depends[1].pluralName +
              '/:' +
              model.depends[1].singlarName +
              'ID' +
              instans,
          model.fields.map<String>((f) => f.name).toList()));

      return _endpoints;
    }

    _endpoints.add(Endpoint(model, 'GET', collection,
        model.fields.map<String>((f) => f.name).toList()));
    _endpoints.add(Endpoint(model, 'GET', instans,
        model.fields.map<String>((f) => f.name).toList()));
    _endpoints.add(Endpoint(model, 'POST', collection,
        model.fields.map<String>((f) => f.name).toList()));
    _endpoints.add(Endpoint(model, 'PUT', instans,
        model.fields.map<String>((f) => f.name).toList()));
    _endpoints.add(Endpoint(model, 'DELETE', instans, []));

    return _endpoints;
  }

  String _path(Model model) {
    String path = '';
    model.depends.forEach((m) => path += this._path(m));
    path += '/' + model.pluralName + '/:' + model.singlarName + 'ID';

    return path;
  }
}
