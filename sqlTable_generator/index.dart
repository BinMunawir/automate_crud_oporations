import '../io.dart';

void main(List<String> args) {
  IO io = IO();

  String content = formatOutput(io.getTables());

  io.createFile('./docs/sqlTables.txt');
  io.writeFile('./docs/sqlTables.txt', content);
}

String formatOutput(List<Table> tables) {
  String sql = '';
  tables.forEach((t) {
    sql += '''\n
CREATE TABLE ''' +
        t.name +
        ''' (
''' +
        getSqlContent(t.params) +
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
    String c = '\t';
    c += p[0] + '\t\t\t';
    if (p[2] == 'p')
      c += 'INT NOT NULL AUTO_INCREMENT';
    else if (p[2].length > 1)
      c += 'INT';
    else if (p[1].contains('CHAR') || p[1].contains('INT'))
      c += p[1];
    else
      c += 'VARCHAR(255)';
    if (p[2] == 'u') c += ' NOT NULL UNIQUE';
    c += ',\n';
    content += c;
    if (p[2] == 'p') {
      primaries.add(p[0]);
    } else if (p[2] == 'u')
      ;
    else if (p[2].isNotEmpty) {
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
