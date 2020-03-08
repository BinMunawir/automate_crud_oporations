import 'dart:io';

import 'customizeFiles.dart';
import 'setup.dart';

main(List<String> args) {
  Test test = Test(Setup({
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
  ]));
  // test._setup.run();
  try {
    test.testComponent();
    // test.testCreateDirectories();
    // test.testCopyFilesFromSrcCode();
    // test.testCustomizePackageFile();
    // test.testCustomizeEnvFile();
  } catch (e) {
    if (e is Map)
      print(e);
    else
      throw e;
  }
}

class Test {
  Setup _setup;

  Test(this._setup);

  void testComponent() {
    this.testCreateDirectories();
    this.testCopyFilesFromSrcCode();
    this.testCustomizePackageFile();
    this.testCustomizeEnvFile();
    CustomizeFiles(this._setup).customizeSqlTablesFile();
    CustomizeFiles(this._setup).customizeSwaggerFile();
    CustomizeFiles(this._setup).customizeRoutesIndexFile();
  }

  void testCreateDirectories() {
    this._setup.createDirectories();

    this._setup.requiredDirectoriesAndFiles.entries.forEach((e) {
      if (!Directory(this._setup.root + '/' + e.key).existsSync())
        throw {
          '#CreateDirectories failed':
              'this directory doesnt exist =>' + this._setup.root + '/' + e.key
        };
    });
    print('CreateDirectories\t\t\tsuccessed');
  }

  void testCopyFilesFromSrcCode() {
    this._setup.copyFilesFromSrcCode();

    this._setup.requiredDirectoriesAndFiles.entries.forEach((e) {
      e.value.forEach((f) {
        if (!File(this._setup.root + '/' + e.key + '/' + f).existsSync())
          throw {
            '#CopyFilesFromSrcCode failed':
                'this file doesnt exist =>' + this._setup.root + '/' + e.key
          };
        String src = File(this._setup.io.srcCodePath + '/' + e.key + '/' + f)
            .readAsStringSync();
        String des =
            File(this._setup.root + '/' + e.key + '/' + f).readAsStringSync();
        if (src != des)
          throw {
            '#CopyFilesFromSrcCode failed':
                'the ' + f + ' differ from the src code'
          };
      });
    });
    print('CopyFilesFromSrcCode\t\t\tsuccessed');
  }

  void testCustomizePackageFile() {
    CustomizeFiles(this._setup).customizePackageFile();

    String projectName = this._setup.io.getConfigContent()['projectName'];
    String packageFile =
        this._setup.io.readFromFile(this._setup.root + '/package.json');
    if (!packageFile.contains(projectName))
      throw {
        '#CustomizePackageFile failed':
            'package.json doesnt contains the name of the project'
      };

    print('CustomizePackageFile\t\t\tsuccessed');
  }

  void testCustomizeEnvFile() {
    CustomizeFiles(this._setup).customizeEnvFile();

    String envFile = this._setup.io.readFromFile(this._setup.root + '/.env');

    this._setup.requiredEnvVaribales.forEach((v) {
      if (!envFile.contains(v))
        throw {'#CustomizeEnvFile failed': '.env file doesnt contains $v'};
    });

    if (envFile.contains('null'))
      throw {'#CustomizeEnvFile failed': '.env file contains a null value'};

    print('CustomizeEnvFile\t\t\tsuccessed');
  }
}
