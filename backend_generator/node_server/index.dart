import '../../io.dart';
import 'config.dart';
import 'essentials.dart';
import 'facades.dart';
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
  Facades(root).generate();
  Config(root).generate();
  Models(root).generate();
  Routers(root).generate();
  Services(root).generate();
}
