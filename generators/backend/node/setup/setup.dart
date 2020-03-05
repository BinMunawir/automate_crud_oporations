import '../../../../io.dart';
import 'setupFiles.dart';

class Setup {
  IO _io;
  String _srcCodePath;
  String _sqlTables;
  Map<String, List<String>> _neededFiles;
  List<String> _neededEnvVaribales;

  String _projectName;
  String _root;

  Setup(this._srcCodePath, this._neededFiles, this._neededEnvVaribales,
      [this._sqlTables = '']) {
    this._io = IO();
    this._projectName = this._io.getConfigContent()['projectName'];
    this._root = this._io.generatedProjectsPath + '/' + this._projectName;

    this._setupDirectories();
    this._setupFiles();
  }

  void _setupDirectories() {
    this._io.createDir(this._root, override: true);

    this._neededFiles.keys.toList().forEach((dirPath) {
      String _buildingPath = this._root;
      dirPath.split('/').forEach((d) {
        _buildingPath += '/' + d;
        this._io.createDir(_buildingPath);
      });
    });
  }

  void _setupFiles() {
    this._neededFiles.forEach((dir, files) {
      files.forEach((f) {
        this
            ._io
            .copyFile(this._io.srcCodePath + '/' + dir, this._root + '/' + dir);
      });
    });

    SetupFiles(this);
  }

  String get srcCodePath => this._srcCodePath;
  String get sqlTables => this._sqlTables;
  IO get io => this._io;
  Map<String, List<String>> get neededFiles => this._neededFiles;
  List<String> get neededEnvVaribales => this._neededEnvVaribales;
  String get projectName => this._projectName;
  String get root => this._root;
}
