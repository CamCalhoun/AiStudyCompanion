from subject import Subject
from typing import List, Dict


class History(Subject):
    #override subject variables
    subjectName : str = 'History'
    subjectElo : int = 800
    subjectBreakpoints: List[int] = [400, 600, 800, 1000]
    subjectPrompts: Dict[int, str] = {
        400: 'Elementary level History',
        600: 'Middle school level History',
        800: 'High school level History',
        1000: 'College level History'
    }
    currentPrompt : str = subjectPrompts[800]
    
