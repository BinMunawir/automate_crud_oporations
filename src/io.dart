import 'dart:io';

import 'endpoint.dart';
import 'model.dart';

class IO {
  String srcCodePath = './src_code/node',
      docsPath = './docs',
      generatedProjectsPath = './projects';

  void createDir(String path, {bool override = false}) {
    Directory dir = Directory(path);
    if (override && dir.existsSync()) dir.deleteSync(recursive: true);
    dir.createSync(recursive: true);
  }

  void createFile(String path, {bool override = false}) {
    File file = File(path);
    if (override && file.existsSync()) file.deleteSync();
    file.createSync();
  }

  String readFromFile(String path) {
    File file = File(path);
    return file.readAsStringSync();
  }

  void writeToFile(String path, String content) {
    File file = File(path);
    return file.writeAsStringSync(content);
  }

  void copyFile(String src, String des) {
    this.createFile(des);
    this.writeToFile(des, readFromFile(src));
  }

  Map<String, String> getConfigContent() {
    Map<String, String> configs = Map<String, String>();

    String configContent = this.readFromFile(this.docsPath + '/config.txt');
    configContent.split(',').forEach((x) =>
        configs[x.trim().split('=')[0].trim()] = x.trim().split('=')[1].trim());
    return configs;
  }

  Map<String, Model> getModels() {
    Map<String, Model> models = {};

    this
        .readFromFile(this.docsPath + '/models.txt')
        .split('_____')
        .forEach((m) {
      m = m.trim();
      Model model = Model.text(m);
      models.addAll({model.pluralName: model});
    });

    Map<String, List<Endpoint>> endpoints = this.getEndpoints();
    models.forEach((n, m) => m.endpoints = endpoints[n]);

    return models;
  }

  Map<String, List<Endpoint>> getEndpoints() {
    Map<String, List<Endpoint>> endpoints = {};

    this
        .readFromFile(this.docsPath + '/endpoints.txt')
        .split('_____')
        .forEach((e) {
      e = e.trim();
      Endpoint endpoint = Endpoint.fromText(e);
      if (endpoints[endpoint.model] == null)
        endpoints.addAll({endpoint.model: []});
      endpoints[endpoint.model].add(endpoint);
    });

    return endpoints;
  }
}
