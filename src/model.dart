import 'field.dart';

class Model {
  String pluralName, singlarName;
  List<String> depends;
  List<Field> fields;

  Model(this.pluralName, this.singlarName, this.depends, this.fields);

  Model.text(String modelText) {
    modelText.split(';').asMap().forEach((i, r) {
      r = r.trim();
      if (i == modelText.split(';').length - 1) return;
      if (i == 0) {
        this.pluralName = r.split('>')[0].trim().split('-')[0].trim();
        this.singlarName = r.split('>')[0].trim().split('-')[1].trim();
        r
            .split('>')[1]
            .trim()
            .split(',')
            .forEach((d) => this.depends.add(d.trim()));
        return;
      }
      this.fields.add(Field.text(r));
    });
  }
}
