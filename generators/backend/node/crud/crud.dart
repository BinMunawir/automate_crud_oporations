import '../../../../src/io.dart';
import 'controller.dart';
import 'route.dart';

class Crud {
  IO _io = IO();

  void run() {
    this._io.getModelsWithEndpoints().forEach((k, v) {
      Route(v).run();
      Controller(v).run();
    });
  }
}
