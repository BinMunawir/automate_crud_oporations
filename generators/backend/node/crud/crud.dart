import '../../../../src/io.dart';
import 'controller.dart';
import 'model.dart';
import 'route.dart';

class Crud {
  IO _io = IO();

  void run() {
    this._io.getModelsWithEndpoints().forEach((k, v) {
      CrudRoute(v).run();
      CrudController(v).run();
      CrudModel(v).run();
    });
  }
}
