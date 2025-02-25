from subject import Subject
from typing import List, Dict

""" Design Doc
Class name: Geography

Class description: The Geography class is a derived class of Subjects.  
                   This allows Geography to house all methods and attributes defined in Subjects, 
                   as well as override them to fit the needs of this specific subject. 
                   Geography will be an instantiable class that can be stored in the users record of tracked subjects.

Class data members: subjectName, subjectElo, subjectBreakpoints subjectPrompts

Class member functions: setSubjectName(), getSubjectName(), setSubjectElo(), 
                        getSubjectElo(), setSubjectBreakpoints(), getSubjectBreakpoints(), 
                        setSubjectPrompts(), getSubjectPrompts()
"""


class Geography(Subject):
    #override subject variables
    subjectName : str = 'Geography'
    subjectElo : int = 800
    subjectBreakpoints: List[int] = [0, 800, 1600]
    subjectPrompts: Dict[int, str] = {
        0: 'Elementary level Geography',
        800: 'Highschool level Geography',
        1600: 'College level Geography'
    }
    currentPrompt : str = subjectPrompts[800]
    
