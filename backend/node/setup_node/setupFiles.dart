import 'setup_node.dart';

class SetupFiles {
  SetupNode _setupNode;

  SetupFiles(this._setupNode) {
    this.setupPackageFile();
    this.setupEnvFile();
    this.setupSqlTablesFile();
    this.setupSwaggerFile();
  }

  void setupPackageFile() {
    String content =
        this._setupNode.io.readFromFile(this._setupNode.root + '/package.json');
    content.replaceFirst('legacy_code', this._setupNode.projectName);
    this
        ._setupNode
        .io
        .writeToFile(this._setupNode.root + '/package.json', content);
  }

  void setupEnvFile() {
    String content = '';

    Map<String, String> configVar = this._setupNode.io.getConfigContent();
    this._setupNode.neededEnvVaribales.forEach((v) {
      content += (v + '=' + configVar[v] + '\n');
    });

    this._setupNode.io.writeToFile(this._setupNode.root + '/.env', content);
  }

  void setupSqlTablesFile() {
    String content = 'export const tables = `\n\n';

    String tables = this._setupNode.io.readFromFile('../docs/sqlTables.txt');
    content += tables;
    content += '\n\n`;';

    this._setupNode.io.writeToFile(
        this._setupNode.root + '/src/config/sqlTables.ts', content);
  }

  void setupSwaggerFile() {
    String content = '\n\n';

    this._setupNode.io.writeToFile(
        this._setupNode.root + '/src/config/swagger.json', content);
  }
}
