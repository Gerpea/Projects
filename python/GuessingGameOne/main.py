import random

count = 1
while True:
    rndNum = random.randint(1, 9)
    while True:
        usr_inp = input("Enter a number (type 'exit' for quit): ")
        if usr_inp == 'exit':
            exit()
        else:
            if int(usr_inp) == rndNum:
                print("Exactly from " + str(count) + " times")
                count = 1
                break
            else:
                count += 1 
                if int(usr_inp) < rndNum:
                    print("Something less")
                else: 
                    if int(usr_inp) > rndNum:
                        print("Something great")
            

    