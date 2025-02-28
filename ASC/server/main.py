from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from SubjectClasses.english_subject import English
from SubjectClasses.geography_subject import Geography
from SubjectClasses.computerScience_subject import ComputerScience
from SubjectClasses.history_subject import History

from user import User


testUser = User()
# testUser.addSubject(English())
# testUser.addSubject(Geography())
# testUser.addSubject(ComputerScience())
# testUser.addSubject(History())


app = FastAPI()

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

@app.get("/api/export")
async def export():
    if not testUser.subjects:
        return JSONResponse(content={"error": "No subjects to export"}, status_code=400)
    user_data = testUser.exportSubjects()
    return JSONResponse(content=user_data, media_type="application/json")
