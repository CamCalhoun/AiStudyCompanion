from subject import Subject
from typing import List, Dict

""" Design Doc
Class name: Computer Science

Class description: The Computer Science class is a derived class of Subjects.  
                   This allows Computer Science to house all methods and attributes defined in Subjects, 
                   as well as override them to fit the needs of this specific subject. 
                   Computer Science will be an instantiable class that can be stored in the users record of tracked subjects.

Class data members: subjectName, subjectElo, subjectBreakpoints subjectPrompts

Class member functions: setSubjectName(), getSubjectName(), setSubjectElo(), 
                        getSubjectElo(), setSubjectBreakpoints(), getSubjectBreakpoints(), 
                        setSubjectPrompts(), getSubjectPrompts()
"""


class ComputerScience(Subject):
    #override subject variables
    subjectName : str = 'Computer Science'
    subjectElo : int = 800
    subjectBreakpoints: List[int] = [0, 800, 1600]
    subjectPrompts: Dict[int, str] = {
        0: 'Middle school level Computer Science',
        800: 'Highschool level Computer Science',
        1600: 'College level Computer Science'
    }
    currentPrompt : str = subjectPrompts[800]
    
