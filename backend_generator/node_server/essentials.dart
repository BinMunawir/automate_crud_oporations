import 'dart:io';

import '../../io.dart';

class Essentials {
  IO _io = IO();
  String _root;

  Essentials(this._root);

  void generate() {
    _provideEssentialFiles();
    _generatePackage();
    _generateEnv();
    _generateServer();
  }

  void _provideEssentialFiles() {
    _io.createDir(_root);
    _io.createDir(_root + 'public/general');
    _io.createDir(_root + 'public/images');
    _io.createDir(_root + 'public/pdfs');
    _io.createDir(_root + 'public/texts');
    _io.copyFile('./backend_generator/node_server/essentials/README.rm',
        this._root + 'README.rm');
    _io.copyFile('./backend_generator/node_server/essentials/.gitignore',
        this._root + '.gitignore');
    _io.copyFile('./backend_generator/node_server/essentials/tsconfig.json',
        this._root + 'tsconfig.json');
  }

  void _generatePackage() {
    String projectName = this._io.getConfig()[0][1];
    String content = '''
        {
      "name": "''' +
        projectName +
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
        "sql_storage_system": "0.0.36",
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
        import commonMiddelwares from "./middlewares/common";
        import staticsResources from "./middlewares/statics";
        import errorsHandlers from "./middlewares/errorHandlers";
        import routes from "./routes";
        import { tables } from "./config/sqlTables";
        const sqlStorage = require('sql_storage_system')
    
    
        const router = express();
        applyMiddleware(commonMiddelwares, router);
        applyRoutes(routes, router);
        applyMiddleware(errorsHandlers, router);
        applyMiddleware(staticsResources, router);
    
        
        sqlStorage.sqlSetup(process.env.dbHost, process.env.dbUser, 
          process.env.dbPassword, process.env.dbName, tables);
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

  void _generateEnv() {
    List<List<String>> config = this._io.getConfig();
    String content = '';

    config.forEach((g) {
      if (g[0] == 'hostname' ||
          g[0] == 'port' ||
          g[0] == 'secretKey' ||
          g[0] == 'dbHost' ||
          g[0] == 'dbUser' ||
          g[0] == 'storageHost' ||
          g[0] == 'dbPassword' ||
          g[0] == 'dbName') content += g[0] + '=' + g[1] + '\n';
    });

    _io.createFile(this._root + '.env');
    _io.writeFile(this._root + '.env', content);
  }
}
