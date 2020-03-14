import '../../../../src/endpoint.dart';

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

    e.model.depends.asMap().forEach((i, m) {
      if (!e.path.contains(m.singlarName + 'ID')) return;
      if (!func.contains('FilteredBy'))
        func += 'FilteredBy';
      else
        func += 'And';
      func +=
          m.singlarName[0].toUpperCase() + m.singlarName.substring(1) + "ID";
    });

    return func;
  }
}
