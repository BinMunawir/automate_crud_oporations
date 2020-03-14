import 'model.dart';

class Endpoint {
  String method, path;
  Model model;
  List<String> params = [];

  Endpoint(this.model, this.method, this.path, this.params);

  Endpoint.fromText(String endpointTextFormat) {
    endpointTextFormat.split(';').asMap().forEach((i, r) {
      if (i == endpointTextFormat.split(';').length - 1) return;
      r = r.trim();
      if (i == 0) {
        this.model = Model(r, '', [], [], []);
        return;
      }
      if (i == 1) {
        this.method = r.split('#')[0].trim();
        this.path = r.split('#')[1].trim();
        return;
      }
      this.params.add(r);
    });
  }

  String formatOutput() {
    String params = '';
    this.params.forEach((p) => params += p + ';\n');
    return '''${model.pluralName};
$method# \t\t\t/api$path;
$params''';
  }
}
