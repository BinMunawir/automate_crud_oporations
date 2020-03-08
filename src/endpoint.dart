class Endpoint {
  String model, method, path;
  List<String> params = [];

  Endpoint(this.method, this.path, this.params);

  Endpoint.fromText(String endpointTextFormat) {
    endpointTextFormat.split(';').asMap().forEach((i, r) {
      r = r.trim();
      if (i == endpointTextFormat.split(';').length - 1) return;
      if (i == 0) {
        this.model = r;
        return;
      }
      if (i == 1) {
        this.method = r.split(':')[0].trim();
        this.path = r.split(':')[1].trim();
        return;
      }
      this.params.add(r);
    });
  }



    @override
  String toString() {
    String content = '''

*****************
$method: $path
$params
*****************
''';

    return content;
  }
}
