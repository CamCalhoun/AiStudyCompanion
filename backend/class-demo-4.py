#Class Demo Week 3

from APITools import Chatbot
from SubjectClasses.english_subject import English
from SubjectClasses.geography_subject import Geography
from SubjectClasses.computerScience_subject import ComputerScience
from SubjectClasses.history_subject import History
from SubjectClasses.math_subject import Math
from user import User

testUser = User()
testUser.addSubject(English())
testUser.addSubject(Geography())
testUser.addSubject(ComputerScience())
testUser.addSubject(History())
testUser.addSubject(Math())

#english subject object
currentSubject = testUser.subjects["English"]
#client between open AI and user
sillybot = Chatbot()
#currentElo set by user
currentElo = currentSubject.subjectElo
#demo user class object
#demoUser = User()


#Flag to quit program
quit = False
#Flag to quit AI chat
loop = False

#set the current current prompt to reflect subject initally
currentSubject.updatePrompt()
#demoUser.addSubject(currentSubject)

print("ASC English Subject Class Demo")
print("------------------------------")

#main loop
while not quit:

    #menu options
    print("\nCurrent subject: "+currentSubject.subjectName+"\n")
    print("\nSet Subject: 1\nSet Elo: 2\nPrint Current Prompt: 3\nStart Demo: 4\nQuit = 5\n")
    menuChoice = int(input("User: "))

    #Set Elo
    if (menuChoice == 1):
        print("\nChoose a subject:\nEnglish: 1\nGeography: 2\nComputer Science: 3\nHistory: 4\nMath: 5\n")
        subjectChoice = int(input("User: "))
        if (subjectChoice == 1):
            currentSubject = testUser.subjects["English"]
        elif (subjectChoice == 2):
            currentSubject = testUser.subjects["Geography"]
        elif (subjectChoice == 3):
            currentSubject = testUser.subjects["Computer Science"]
        elif (subjectChoice == 4):
            currentSubject = testUser.subjects["History"]
        elif (subjectChoice == 5):
            currentSubject = testUser.subjects["Math"]
        else:
            print("Invalid input\n")

    elif (menuChoice == 2):
        print("enter value to add or subtract to elo\n")
        menuChoice = int(input("User: "))
        currentSubject.setSubjectElo(menuChoice)
    #Print current prompt
    elif (menuChoice == 3):
        print(currentSubject.currentPrompt + "\n")
    #Start Chat
    elif (menuChoice == 4):
        print("Enter q to quit")
        while True:
            sillybot.generateQuestion(currentSubject.currentPrompt)
             
            user_input = input("Generate another question? (Enter to continue, 'q' to quit): ").strip().upper()
            if user_input == 'Q':
                print("Exiting demo...")
                break
    #quit program
    elif (menuChoice == 5):
        quit = True
    else:
        print("Invaild input\n")
    
    #AI Chat Loop
    
