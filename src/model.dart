import 'endpoint.dart';
import 'field.dart';

class Model {
  String pluralName, singlarName;
  List<Model> depends;
  List<Field> fields;
  List<Endpoint> endpoints;

  Model(this.pluralName, this.singlarName, this.depends, this.fields);

  
  List<Field> getIDs() {
    List<Field> ids = [];
    this.depends.forEach((m) => ids.addAll(m.getIDs()));
    ids.add(Field(this.singlarName + 'ID', '', ''));

    return ids;
  }
}
