import '../../src/field.dart';
import '../../src/io.dart';
import '../../src/model.dart';

class SqlTables {
  IO _io = IO();

  void run() {
    String content = '';
    this
        ._io
        .getModels()
        .forEach((k, v) => content += this._getTable(v) + '\n\n');

    this._io.createFile(this._io.docsPath + '/sqlTables.txt', override: true);
    this._io.writeToFile(this._io.docsPath + '/sqlTables.txt', content);
  }

  String _getTable(Model model) {
    String content = 'CREATE TABLE ' +
        model.pluralName[0].toUpperCase() +
        model.pluralName.substring(1) +
        ' (\n';
    model.fields.forEach((f) => content += '\t'+this._getField(f) + '\n');
    content += 'PRIMARY KEY (' + model.singlarName + 'ID)\n);';

    return content;
  }

  String _getField(Field field) {
    String content = '';

    content += field.name + '\t\t';
    content += field.type.contains('INT') || field.type.contains('CHAR')
        ? field.type
        : 'VARCHAR(255)';
    if (field.info == 'u') content += '\t\tNOT NULL UNIQUE';
    content += ',';

    return content;
  }
}
