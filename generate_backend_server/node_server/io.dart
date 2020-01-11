import 'dart:io';

// main(List<String> args) {
//   IO io = IO();
//   io.createFile('name/path.txt');
//   io.writeFile('name/path.txt', 'content\n\nhi');
//   io.writeFile('name/path.txt', 'mmmmmmmmmmt\n\nhi');
//   print(io.readFile('name/path.txt'));
// }

class IO {
  String _ioPath = './';

  void createDir(String path) {
    Directory dir = Directory(this._ioPath + this._ioPath + path);
    if (dir.existsSync()) dir.deleteSync(recursive: true);
    dir.createSync(recursive: true);
  }

  void createFile(String path) {
    File file = File(this._ioPath + path);
    if (file.existsSync()) file.deleteSync();
    file.createSync();
  }

  String readFile(String path) {
    File file = File(this._ioPath + path);
    return file.readAsStringSync();
  }

  void writeFile(String path, String content) {
    File file = File(this._ioPath + path);
    return file.writeAsStringSync(content);
  }
}
