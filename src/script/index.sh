#!/bin/bash

set -e
clear


export projectPath='/home/bu3abed/myprojects/automate_crud_oporations'

echo ""
echo "=============================================================="
echo "            Welcome to CRUD automation tool"
echo "=============================================================="
echo ""
echo "this is a simple script to guide you through generation"
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

echo "==================== CRUD automation tool ===================="
echo "CRUD automation tool has many options of generators. depending"
echo "on whichyou choose, it will let you know how to use it."
echo ""
read -p "press [Enter] to continue.."

echo ""
echo ""


# log config/models files
cat "$projectPath/docs/config.txt" > "$projectPath/src/script/logs/files.txt" &&
echo "#################################" >> "$projectPath/src/script/logs/files.txt" &&
cat "$projectPath/docs/models.txt" >> "$projectPath/src/script/logs/files.txt" &&
echo "" > "$projectPath/src/script/logs/sqlTables.txt" &&
echo "" > "$projectPath/src/script/logs/endpoints.txt" &&
echo "" > "$projectPath/src/script/logs/setup.txt" &&
echo "" > "$projectPath/src/script/logs/crud.txt"


while [ true ]; do
    echo "Choose one of the options bellow [1..6]: "
    echo "1) Generate \"full\" CRUD node"
    echo "2) Generate sql tables"
    echo "3) Generate REST-API endpoints"
    echo "4) Setup node project"
    echo "5) Add models CRUD node"
    echo "6) Add Auth component to node (comming soon..)"
    echo ""
    echo "Or press [q] to Quit"
    read choice
    
    case $choice in
        1)
            projectName=`cat "$projectPath/docs/config.txt" | grep projectName | cut -d'=' -f 2 | cut -d',' -f 1`
            dart "$projectPath/generators/sqlTables/index.dart" 2> "$projectPath/src/script/logs/sqlTables.txt"
            dart "$projectPath/generators/endpoints/index.dart" 2> "$projectPath/src/script/logs/endpoints.txt"
            dart "$projectPath/generators/backend/node/setup/index.dart" 2> "$projectPath/src/script/logs/setup.txt"
            dart "$projectPath/generators/backend/node/crud/index.dart" 2> "$projectPath/src/script/logs/crud.txt"
            echo ""
            echo "models crud code generated successfully"
            echo "the project folder's path: $projectPath/projects/$projectName"
            echo ""
            read -p "you are done. Press [Enter] to go back to the main menu.."
            echo "_________________________________________________-"
            echo ""
            echo ""
        ;;
        2)
            dart "$projectPath/generators/sqlTables/index.dart" 2> "$projectPath/src/script/logs/sqlTables.txt"
            echo ""
            echo "sql tables generated successfully"
            echo "the file's path: $projectPath/docs/sqlTables.txt"
            echo ""
            read -p "do you want to edit the file? [y/ default n]: " doEdit
            if [ "$doEdit" == "y" ]; then
                nano -l "$projectPath/docs/sqlTables.txt"
            fi
            read -p "you are done. Press [Enter] to go back to the main menu.."
            echo "_________________________________________________-"
            echo ""
            echo ""
        ;;
        3)
            dart "$projectPath/generators/endpoints/index.dart" 2> "$projectPath/src/script/logs/endpoints.txt"
            echo ""
            echo "endpoints generated successfully"
            echo "the file's path: $projectPath/docs/endpoints.txt"
            echo ""
            read -p "do you want to edit the file? [y/ default n]: " doEdit
            if [ "$doEdit" == "y" ]; then
                nano -l "$projectPath/docs/endpoints.txt"
            fi
            read -p "you are done. Press [Enter] to go back to the main menu.."
            echo "_________________________________________________-"
            echo ""
            echo ""
        ;;
        4)
            projectName=`cat "$projectPath/docs/config.txt" | grep projectName | cut -d'=' -f 2 | cut -d',' -f 1`
            dart "$projectPath/generators/backend/node/setup/index.dart" 2> "$projectPath/src/script/logs/setup.txt"
            echo ""
            echo "setup code generated successfully"
            echo "the project folder's path: $projectPath/projects/$projectName"
            echo ""
            read -p "you are done. Press [Enter] to go back to the main menu.."
            echo "_________________________________________________-"
            echo ""
            echo ""
        ;;
        5)
            projectName=`cat "$projectPath/docs/config.txt" | grep projectName | cut -d'=' -f 2 | cut -d',' -f 1`
            dart "$projectPath/generators/backend/node/crud/index.dart" 2> "$projectPath/src/script/logs/crud.txt"
            echo ""
            echo "models crud code generated successfully"
            echo "the project folder's path: $projectPath/projects/$projectName"
            echo ""
            read -p "you are done. Press [Enter] to go back to the main menu.."
            echo "_________________________________________________-"
            echo ""
            echo ""
        ;;
        q)
            echo "Bye"
            exit 0
        ;;
        *) continue ;;
    esac
done



