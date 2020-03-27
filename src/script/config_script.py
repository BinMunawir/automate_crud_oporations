#!/usr/bin/python3

import os

# globals
filePath = os.environ['projectPath']+'/docs/config.txt'
variables = {
    "projectName": "",
    "hostname": "",
    "port": "",
    "secretKey": "",
    "dbHost": "",
    "dbUser": "",
    "dbPassword": "",
    "dbName": "",
    "storageHost": "",
}


# functions
def fillingVariables():
    while True:
        tmp = input('projectName: ').strip()
        if len(tmp) == 0:
            print("you have to enter the name of the project")
            continue
        variables['projectName'] = tmp
        break

    tmp = input('hostname [default localhost]: ').strip()
    if len(tmp) == 0:
        tmp = 'localhost'
    variables['hostname'] = tmp

    tmp = input('port [default 3000]: ').strip()
    if len(tmp) == 0:
        tmp = '3000'
    variables['port'] = tmp

    tmp = input('secretKey [default innosoft]: ').strip()
    if len(tmp) == 0:
        tmp = 'innosoft'
    variables['secretKey'] = tmp

    tmp = input('dbHost [default '+variables['hostname']+']: ').strip()
    if len(tmp) == 0:
        tmp = variables['hostname']
    variables['dbHost'] = tmp

    tmp = input('dbUser [default root]: ').strip()
    if len(tmp) == 0:
        tmp = 'root'
    variables['dbUser'] = tmp

    while True:
        tmp = input('dbPassword: ').strip()
        if len(tmp) == 0:
            print("you have to enter the password of the db")
            continue
        variables['dbPassword'] = tmp
        break

    tmp = input('dbName [default '+variables['projectName']+'DB'+']: ').strip()
    if len(tmp) == 0:
        tmp = variables['projectName']+'DB'
    variables['dbName'] = tmp

    tmp = input('storageHost [default '+variables['hostname'] +
                ':'+variables['port']+']: ').strip()
    if len(tmp) == 0:
        tmp = variables['hostname']+':'+variables['port']
    variables['storageHost'] = tmp


# script

# inform for user for generating config.txt file
print("we will generate config.txt file togather")
input("to continue press [Enter] key: ")
print()

# loop throgh essintial varibales
print("great.. please fill the following variables")
fillingVariables()

# write the result to the disk
file = open(filePath, 'w')
for k in variables:
    file.write(k+'='+variables[k])
    if k != 'storageHost':
        file.write(',')
    file.write('\n')
file.close()
print()
print('config.txt file created')
print()

# ask if the user want to configure the file
print()
configure = input('do you want to edite the file manualy? [y/default n] ')
if configure == 'y':
    input('note: dont add comma at the last variable [Enter] to continue: ')
    os.system('nano -l '+filePath)


# print(variables)
