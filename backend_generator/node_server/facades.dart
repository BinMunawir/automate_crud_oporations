import '../../io.dart';

class Facades {
  IO _io = IO();
  String _root;
  String _dir;

  Facades(this._root) {
    this._dir = this._root + 'src/facades/';
    _io.createDir(this._dir);
  }

  void generate() {
    this._generateFacades();
  }

  void _generateFacades() {
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
