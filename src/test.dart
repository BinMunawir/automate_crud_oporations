import '../generators/backend/node/crud/route.dart';
import 'io.dart';

main(List<String> args) {
  IO io = IO();
  // print(io.getModels()['rules'].getDependencyModels());
  Route(io.getModels()['rules']).run();
}
