import 'io.dart';

class Essentials {
  IO io = IO();
  String projectName;
  String dir;

  Essentials(this.projectName) {
    dir = './' + projectName + '/';
  }

  void provideEssentialFiles() {
    io.createDir(dir);
    io.copyFile('./essentialFiles/README.rm', this.dir + 'README.rm');
    io.copyFile('./essentialFiles/.env', this.dir + '.env');
    io.copyFile('./essentialFiles/.gitignore', this.dir + '.gitignore');
    io.copyFile('./essentialFiles/tsconfig.json', this.dir + 'tsconfig.json');
  }

  void generatePackage() {
    String content = '''
    {
  "name": "''' +
        this.projectName +
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
    io.createFile(this.dir + 'package.json');
    io.writeFile(this.dir + 'package.json', content);
  }
}
