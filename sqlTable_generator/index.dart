import '../io.dart';

void main(List<String> args) {
  IO io = IO();

  String content = formatOutput(io.getTables());

  io.createFile('./docs/sqlTables.txt');
  io.writeFile('./docs/sqlTables.txt', content);
}

String formatOutput(List<Table> tables) {
  String sql = '';
  tables.forEach((e) {
    sql += '''
      CREATE TABLE ''' +
        e.name +
        ''' (
        ''' +
        getSqlContent(e.params) +
        '''
              );
            ''';
  });
  return sql;
}

String getSqlContent(List<List<String>> params) {
  List<String> primaries = [];
  List<String> foriens = [];
  String content = '';

  params.forEach((p) {
    String c = '';
    c += p[0] + '\t\t';
    c += p[1].isEmpty ? 'VARCHAR(255)' : p[1];
    c += ',\n';
    content += c;
    if (p[2] == 'p') {
      primaries.add(p[0]);
    } else if (p[2].isNotEmpty) {
      primaries.add(p[0]);
      foriens.add(p[2]);
    }
  });
  String pContent = 'PRIMARY KEY (';
  primaries.forEach((p) {
    pContent += p;
    pContent += p == primaries[primaries.length - 1] ? '' : ', ';
  });
  pContent += ')\n';
  String fContent = '';
  foriens.forEach((f) {
    fContent += ', FOREIGN KEY (' +
        primaries[foriens.indexOf(f) + 1] +
        ') REFERENCES ' +
        f +
        ' (' +
        primaries[foriens.indexOf(f) + 1] +
        ')\n';
  });
  content += (pContent + fContent);
  return content;
}
