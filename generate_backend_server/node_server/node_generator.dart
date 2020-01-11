import 'config.dart';
import 'essentials.dart';
import 'facades.dart';
import 'middlewares.dart';
import 'models.dart';
import 'utilities.dart';

void main() {
  String root = './y/';

  Essentials(root).generate();
  Utilities(root).generate();
  MiddleWares(root).generate();
  Facades(root).generate();
  Config(root).generate();
  Models(root).generate();
}
