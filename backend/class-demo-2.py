#Class Demo Week 3

from chatbot import Chatbot
from english_subject import English
from user import User

#english subject object
englishSubject = English()
#client between open AI and user
sillybot = Chatbot()
#currentElo set by user
currentElo = englishSubject.subjectElo
#demo user class object
#demoUser = User()


#Flag to quit program
quit = False
#Flag to quit AI chat
loop = False

#set the current current prompt to reflect subject initally
englishSubject.current_prompt = englishSubject.subjectPrompts[englishSubject.subjectElo]
#demoUser.addSubject(englishSubject)

print("ASC English Subject Class Demo")

#main loop
while not quit:

    #menu options
    print("Set Elo : 1\nPrint Current Prompt: 2\nStart Demo: 3\nQuit = 4\n")
    menuChoice = int(input("User: "))

    #Set Elo
    if (menuChoice == 1):
        print("enter value to add or subtract to elo\n")
        menuChoice = int(input("User: "))
        englishSubject.changeElo(menuChoice)
    #Print current prompt
    elif (menuChoice == 2):
        print(englishSubject.current_prompt + "\n")
    #Start Chat
    elif (menuChoice == 3):
        loop = True
        print("Enter q to quit")
        sillybot.chat(englishSubject.current_prompt)
    #quit program
    elif (menuChoice == 4):
        quit = True
    else:
        print("Invaild input\n")
    
    #AI Chat Loop
    while loop:
        #get user input from command line
        user_message = input("User: ")

        #if message = 'q', terminate the loop
        if user_message.lower() == "q":
            loop = False

        #else, send message to chatbot
        else:
            sillybot.chat(user_message)


