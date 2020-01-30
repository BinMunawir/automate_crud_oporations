import '../../io.dart';
import 'auth.dart';
import 'config.dart';
import 'essentials.dart';
import 'controllers.dart';
import 'middlewares.dart';
import 'models.dart';
import 'routers.dart';
import 'services.dart';
import 'utilities.dart';

void main() {
  IO io = IO();
  String root = './docs/' + io.getConfig()[0][1] + '/';

  Essentials(root).generate();
  Utilities(root).generate();
  MiddleWares(root).generate();
  Services(root).generate();
  Config(root).generate();
  Models(root).generate();
  Routers(root).generate();
  Controllers(root).generate();
  Auth(root).generate();
}
