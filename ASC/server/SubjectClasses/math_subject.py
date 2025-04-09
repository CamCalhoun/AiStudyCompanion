from typing import List, Dict, ClassVar
from subject import Subject


class Math(Subject):
    #override subject variables
    subjectName : str = 'Math'
    subjectElo : int = 800
    subjectBreakpoints : List[int] = [400, 800, 1000]
    subjectPrompts : Dict[int, str] = {
        400: 'Easy algebra questions',
        800: 'Harder Algebra questions',
        1000: 'Advanced Algebra questions'
    }
    currentPrompt : str = subjectPrompts[800]
