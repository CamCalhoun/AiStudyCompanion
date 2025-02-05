import json
from typing import List
from pydantic import BaseModel
from subject import Subject

class User(BaseModel):
    # do we want to track userName?
    # we could use this in our front end to make it feel more interactive
    # "Hi userName, welcome back" etc
    # userName: str
    subjects: List[Subject] = []
    
    def addSubject(self, subject: Subject):
        if not any(s.subjectName == subject.subjectName for s in self.subjects):
            self.subjects.append(subject)
        else:
            print(f"Subject '{subject.subjectName}' is already being tracked.")

    def removeSubject(self, subjectName: str):
        self.subjects = [s for s in self.subjects if s.subjectName != subjectName]

    def exportSubjects(self, filename: str):
        with open(filename, "w") as f:
            json.dump([subject.model_dump() for subject in self.subjects], f, indent=4)

    def importSubjects(self, filename: str):
        with open(filename, "r") as f:
            data = json.load(f)
            for item in data:
                subject=Subject(**item)
                self.addSubject(subject)


