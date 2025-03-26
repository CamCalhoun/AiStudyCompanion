from typing import List, Dict, ClassVar
from subject import Subject

mathHeader = 'Write all expressions using Latex format, beginning and ending with a $'

class Math(Subject):
    #override subject variables
    subjectName : str = 'Math'
    subjectElo : int = 800
    subjectBreakpoints : List[int] = [0, 800, 1600]
    subjectPrompts : Dict[int, str] = {
        0: mathHeader + 'Elementary level Math',
        800: mathHeader + 'Highschool level Math',
        1600: mathHeader + 'College level Math'
    }
    currentPrompt : str = subjectPrompts[800]
