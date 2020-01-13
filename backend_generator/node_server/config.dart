import '../../io.dart';

class Config {
  IO _io = IO();
  String _root;
  String _dir;

  Config(this._root) {
    this._dir = this._root + 'src/config/';
    _io.createDir(this._dir);
  }

  void generate() {
    this._generateConfig();
    this._generateSqlTable();
  }

  void _generateConfig() {
    String content = '''
      {}
    ''';

    _io.createFile(this._dir + 'swagger.json');
    _io.writeFile(this._dir + 'swagger.json', content);
  }

  void _generateSqlTable() {
    String content = '''
    export const tables = `
    ''' +
        this._io.readFile('./docs/sqlTables.txt') +
        '''
    `;
    ''';

    _io.createFile(this._dir + 'sqlTables.ts');
    _io.writeFile(this._dir + 'sqlTables.ts', content);
  }
}
