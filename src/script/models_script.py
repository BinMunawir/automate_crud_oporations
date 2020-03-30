#!/usr/bin/python3

import os


# globals
# the projectPath should be in the evnirnment variables
filePath = os.environ['projectPath']+'/docs/models.txt'
models = {}


# functions
def getModelNames():
    pName = ''
    sName = ''
    while True:
        tmp = input('Enter the model plural name [example books]: ').strip()
        if len(tmp) == 0:
            continue
        pName = tmp
        break
    while True:
        tmp = input(
            'Enter the model singular name [example book]: ').strip()
        if len(tmp) == 0:
            continue
        sName = tmp
        break
    return [pName, sName]


def getFileType():
    type = ''
    while True:
        tmp = input(
            'enter the folder that will contain the uploaded files [example images]: ').strip()
        if len(tmp) == 0:
            continue
        type = tmp
        break
    while True:
        print('enter the accepted file extensions [example png] ')
        tmp = input(
            'note: if there are more one accepted extension separate them by dash(-) [example docx-pdf]: ').strip()
        if len(tmp) == 0:
            continue
        type += ': '+tmp
        break
    return type


def getFieldType():
    type = ''
    print('choose a type for the field from menu bellow [1..4]: ')
    print('1) string')
    print('2) int')
    print('3) date')
    print('4) file')
    tmp = input().strip()
    if len(tmp) == 0:
        print('type a number from 1 to 4')
        return getFieldType()
    if tmp == '1':
        type = ''
    elif tmp == '2':
        type = 'INT'
    elif tmp == '3':
        type = 'BIGINT'
    elif tmp == '4':
        type = getFileType()
    else:
        type = getFieldType()
    return type


def getFieldExtra():
    extra = ''
    u = input('is the field uniqe? [y/default n]: ').strip()
    if u == 'y':
        extra = 'u'
    r = input('is the field required? [y/default n]: ').strip()
    if r == 'y':
        extra += 'r'
    return extra


def getModelFields():
    fields = []
    while True:
        print()
        addField = input('do you want to add field? (y/n): ').strip()
        if addField == 'n':
            break
        if addField == 'y':
            name = ''
            while True:
                tmp = input('Enter the name of the field: ').strip()
                if len(tmp) == 0:
                    print('you have to enter the name of the field')
                    continue
                name = tmp
                break
            type = getFieldType()
            extra = getFieldExtra()
            fields.append(name+', '+type+', '+extra+';')

    result = ''
    for f in fields:
        result += f+'\n'
    return result


def getModelDepnds():
    depends = []
    if len(models) == 0:
        return ''
    while True:
        tmp = input(
            'is the model depends on other models? (y/ default n): ').strip()
        if tmp == 'y':
            while True:
                print(
                    'choose one of the models bellow [1..'+str(len(models))+']')
                keys = [k for k in models]
                i = 1
                for k in keys:
                    print(str(i)+') '+k)
                    i += 1
                tmp = input().strip()
                try:
                    tmp = int(tmp)
                except:
                    continue
                if tmp < 1 and tmp > len(models):
                    continue
                depends.append(keys[tmp - 1])
                break
        else:
            break
    result = ''
    for i, d in enumerate(depends):
        result += d
        if i == len(depends)-1:
            continue
        result += ','
    return result


# script
# inform for user for generating models.txt file
print("we will generate models.txt file togather")
input("to continue press [Enter] key: ")
print()


while True:
    print()
    if len(models) == 0:
        addModel = 'y'
    else:
        addModel = input('do you want to add a model? (y/n): ').strip()
    if addModel == 'n':
        break
    if addModel == 'y':
        # get model names
        names = getModelNames()
        # get model dependences
        depends = getModelDepnds()
        # get model fields
        fields = getModelFields()

        models[names[0]] = [names[0]+'-'+names[1], depends, fields]

file = open(filePath, 'w')
modelsList = [v for v in models.values()]
for i, m in enumerate(modelsList):
    if i != 0:
        file.write('_____\n\n')
    file.write(m[0])
    if len(m[1]) != 0:
        file.write(" > " + m[1])
    file.write(';\n')
    file.write(m[2]+'\n\n')
file.close()


print()
print('models.txt file created')
print()

# ask if the user want to configure the file
print()
configure = input('do you want to edite the file manualy? [y/default n] ')
if configure == 'y':
    os.system('nano -l '+filePath)
