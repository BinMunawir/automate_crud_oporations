import 'setup.dart';

class SetupFiles {
  Setup _setup;

  SetupFiles(this._setup) {
    this.setupPackageFile();
    this.setupEnvFile();
    this.setupSqlTablesFile();
    this.setupSwaggerFile();
  }

  void setupPackageFile() {
    String content =
        this._setup.io.readFromFile(this._setup.root + '/package.json');
    content.replaceFirst('node_project_name', this._setup.projectName);
    this._setup.io.writeToFile(this._setup.root + '/package.json', content);
  }

  void setupEnvFile() {
    String content = '';

    Map<String, String> configVar = this._setup.io.getConfigContent();
    this._setup.neededEnvVaribales.forEach((v) {
      content += (v + '=' + configVar[v] + '\n');
    });

    this._setup.io.writeToFile(this._setup.root + '/.env', content);
  }

  void setupSqlTablesFile() {
    String content =
        'export const tables = `\n\n ${this._setup.sqlTables} \n\n`;';

    this
        ._setup
        .io
        .writeToFile(this._setup.root + '/src/config/sqlTables.ts', content);
  }

  void setupSwaggerFile() {
    String content = '\n\n';

    this
        ._setup
        .io
        .writeToFile(this._setup.root + '/src/config/swagger.json', content);
  }

  void setupRoutesIndexFile() {
    String content = '\n\nexport default [ ];';

    this
        ._setup
        .io
        .writeToFile(this._setup.root + '/src/routes/index.ts', content);
  }
}
