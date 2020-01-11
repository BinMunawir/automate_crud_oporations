import 'io.dart';

class Models {
  IO _io = IO();
  String _root;
  String _dir;

  Models(this._root) {
    this._dir = this._root + 'src/models/';
    _io.createDir(this._dir);
  }

  void generate() {
    this._generateHttp4000error();
    this._generateModels();
  }

  void _generateHttp4000error() {
    String content = '''
          export class HTTP400Error{
            code: number;
            message: string;
    
            constructor(code: number, message: string) {
                this.code = code;
                this.message = message;
            }
        }
        ''';

    _io.createFile(this._dir + 'http400error.ts');
    _io.writeFile(this._dir + 'http400error.ts', content);
  }

  void _generateModels() {
    this._io.getTables().forEach((t) => this._generateModel(t));
  }

  void _generateModel(Table t) {
    String _getInstance(List<List<String>> params) {
      String key;
      params.forEach((p) {
        if (p[2] == null) return;
        if (p[2].length == 1) key = p[0].substring(0, p[0].indexOf('ID'));
      });
      return key;
    }

    String _getParams(List<List<String>> params) {
      String content = '';
      params.forEach((p) {
        String type = 'string';
        if (p[1].contains('INT')) type = 'number';
        content += (p[0] + '?: ' + type + ' | null;\n');
      });
      return content;
    }

    this._io.createFile(this._dir + _getInstance(t.params) + '.model.ts');

    String content = '''
    interface ''' +
        _getInstance(t.params) +
        '''Model {
      ''' +
        _getParams(t.params) +
        '''}
    ''';
    this._io.createFile(this._dir + _getInstance(t.params) + '.model.ts');
    this
        ._io
        .writeFile(this._dir + _getInstance(t.params) + '.model.ts', content);
  }
}
