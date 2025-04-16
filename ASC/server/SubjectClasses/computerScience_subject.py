from subject import Subject
from typing import List, Dict

#@file computerScience_subject.py
#@brief This is the subject that manages everything for Computer Science.

class ComputerScience(Subject):
    #override subject variables
    subjectName : str = 'Computer Science'
    subjectElo : int = 800
    subjectBreakpoints: List[int] = [400, 600, 800, 1000, 1200]
    subjectPrompts: Dict[int, str] = {
        400: 'Basic computer literacy',
        600: 'High school level Computer Science and problem solving',
        800: 'Computer Science subjects. Namely: Intro Programming, Object Oriented Programming, System Design.',
        1000: 'Advanced Computer Science Subjects. Namely: Data Structures, Analysis of Algorithms, Computer Networking, programming paradigms, programming methodologies.',
        1200: 'Advanced Computer Science Subjects. Namely: Low level concepts, computer architecture, language theory, dynamic programming, distributed systems, artificial intelligence, scalable systems, language translation.',
    }
    currentPrompt : str = subjectPrompts[800]
    
