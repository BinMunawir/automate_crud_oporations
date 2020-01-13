

import 'dart:io';

import '../io.dart';
import 'generator.dart';

void main(List<String> args) {
  IO io = IO();
  EndpointsGenerators g = EndpointsGenerators(io.getTables());
  
  g.generate();
  String content = formatOutput(g.endpoints);

  io.createFile('./docs/endpoints.txt');
  io.writeFile('./docs/endpoints.txt', content);
}

String formatOutput(endpoints) {
  String api = '';
  endpoints.forEach((e) {
    api += (e.method + '%\t\t' + e.path + '%\n');
    e.params?.forEach((p) {
      api += (p);
      if (p != e.params[e.params.length - 1]) api += ',';
      api += '\n';
    });
    if (e == endpoints[endpoints.length - 1]) return;
    api += ('_____\n\n\n');
  });
  return api;
}