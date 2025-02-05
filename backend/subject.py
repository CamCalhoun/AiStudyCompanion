from pydantic import BaseModel, Field
from typing import List, Dict

class Subject(BaseModel):
    subjectName: str
    subjectElo: int = Field(800, ge=0, le=1600, description="ELO rating ranging from 0-1600")
    subjectBreakpoints: List[int] # Elo breakpoints
    subjectPrompts: Dict[int, str] # Prompts for each breakpoint
    current_prompt: str = ""

