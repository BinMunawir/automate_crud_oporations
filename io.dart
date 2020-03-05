import 'dart:io';

class IO {
  String srcCodePath = './src_code/node',
      docsPath = './docs',
      generatedProjects = './generated_projects';

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
    this.createFile(src);
    this.writeToFile(src, readFromFile(des));
  }

  Map<String, String> getConfigContent() {
    Map<String, String> configs = {};

    String configContent = this.readFromFile('./docs/config.txt');
    configContent
        .split(',')
        .forEach((x) => configs.addAll({x.split('=')[0]: x.split('=')[1]}));
    return configs;
  }
}
