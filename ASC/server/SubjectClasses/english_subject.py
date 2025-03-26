from subject import Subject
from typing import List, Dict


class English(Subject):
    #override subject variables
    subjectName : str = 'English'
    subjectElo : int = 800
    subjectBreakpoints: List[int] = [400, 600, 800, 1000]
    subjectPrompts: Dict[int, str] = {
        400: 'Elementary level English',
        600: 'Middle School level English',
        800: 'High school level English',
        1200: 'College level English'
    }
    currentPrompt : str = subjectPrompts[800]
    
