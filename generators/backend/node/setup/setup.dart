import '../../../../src/io.dart';
import 'customizeFiles.dart';

class NodeSetup {
  IO _io;
  String _sqlTables;
  Map<String, List<String>> _requiredDirectoriesAndFiles;
  List<String> _requiredEnvVaribales;

  String _projectName;
  String _root;

  NodeSetup(this._requiredDirectoriesAndFiles, this._requiredEnvVaribales,
      [this._sqlTables = '']) {
    this._io = IO();
    this._projectName = this._io.getConfigContent()['projectName'];
    this._root = this._io.projectsPath + '/' + this._projectName;
  }

  void run() {
    this.createDirectories();
    this.copyFilesFromSrcCode();
    this.customizeFiles();
  }

  void createDirectories() {
    this._io.createDir(this._root, override: true);

    this._requiredDirectoriesAndFiles.keys.toList().forEach((dirPath) {
      String _buildingPath = this._root;
      dirPath.split('/').forEach((d) {
        _buildingPath += '/' + d;
        this._io.createDir(_buildingPath);
      });
    });

    this._io.getModels().forEach((k, v) => v.fields.forEach((f) {
          if (f.type.trim().length == 0 ||
              f.type.contains('INT') ||
              f.type.contains('CHAR')) return;
          this._io.createDir(this._root + '/public/' + f.name);
        }));
  }

  void copyFilesFromSrcCode() {
    this._requiredDirectoriesAndFiles.forEach((dir, files) {
      files.forEach((f) {
        this._io.copyFile(this.io.srcCodePath + '/' + dir + '/' + f,
            this._root + '/' + dir + '/' + f);
      });
    });
  }

  void customizeFiles() {
    CustomizeFiles customizeFiles = CustomizeFiles(this);
    customizeFiles.customizePackageFile();
    customizeFiles.customizeEnvFile();
    customizeFiles.customizeSqlTablesFile();
    customizeFiles.customizeSwaggerFile();
    customizeFiles.customizeRoutesIndexFile();
  }

  String get sqlTables => this._sqlTables;
  IO get io => this._io;
  Map<String, List<String>> get requiredDirectoriesAndFiles =>
      this._requiredDirectoriesAndFiles;
  List<String> get requiredEnvVaribales => this._requiredEnvVaribales;
  String get projectName => this._projectName;
  String get root => this._root;
}
