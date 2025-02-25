from subject import Subject
from typing import List, Dict

""" Design Doc
Class name: English

Class description: The English class is a derived class of Subjects.  
                   This allows English to house all methods and attributes defined in Subjects, 
                   as well as override them to fit the needs of this specific subject. 
                   English will be an instantiable class that can be stored in the users record of tracked subjects.

Class data members: subjectName, subjectElo, subjectBreakpoints subjectPrompts

Class member functions: setSubjectName(), getSubjectName(), setSubjectElo(), 
                        getSubjectElo(), setSubjectBreakpoints(), getSubjectBreakpoints(), 
                        setSubjectPrompts(), getSubjectPrompts()
"""


class English(Subject):
    #override subject variables
    subjectName : str = 'English'
    subjectElo : int = 800
    subjectBreakpoints: List[int] = [0, 800, 1600]
    subjectPrompts: Dict[int, str] = {
        0: 'Elementary level English',
        800: 'Highschool level English',
        1600: 'College level English'
    }
    currentPrompt : str = subjectPrompts[800]
    
