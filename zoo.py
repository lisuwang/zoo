# python 3.5.2
import string
class Animal:
    sequence = []
    name = []
    count = 10000

    def zoo():
        total_str = ''
        i = 0
        for key in Animal.sequence:
            total_str += str(key)
            total_str += '. '
            total_str += string.capwords(str(Animal.name[i]))
            total_str += '\n'
            i += 1
        return total_str

    def __str__(self):
        return str(Animal.sequence[-1])+'. '+string.capwords(Animal.name[-1])

    def __init__(self, var):
        Animal.name.append(var)
        Animal.count += 1
        Animal.sequence.append(Animal.count)


dog = Animal('dog')
cat = Animal('cat')
fish = Animal('fish')
lion = Animal('lion')
mouse = Animal('mouse')
horse = Animal('horse')
print(Animal.zoo())
assert str(horse) == '10006. Horse'
