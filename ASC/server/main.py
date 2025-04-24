from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from SubjectClasses.english_subject import English
from SubjectClasses.geography_subject import Geography
from SubjectClasses.computerScience_subject import ComputerScience
from SubjectClasses.history_subject import History
from SubjectClasses.math_subject import Math

from user import User
from pydantic import BaseModel
from typing import List, Dict
from APITools import Chatbot
import copy

app = FastAPI()

user = User()

chatbot = Chatbot()
# user.addSubject(English())
# user.addSubject(Geography())
# user.addSubject(ComputerScience())
# user.addSubject(History())
#

origins = [
    "http://localhost:5173",
    'https://awc-staging.vercel.app',
    'https://ai-study-companion-pwc.vercel.app',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AddSubjectPayload(BaseModel):
    subjects: List[Dict]
    newSubject: str

class QuestionPayload(BaseModel):
    subjects: List[Dict]
    curSubject: str
    newChat: bool
    delta: float
    streak: bool

class FlashcardsPayload(BaseModel):
    subjects: List[Dict]
    curSubject: str
    newChat: bool
 

@app.post("/api/add_subject")
async def add_subject(payload: AddSubjectPayload):
    subjects = payload.subjects
    newSubject = payload.newSubject

    user.importSubjects(subjects)
    match newSubject:
        case "English":
            user.addSubject(English())
        case "Geography":
            user.addSubject(Geography())
        case "Computer Science":
            user.addSubject(ComputerScience())
        case "History":
            user.addSubject(History())
        case "Math":
            user.addSubject(Math())
        case _:
            print("Subject not found")

    updated_subjects = user.exportSubjects()
    return {"subjects": updated_subjects}

@app.post("/api/generate_question")
async def generate_question(payload: QuestionPayload):
    # Assign values from payload
    global chatbot
    subjects = payload.subjects
    curSubject = payload.curSubject
    newChat = payload.newChat
    delta = payload.delta
    streak = payload.streak
    points: int

    basePoints = 15
    
    # if curSubject == math : set some bool to search for equations
    # Store user data in a User object
    user.importSubjects(subjects)
    
    # Store current subject, elo, and set prompt
    currentSubject = user.subjects[curSubject]
    currentSubject.updatePrompt()
    
    # if the user is streaking correct or incorrect answers, increase delta to a max of 2.0
    # if they are not streaking, decrease by 10%, to a min of .6
    # if no string was provided, that means:
    #     question was unanswered, 
    #     or a newChat was started,
    # so delta should remain unchanged
    if streak == True:
        delta = min(2.0, delta + .1)
    elif streak == False:
        delta = max(.6, delta * .9)


    # If this is a new chat, create a new instance of chatbot
    # removing context from old chat.
    # Additionally, reset delta back to 1
    if newChat:
        chatbot = Chatbot(curSubject)
        delta = 1

    response = chatbot.generateQuestion(currentSubject.currentPrompt)

    userIfWrong = copy.deepcopy(user)
    ifWrongSubject = userIfWrong.subjects[curSubject]

    points = int(round(basePoints * delta))

    ifWrongSubject.setSubjectElo(-points)
    currentSubject.setSubjectElo(points)

    updated_subjects_right = user.exportSubjects()
    updated_subjects_wrong = userIfWrong.exportSubjects()

    return {
        "ai_response": response, 
        "subjects_right": updated_subjects_right, 
        "subjects_wrong": updated_subjects_wrong,
        "delta": delta
    }

@app.post("/api/generate_flashcards")
async def generate_flashcards(payload: FlashcardsPayload):
    print("LOL")
    global chatbot
    subjects = payload.subjects
    curSubject = payload.curSubject
    newChat = payload.newChat
    flashcards = []

    user.importSubjects(subjects)
    currentSubject = user.subjects[curSubject]
    currentSubject.updatePrompt()

    if newChat:
        chatbot = Chatbot(curSubject)
    
    for _ in range(5):
        flashcards.append(chatbot.generateQuestion(currentSubject.currentPrompt))
    user.exportSubjects()

    return {
        "ai_response": flashcards
    }

@app.get("/api/hello")
async def hello():
    print("made it to api request")
    return {"message": "Hello from FastAPI!"}


@app.get("/")
def root():
    return {"status": "ok", "message": "AI Study Companion backend is alive 🚀"}
