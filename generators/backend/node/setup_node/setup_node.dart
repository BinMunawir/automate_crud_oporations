import '../../../io.dart';
import 'setupFiles.dart';

class SetupNode {
  IO _io;
  String _legacyCodePath, _parentPath;
  Map<String, List<String>> _neededFiles;
  List<String> _neededEnvVaribales;
  String _projectName;
  String _root;

  SetupNode(this._parentPath, this._legacyCodePath, this._neededFiles,
      this._neededEnvVaribales) {
    this._io = IO();
    this._projectName = this._io.getConfigContent()['projectName'];
    this._root = this._parentPath + '/' + this._projectName;

    this._setupDirectories();
    this._setupFiles();
  }

  void _setupDirectories() {
    this._io.createDir(this._root, override: true);

    this._neededFiles.keys.toList().forEach((path) {
      String _buildingPath = this._root;
      path.split('/').forEach((d) {
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
            .copyFile(this._legacyCodePath + '/' + dir, this._root + '/' + dir);
      });
    });

    SetupFiles(this);
  }

  IO get io => this._io;
  String get legacyCodePath => this._legacyCodePath;
  String get parentPath => this._parentPath;
  Map<String, List<String>> get neededFiles => this._neededFiles;
  List<String> get neededEnvVaribales => this._neededEnvVaribales;
  String get projectName => this._projectName;
  String get root => this._root;
}
