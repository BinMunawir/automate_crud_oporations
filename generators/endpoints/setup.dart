
import '../../src/io.dart';
import '../../src/model.dart';

class Setup {
  IO _io = IO();
  String content = '';

  void run() {
    
  }

  void generateEndpoint() {
    this._io.getModels().forEach((k, v){
      content += k+';\n';

    });
  }

  String _getMethod(Model m) {
    String content = '';
    m.depends.asMap().forEach((i,m){
      this._io.getModels()[m];
    });
  }
}