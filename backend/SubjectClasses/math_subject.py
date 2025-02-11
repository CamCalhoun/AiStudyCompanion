from subject import Subject
from typing import List, Dict

""" Design Doc
Class name: Math

Class description: The Math class is a derived class of Subjects. 
                   This allows Math to house all methods and attributes defined in Subjects, 
                   as well as override them to fit the needs of this specific subject. 
                   Math will be an instantiable class that can be stored in the users record of tracked subjects.

Class data members: subjectName, subjectElo, subjectBreakpoints subjectPrompts

Class member functions: setSubjectName(), getSubjectName(), setSubjectElo(), 
                        getSubjectElo(), setSubjectBreakpoints(), getSubjectBreakpoints(), 
                        setSubjectPrompts(), getSubjectPrompts()
"""

class Math(Subject):
    # Override subject variables
    subjectName: str = 'Mathematics'
    subjectElo: int = 800
    subjectBreakpoints: List[int] = [0, 800, 1600]
    topic="algebra"
    subtopic="solving equations"

    math_topics: Dict[str,List[str]] = {
        "basic math": ["addition", "subtraction", "multiplication", "division"],
        "pre-algebra": ["fractions", "decimals", "negative numbers", "order of operations"],
        "algebra": ["solving equations", "graphing linear equations", "polynomials", "quadratic equations"],
        "trigonometry": ["sine and cosine", "tangent", "trigonometric identities", "unit circle"],
        "precalculus": ["limits", "sequences and series", "functions", "conic sections"],
        "calculus": ["derivatives", "integrals", "chain rule", "limits"],
        "statistics": ["mean, median, mode", "probability", "standard deviation", "hypothesis testing"],
        "linear algebra": ["vectors", "matrices", "determinants", "eigenvalues and eigenvectors"]
    }

    
    subjectPrompts: Dict[int, str] = {
        0: 'Create a basic math multiple-choice question related to {topic} for elementary level.',
        800: 'Create a math multiple-choice question related to {topic} for high school level. Provide the question and options, and wait for the user to respond. If correct, say "Correct"; otherwise, explain why it is incorrect and ask if they want another question.',
        1600: 'Create an advanced level math multiple-choice question related to {topic} for college level. Provide the question and options, and wait for the user to respond. If correct, say "Correct"; otherwise, explain why it is incorrect and ask if they want another question.'
    }

        
    def get_possible_subtopics(self, topic):
        if topic in self.math_topics.keys():
            possible_subtopics = self.math_topics.values(topic)
            return possible_subtopics
        else:
            print("topic not found")
    
    def set_subtopic(self, subtopic):
        if subtopic in self.math_topics.values():
           self.subtopic=subtopic
        else:
            print("subtopic not found")
            
    #example current 
    def set_current_prompt(self):
        self.current_prompt : str = self.subjectPrompts[self.subjectElo, self.subtopic]

    def get_current_prompt(self):
        return self.current_prompt
    

