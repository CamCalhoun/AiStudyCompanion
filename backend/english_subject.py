#English Subclass of Subject

from subject import Subject
from typing import List, Dict


class English(Subject):
    #override subject variables
    subjectName : str = 'English'
    subjectElo : int = 800
    subjectBreakpoints: List[int] = [0, 800, 1600]
    subjectPrompts: Dict[int, str] = {
        0: 'Create a multiple choice question for someone who is at elemetary school level of intelligence pretaining to english.',
        800: 'Create a multiple choice question for someone who is at highschool school level of intelligence pretaining to english. You will provide the question and choices to the user and wait for them to respond in the next message. If they choose the correct option, say Correct. If not, say Incorrect explain why and then prompt for if the user wants another question.',
        1600: 'Create a multiple choice question for someone who is at college school level of intelligence pretaining to english. You will provide the question and choices to the user and wait for them to respond in the next message. If they choose the correct option, say Correct. If not, say Incorrect explain why and then prompt for if the user wants another question.'
    }
    current_prompt : str = subjectPrompts[800]
    
