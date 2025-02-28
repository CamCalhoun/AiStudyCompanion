import json
from typing import Dict
from pydantic import BaseModel
from subject import Subject
from SubjectClasses.english_subject import English
from SubjectClasses.geography_subject import Geography
from SubjectClasses.computerScience_subject import ComputerScience
from SubjectClasses.history_subject import History
from SubjectClasses.math_subject import Math

""" Design Doc

Class name: User

Class description: The User class will house a given users tracked subjects, as well as functionality pertaining to user information.

Class data members: trackedSubjects

Class member functions: addSubject(), removeSubject(), importData(), exportData()
"""

class User(BaseModel):
    # do we want to track userName?
    # we could use this in our front end to make it feel more interactive
    # "Hi userName, welcome back" etc
    # userName: str
    subjects: Dict[str, Subject] = {}
    
    def addSubject(self, subject: Subject):
        subject_name = subject.subjectName
        if subject_name not in self.subjects:
            self.subjects[subject_name] = subject
        else:
            print(f"Subject '{subject.subjectName}' is already being tracked.")

    def removeSubject(self, subjectName: str):
        if subjectName in self.subjects:
            del self.subjects[subjectName]
        else:
            print("Subject not found")

    def exportSubjects(self):
        return [subject.model_dump() for subject in self.subjects.values()]

    def importSubjects(self, filename: str):
        with open(filename, "r") as f:
            data = json.load(f)
            for item in data:
                subject_name = item.get("subjectName")

                if subject_name == "English":
                    subject = English(**item)
                elif subject_name == "Geography":
                    subject = Geography(**item)
                elif subject_name == "ComputerScience":
                    subject = ComputerScience(**item)
                elif subject_name == "History":
                    subject = History(**item)
                elif subject_name == "Math":
                    subject = Math(**item)
                else:
                    raise ValueError("Unkown Subject")
                
                self.addSubject(subject)

