import '../../../../src/field.dart';
import '../../../../src/io.dart';
import '../../../../src/model.dart';

class CrudModel {
  IO _io = IO();
  Model _model;
  String _content = '';

  CrudModel(this._model);

  void run() {
    this._content += 'interface ' +
        this._model.singlarName[0].toUpperCase() +
        this._model.singlarName.substring(1) +
        'Model {\n';
    this._model.fields.forEach((p) {
      this._content += this.paramContent(p) + '\n';
    });

    this._content += '}';

    this.writeModel();
  }

  String paramContent(Field p) {
    return p.name +
        '?: ' +
        (p.type.contains('INT') ? 'number ' : 'string ') +
        '| null;';
  }

  void writeModel() {
    String modelsPath = this._io.projectsPath +
        '/' +
        this._io.getConfigContent()['projectName'] +
        '/src/models/';

    this._io.createFile(modelsPath + this._model.pluralName + '.model.ts',
        override: true);
    this._io.writeToFile(
        modelsPath + this._model.pluralName + '.model.ts', this._content);
  }
}
