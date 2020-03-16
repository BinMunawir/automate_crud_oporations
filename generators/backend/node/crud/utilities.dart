import '../../../../src/endpoint.dart';
import '../../../../src/model.dart';

class Utilities {
  String getEndpointParams(Endpoint e) {
    return e.params
        .map<String>((p) {
          return "'" + p + "'";
        })
        .toList()
        .toString();
  }

  String getEndpointFunction(Endpoint e) {
    String func = '';
    if (e.method == 'GET')
      func += 'get';
    else if (e.method == 'POST')
      func += 'create';
    else if (e.method == 'PUT')
      func += 'update';
    else if (e.method == 'DELETE') func += 'delete';

    if (e.path.substring(e.path.lastIndexOf('/') + 1) ==
            ':${e.model.singlarName}ID' ||
        e.method == 'POST')
      func += e.model.singlarName[0].toUpperCase() +
          e.model.singlarName.substring(1);
    else
      func += 'All' +
          e.model.pluralName[0].toUpperCase() +
          e.model.pluralName.substring(1);

    if (e.model.depends.length != 0 && e.method == 'GET') {
      if (e.model.depends.length == 2 &&
          e.path.contains(e.model.depends[0].singlarName + 'ID') &&
          e.path.contains(e.model.depends[1].singlarName + 'ID'))
        func += 'FilteredBy' +
            e.model.depends[0].singlarName[0].toUpperCase() +
            e.model.depends[0].singlarName.substring(1) +
            'IDAnd' +
            e.model.depends[1].singlarName[0].toUpperCase() +
            e.model.depends[1].singlarName.substring(1) +
            'ID';
      else if (e.path.contains(e.model.depends[0].singlarName + 'ID'))
        func += 'FilteredBy' +
            e.model.depends[0].singlarName[0].toUpperCase() +
            e.model.depends[0].singlarName.substring(1) +
            'ID';
      else if (e.model.depends.length == 2 &&
          e.path.contains(e.model.depends[1].singlarName + 'ID'))
        func += 'FilteredBy' +
            e.model.depends[1].singlarName[0].toUpperCase() +
            e.model.depends[1].singlarName.substring(1) +
            'ID';
    }
    return func;
  }

  String handleFilesUpload(Model model) {
    String content = '';

    model.fields.forEach((f) {
      if (f.type.length == 0 ||
          f.type.contains('INT') ||
          f.type.contains('CHAR')) return;
      content += "\nif(data." +
          f.name +
          ")\n\tdata." +
          f.name +
          " = await utilities.storeFile(data." +
          f.name +
          ", '" +
          f.type.split(':')[0].trim() +
          "/" +
          model.pluralName +
          "-'+ data." +
          model.singlarName +
          "ID + '-" +
          f.name +
          "');\n";
    });

    return content;
  }

  String handleRequiredFields(Model model) {
    String content = '';

    model.fields.forEach((f) {
      if (f.info.length < 3 && f.info == 'r') {
        content += "\nif (!data." +
            f.name +
            ") throw new HTTP400Error(1111, '" +
            f.name +
            " is required')\n";
      }
    });

    return content;
  }
}
