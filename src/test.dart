import '../generators/backend/node/crud/crud.dart';
import '../generators/backend/node/setup/setup.dart';

main(List<String> args) {
  Setup({
    "": ['.env', '.gitignore', 'package.json', 'README.md', 'tsconfig.json'],
    "public/general": [],
    "src": ['server.ts'],
    "src/config": ['sqlTables.ts', 'swagger.json'],
    "src/controllers": [],
    "src/middlewares": ['common.ts', 'errorHandlers.ts', 'statics.ts'],
    "src/models": ['http400error.ts'],
    "src/routes": ['index.ts'],
    "src/services": ['index.ts'],
    "src/utilities": ['index.ts'],
  }, [
    'hostname',
    'port',
    'secretKey',
    'dbHost',
    'dbUser',
    'dbPassword',
    'dbName',
  ]).run();
  Crud().run();
}
