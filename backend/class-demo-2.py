#Class Demo Week 3

from subject import Subject
from chatbot import Chatbot

#changes the elo and sets current prompt accordingly
def changeElo(val:int):

    #if the value is between 0 and 1600
    if (val >= 0 and val <= 1600):
        
        #set the subject elo
        englishSubject.subjectElo = val
        print("Elo Adjusted")

        #update current prompt
        if (val >= 1200):
            englishSubject.current_prompt = englishSubject.subjectPrompts[1600]
        elif(val < 1200 and val >= 400 ):
            englishSubject.current_prompt = englishSubject.subjectPrompts[800]
        elif(val <400):
            englishSubject.current_prompt = englishSubject.subjectPrompts[0]
    else:
        print("Value not within range")

#data to insert into the english subject class object
englishData = {
    'subjectName' : 'English',
    'subjectElo' : 800,
    'subjectBreakpoints': {0, 800, 1600},
    'subjectPrompts': 
    {
        0: 'Create a multiple choice question for someone who is at elemetary school level of intelligence pretaining to english.',
        800: 'Create a multiple choice question for someone who is at highschool school level of intelligence pretaining to english. You will provide the question and choices to the user and wait for them to respond in the next message. If they choose the correct option, say Correct. If not, say Incorrect explain why and then prompt for if the user wants another question.',
        1600: 'Create a multiple choice question for someone who is at highschool school level of intelligence pretaining to english. You will provide the question and choices to the user and wait for them to respond in the next message. If they choose the correct option, say Correct. If not, say Incorrect explain why and then prompt for if the user wants another question.',
    },
}

#english subject object
englishSubject = Subject(**englishData)
#client between open AI and user
sillybot = Chatbot()
#currentElo set by user
currentElo = englishSubject.subjectElo

#Flag to quit program
quit = False
#Flag to quit AI chat
loop = False

#set the current current prompt to reflect subject initally
englishSubject.current_prompt = englishSubject.subjectPrompts[englishSubject.subjectElo]

print("ASC English Subject Class Demo")

#main loop
while not quit:

    #menu options
    print("Set Elo : 1\nPrint Current Prompt: 2\nStart Demo: 3\nQuit = 4\n")
    menuChoice = int(input("User: "))

    #Set Elo
    if (menuChoice == 1):
        print("enter value between 0 and 1600\n")
        menuChoice = int(input("User: "))
        changeElo(menuChoice)
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


