import 'io.dart';

class Routers {
  IO _io = IO();
  String _root;
  String _dir;

  Routers(this._root) {
    this._dir = this._root + 'src/routers/';
    _io.createDir(this._dir);
  }

  void generate() {
    this._generateRouters();
  }

  void _generateRouters() {
    List<String> tablesName = [];
    this._io.getTables().forEach((t) {
      tablesName.add(t.name[0].toLowerCase() + t.name.substring(1));
    });
    String _getImports() {
      String content = '';
      tablesName.forEach(
          (n) => content += 'import ' + n + ' from "./' + n + '.routes";\n');
      return content;
    }

    String _getExport() {
      String content = '';
      tablesName.forEach((n) => content += '...' + n + ', ');
      return 'export default [' + content + '];';
    }

    String content = '''
      ''' +
        _getImports() +
        _getExport() +
        '''
    ''';

    _io.createFile(this._dir + 'index.ts');
    _io.writeFile(this._dir + 'index.ts', content);
    tablesName.forEach((n) => _io.createFile(this._dir + n + '.routes.ts'));
  }
}
