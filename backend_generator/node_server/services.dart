import '../../io.dart';

class Services {
  IO _io = IO();
  String _root;
  String _dir;

  Services(this._root) {
    this._dir = this._root + 'src/services/';
    _io.createDir(this._dir);
  }

  void generate() {
    this._generateServices();
  }

  void _generateServices() {
    String content = '''
      const sqlStorage = require('sql_storage_system')

      export default {
          sqlStorage,
      }
    ''';

    _io.createFile(this._dir + 'index.ts');
    _io.writeFile(this._dir + 'index.ts', content);
  }
}
