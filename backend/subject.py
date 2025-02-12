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

    def setSubjectElo(self, amount: int):
        # Send a positive integer to increase, negative integer to decrease.
        self.subjectElo = max(0, min(self.subjectElo + amount, 1600))
        self.updatePrompt()

    def getSubjectElo(self):
        return self.subjectElo


    def setSubjectName(self, name: str):
        if not name:
            raise ValueError("Name cannot be empty")
        self.subjectName = name

    def getSubjectName(self):
        return self.subjectName


    def setSubjectBreakpoints(self, breakpoints: List[int]):
        # Length of breakpoints must be > 0
        if not breakpoints: 
            # All breakpoints must be in the bounds of 0 and 1600 inclusive
            for breakpoint in breakpoints:
                if not (0 <= breakpoint <= 1600):
                    raise ValueError("Breakpoints must be between 0 and 1600 inclusive")
            self.subjectBreakpoints = breakpoints
        else:
            raise ValueError("Length of breakpoints cannot be zero")

    def getSubjectBreakpoints(self):
        return self.subjectBreakpoints


    def setSubjectPrompts(self, prompts: Dict[int, str]):
        for breakpoint, prompt in prompts.items():
            # All breakpoints must be in the bounds of 0 and 1600 inclusive
            if not (0 <= breakpoint <= 1600):
                raise ValueError("Breakpoints must be between 0 and 1600 inclusive")
            # All prompts must not be empty
            if not prompt:
                raise ValueError("Prompts cannot be empty")
        self.subjectPrompts = prompts

    def getSubjectPrompts(self):
        return self.subjectPrompts


    def updatePrompt(self):
        # Find highest available breakpoint, and set corresponding prompt
        validBreakpoints = [bp for bp in self.subjectBreakpoints if bp <= self.subjectElo]
        self.currentPrompt = self.subjectPrompts.get(max(validBreakpoints, default=0), "")




