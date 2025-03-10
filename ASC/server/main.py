from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from SubjectClasses.english_subject import English
from SubjectClasses.geography_subject import Geography
from SubjectClasses.computerScience_subject import ComputerScience
from SubjectClasses.history_subject import History

from user import User

from typing import List, Dict
import json

app = FastAPI()

user = User()

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

@app.get("/api/hello")
async def hello():
    print("made it to api request")
    return {"message": "Hello from FastAPI!"}

@app.post("/api/add_subject")
async def add_subject(subjects: list[dict], newSubject: str):
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

