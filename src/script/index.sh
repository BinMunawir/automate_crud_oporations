#!/bin/bash

set -e
clear


projectPath='/home/bu3abed/myprojects/automate_crud_oporations'

echo "==============================="
echo "Welcome to CRUD automation tool"
echo "==============================="
echo ""
echo "this is a simple script to guide
you through creation of crud backend"
echo ""
echo ""

doSkip=0
for p in $@; do
    if [ $p == "--skip" ]; then
        doSkip=1
    fi
done


if [ $doSkip == 0 ]; then
    echo "====== Generating config.txt file ======"
    "$projectPath/src/script/config_script.py"
    echo ""
    echo ""
    echo "====== Generating models.txt file ======"
    "$projectPath/src/script/models_script.py"
    echo ""
    echo ""
fi

echo "===== you are ready ====="
echo "great so far, now it's time to generate the crud system"
read -p "press [Enter] to continue.."
dart "$projectPath/generators/sqlTables/index.dart"
dart "$projectPath/generators/endpoints/index.dart"
dart "$projectPath/generators/backend/node/setup/index.dart"
dart "$projectPath/generators/backend/node/crud/index.dart"

echo ""
echo "Great you are done"
echo "you can find your generated code at "
echo "$projectPath/projects"
echo "Bye"

