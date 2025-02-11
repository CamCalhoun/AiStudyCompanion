from pydantic import BaseModel, Field
from typing import List, Dict

""" Design Doc
Class name: Subjects

Class description: The Subject class is a parent class that houses all generic methods and attributes applicable to all classes. 
                   This class will not be instantiated on its own but serves as a blueprint for every subject that inherits it.

Class data members: subjectName, subjectElo, subjectBreakpoints subjectPrompts

Class member functions: setSubjectName(), getSubjectName(), setSubjectElo(), 
                        getSubjectElo(), setSubjectBreakpoints(), getSubjectBreakpoints(), 
                        setSubjectPrompts(), getSubjectPrompts()
"""


class Subject(BaseModel):
    subjectName: str
    subjectElo: int = Field(800, ge=0, le=1600, description="ELO rating ranging from 0-1600")
    subjectBreakpoints: List[int] # Elo breakpoints
    subjectPrompts: Dict[int, str] # Prompts for each breakpoint
    currentPrompt: str = ""

    def changeElo(self, amount: int):
        # Send a positive integer to increase, negative integer to decrease.
        self.subjectElo = max(0, min(self.subjectElo + amount, 1600))
        self.updatePrompt()


    def updatePrompt(self):
        # Find highest available breakpoint, and set corresponding prompt
        validBreakpoints = [bp for bp in self.subjectBreakpoints if bp <= self.subjectElo]
        self.current_prompt = self.subjectPrompts.get(max(validBreakpoints, default=0), "")

    
