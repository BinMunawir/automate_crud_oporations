import 'dart:io';


// main(List<String> args) {
//   IO io = IO();
// }

class IO {
  void createDir(String path) {
    Directory dir = Directory(path);
    if (dir.existsSync()) dir.deleteSync(recursive: true);
    dir.createSync(recursive: true);
  }

  void createFile(String path) {
    File file = File(path);
    if (file.existsSync()) file.deleteSync();
    file.createSync();
  }

  String readFile(String path) {
    File file = File(path);
    return file.readAsStringSync();
  }

  void writeFile(String path, String content) {
    File file = File(path);
    return file.writeAsStringSync(content);
  }

  void copyFile(String source, String path) {
    createFile(path);
    writeFile(path, readFile(source));
  }

  List<Table> getTables() {
    String content = readFile('./inputs/models.txt');
    List<Table> tables = [];
    content.split('_____').forEach((t) {
      List<String> tContent = t.split(':');
      String tName = tContent[0].trim();
      List<List<String>> tParams = [];
      tContent[1].split(';').forEach((p) {
        List<String> params = [];
        p.split(',').forEach((e) => params.add(e.trim()));
        tParams.add(params);
      });
      tables.add(Table(tName, tParams));
    });
    return tables;
  }
}

class Table {
  String name;
  List<List<String>> params;
  Table(this.name, this.params);
}
