from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from SubjectClasses.english_subject import English
from SubjectClasses.geography_subject import Geography
from SubjectClasses.computerScience_subject import ComputerScience
from SubjectClasses.history_subject import History

from user import User
from pydantic import BaseModel
from typing import List, Dict
import json
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
    allow_origins=origins,
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

    # Store user data in a User object
    user.importSubjects(subjects)
    
    # Store current subject, elo, and set prompt
    currentSubject = user.subjects[curSubject]
    currentSubject.updatePrompt()


    # If this is a new chat, create a new instance of chatbot
    # removing context from old chat.
    if newChat:
        chatbot = Chatbot()

    response = chatbot.generateQuestion(currentSubject.currentPrompt)

    userIfWrong = copy.deepcopy(user)
    ifWrongSubject = userIfWrong.subjects[curSubject]

    ifWrongSubject.setSubjectElo(-20)
    currentSubject.setSubjectElo(20)

    updated_subjects_right = user.exportSubjects()
    updated_subjects_wrong = userIfWrong.exportSubjects()

    return {
        "ai_response": response, 
        "subjects_right": updated_subjects_right, 
        "subjects_wrong": updated_subjects_wrong, 
        "newChatState": False 
    }

@app.get("/api/hello")
async def hello():
    print("made it to api request")
    return {"message": "Hello from FastAPI!"}


