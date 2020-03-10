import '../generators/backend/node/crud/route.dart';
import '../generators/endpoints/setup.dart';
import 'io.dart';

main(List<String> args) {
  IO io = IO();
  // print(io.getModels()['rules'].getDependencyModels());
  // Route(io.getModels()['rules']).run();
  Setup().run();
  // io.getEndpoints().forEach((e) => print(e.modelName+': '+ e.method+': \t'+ e.path));
  io.getModelsWithEndpoints().forEach((k, v) {
    Route(v).run();
  });
}
