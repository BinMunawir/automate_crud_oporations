import 'dart:io';

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

  List<Model> getAllModels() {
    List<Model> models = [];

    this
        .readFromFile(this.docsPath + '/models.txt')
        .split('_____')
        .forEach((m) {
      m = m.trim();
      models.add(Model.text(m));
    });

    return models;
  }

  Model getModel(String pluralName) {
    Model model;
    this.getAllModels().forEach((m) {
      if (m.pluralName == pluralName) model = m;
    });

    return model;
  }
}
