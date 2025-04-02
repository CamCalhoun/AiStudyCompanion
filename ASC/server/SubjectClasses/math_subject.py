from typing import List, Dict, ClassVar
from subject import Subject

mathHeader = 'Write all expressions using Latex format, beginning and ending with a $. For example: $x^2 \cdot y^{1/3}$\nThe questions and answers must each be a single expression written as previously described.\nOnly provide the expressions and nothing more.\nAll questions must be solvable problems written as expressions.\nFor problems where the user must find the value of a variable, you must say "Solve for: <variable>" where <variable> is the variable to solve for in the equation.\nAdd a new line after stating what variable to solve for.\nThe only variables that may be used are a, b, c, x, y, z.\nThe correct answer must satisfy the given expression.\n'

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
