from subject import Subject
from typing import List, Dict


class Geography(Subject):
    #override subject variables
    subjectName : str = 'Geography'
    subjectElo : int = 800
    subjectBreakpoints: List[int] = [400, 600, 800, 1200]
    subjectPrompts: Dict[int, str] = {
        400: 'Elementary level Geography',
        600: 'Middle school level Geography',
        800: 'High school level Geography',
        1200: 'College level Geography'
    }
    currentPrompt : str = subjectPrompts[800]
    
