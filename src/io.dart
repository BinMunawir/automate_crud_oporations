import 'dart:io';

import 'endpoint.dart';
import 'field.dart';
import 'model.dart';

class IO {
  String srcCodePath = './projects/test00',
      docsPath = './docs',
      projectsPath = './projects';

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
      Model model = Model('', '', [], [], []);
      m.split(';').asMap().forEach((i, r) {
        if (i == m.split(';').length - 1) return;
        r = r.trim();
        if (i == 0) {
          List<String> r1st = r.split('>');
          model.pluralName = r1st[0].trim().split('-')[0].trim();
          model.singlarName = r1st[0].trim().split('-')[1].trim();
          if (r1st.length > 1)
            r1st[1]
                .trim()
                .split(',')
                .forEach((d) => model.depends.add(models[d.trim()]));
          model.fields = model.getIDs();
          return;
        }
        model.fields.add(Field.fromText(r));
      });
      models[model.pluralName] = model;
    });

    return models;
  }

  Map<String, Model> getModelsWithEndpoints() {
    Map<String, Model> models = this.getModels();

    this.getEndpoints().forEach((e) {
      models.forEach((k, v) {
        if (e.model.pluralName == k) {
          e.model = v;
          v.endpoints.add(e);
        }
      });
    });

    return models;
  }

  List<Endpoint> getEndpoints() {
    List<Endpoint> endpoints = [];

    this
        .readFromFile(this.docsPath + '/endpoints.txt')
        .split('_____')
        .forEach((e) {
      e = e.trim();
      endpoints.add(Endpoint.fromText(e));
    });

    return endpoints;
  }
}
