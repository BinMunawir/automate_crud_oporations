import 'dart:io';

main(List<String> args) {
  IO io = IO();
  print(io.getConfig());
//   List<Table> tables = io.getTables();
//   print(tables[0].name);
  // List<Endpoint> l = io.getEndpoints();
  // print(l[14].method);
  // print(l[14].path);
  // print(l[14].params);
}

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
    String content = readFile('./docs/models.txt');
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

  List<Endpoint> getEndpoints() {
    String content = readFile('./docs/endpoints.txt');
    List<Endpoint> endpoints = [];
    content.split('_____').forEach((e) {
      List<String> ee = e.split('%');
      List<String> params = [];
      ee[2].trim().split(',').forEach((p) {
        params.add(p.trim());
      });
      endpoints.add(Endpoint(ee[0].trim(), ee[1].trim(), params: params));
    });
    return endpoints;
  }

  List<List<String>> getConfig() {
    String content = readFile('./docs/config.txt');
    List<List<String>> config = [];
    content.split(',').forEach((e) {
      config.add(e.trim().split('='));
    });
    return config;
  }
}

class Table {
  String name;
  List<List<String>> params;
  Table(this.name, this.params);
}

class Endpoint {
  String method;
  String path;
  List<String> params;

  Endpoint(this.method, this.path, {this.params});
}
