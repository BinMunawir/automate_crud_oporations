import 'generateEssentials.dart';

void main() {
  Essentials essentials = Essentials('y');
  essentials.provideEssentialFiles();
  essentials.generatePackage();
}


