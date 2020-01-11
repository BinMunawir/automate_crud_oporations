import 'io.dart';

class Essentials {
  IO _io = IO();
  String _root;

  Essentials(this._root);

  void generate() {
    _provideEssentialFiles();
    _generatePackage();
    _generateServer();
  }

  void _provideEssentialFiles() {
    _io.createDir(_root);
    _io.copyFile('./essentialFiles/README.rm', this._root + 'README.rm');
    _io.copyFile('./essentialFiles/.env', this._root + '.env');
    _io.copyFile('./essentialFiles/.gitignore', this._root + '.gitignore');
    _io.copyFile(
        './essentialFiles/tsconfig.json', this._root + 'tsconfig.json');
  }

  void _generatePackage() {
    String content = '''
    {
  "name": "''' +
        this._root.split('/')[this._root.split('/').length - 2] +
        '''",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "tsc-watch --onSuccess \\"node ./dist/server.js\\""
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/compression": "^1.0.1",
    "@types/cors": "^2.8.6",
    "@types/express": "^4.17.2",
    "@types/node": "^12.12.20",
    "@types/swagger-ui-express": "^4.1.0",
    "compression": "^1.7.4",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^5.0.0-alpha.7",
    "express-fileupload": "^1.1.6",
    "jsonwebtoken": "^8.5.1",
    "mysql": "^2.17.1",
    "sql_storage_system": "0.0.17",
    "swagger-ui-express": "^4.1.2",
    "tsc-watch": "^4.0.0",
    "typescript": "^3.7.3"
  }
}
    ''';
    _io.createFile(this._root + 'package.json');
    _io.writeFile(this._root + 'package.json', content);
  }

  void _generateServer() {
    _io.createDir(_root + 'src/');
    String content = '''
    require('dotenv').config()
    import http from "http";
    import express from "express";
    import { applyMiddleware, applyRoutes } from "./utilities";
    import commonMiddelwares from "./middleware/common";
    import staticsResources from "./middleware/statics";
    import errorsHandlers from "./middleware/errorHandlers";
    import routes from "./routes";
    const sqlStorage = require('sql_storage_system')


    const router = express();
    applyMiddleware(commonMiddelwares, router);
    applyRoutes(routes, router);
    applyMiddleware(staticsResources, router);
    applyMiddleware(errorsHandlers, router);

    sqlStorage.sqlSetup(process.env.dbHost, process.env.dbUser, process.env.dbPassword, process.env.dbName);
    const { hostname = 'localhost' } = process.env;
    const { port = 3030 } = process.env;
    const server = http.createServer(router);

    server.listen(port, () =>
      console.log(`Server is running \${hostname}:\${port}...`)
    );

    ''';
    _io.createFile(this._root + 'src/' + 'server.ts');
    _io.writeFile(this._root + 'src/' + 'server.ts', content);
  }
}
