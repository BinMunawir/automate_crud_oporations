import '../../../../src/io.dart';
import 'controller.dart';
import 'model.dart';
import 'route.dart';
import 'utilities.dart';

class Crud {
  IO _io = IO();

  void run() {
    String documentation = '';
    this._io.getModelsWithEndpoints().forEach((k, v) {
      documentation += k + ':\n';
      v.endpoints.forEach((e) {
        documentation += '\t' + Utilities().getEndpointFunction(e);
        documentation += ' =>  ' + e.method + ': ' + e.path;
        documentation += '\n';
      });
      documentation += '\n';
      this._io.createFile(this._io.docsPath + '/api_documentation.txt');
      this._io.writeToFile(
          this._io.docsPath + '/api_documentation.txt', documentation);
      CrudRoute(v).run();
      CrudController(v).run();
      CrudModel(v).run();
    });
    print(documentation);
  }
}
