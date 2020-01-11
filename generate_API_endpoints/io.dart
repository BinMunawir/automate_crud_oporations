import 'dart:io';

import 'generators.dart';

void main(List<String> args) {
  File file = File('models.txt');
  String content = file.readAsStringSync();

  List<Table> tables = getTables(content);
  Generators g = Generators(tables);
  g.generate();
  String api = formatOutput(g.endpoints);

  File file2 = File('api_endpoints.txt');
  if (file2.existsSync()) file2.deleteSync();
  file2.createSync();
  file2.writeAsStringSync(api);
}

List<Table> getTables(String content) {
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

String formatOutput(endpoints) {
  String api = '';
  endpoints.forEach((e) {
    api += (e.method + '\t\t' + e.path + '\n');
    e.params?.forEach((p) {
      api += (p + '\n');
    });
    if (e == endpoints[endpoints.length - 1]) return;
    api += ('_____\n\n\n');
  });
  return api;
}
