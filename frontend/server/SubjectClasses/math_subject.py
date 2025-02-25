
from typing import List, Dict, ClassVar
from subject import Subject

class Math(Subject):
    # Override subject variables
    subjectName: str = 'Math'
    subjectElo: int = 600
    topic: str = "algebra"
    subtopic: str = "any"

    # Class level attributes
    subjectBreakpoints: ClassVar[List[int]] = [0, 200, 400, 600, 1000, 1400]
    mathTopics: ClassVar[Dict[str, List[str]]] = {
        "basic math": ["any","addition", "subtraction", "multiplication", "division"],
        "pre-algebra": ["any","fractions", "decimals", "negative numbers", "order of operations"],
        "algebra": ["any","solving equations", "graphing linear equations", "polynomials", "quadratic equations"],
        "trigonometry": ["any","sine and cosine", "tangent", "trigonometric identities", "unit circle"],
        "precalculus": ["any","limits", "sequences and series", "functions", "conic sections"],
        "calculus": ["any","derivatives", "integrals", "chain rule", "limits"],
        "statistics": ["any","mean, median, mode", "probability", "standard deviation", "hypothesis testing"],
        "linear algebra": ["any","vectors", "matrices", "determinants", "eigenvalues and eigenvectors"]
    }
    subjectPrompts: ClassVar[Dict[int, str]] = {
        0: 'Very Basic level {topic} problem about {subtopic}',
        200: 'Basic level {topic} problem about {subtopic}',
        400: ' Pre-Intermediate level {topic} problem about {subtopic}',
        600: 'Intermediate level {topic} problem about {subtopic}',
        1000: 'Advanced level {topic} problem about{subtopic}',
        1400: 'Expert level {topic} problem about {subtopic}'
    }

    # Instance level initialization
    currentPrompt: str = ""

    def __init__(self):
        # Pydantic will handle the fields, so we don't need to set them in __init__ for validation
        super().__init__()  # Call Pydantic's init if you want to use its functionality
        
        # Call the method to update the prompt
        self.updatePrompt()

    def updatePrompt(self):
        # Find the highest valid breakpoint that is <= subjectElo
        validBreakpoints = [bp for bp in self.subjectBreakpoints if bp <= self.subjectElo]
        closestBreakpoint = max(validBreakpoints, default=0)

        # Get the corresponding prompt and format it with the topic
        self.currentPrompt = self.subjectPrompts.get(closestBreakpoint, "").format(topic=self.topic)

    def setSubtopic(self, subtopicName):
        for key, value in self.mathTopics.items():
            if subtopicName == value: #if we have a valid subtopic
                self.subtopic=value
                self.topic=key 
                return
            elif subtopicName == key: #"Subtopic entered was actually a topic. So we set the topic with the given name and subtopic set to default 'any'
                self.topic=key
                self.subtopic="any"
                return
        # If the subtopic is not in the values or keys of mathTopics
        print("Error: subtopic chosen is not valid.")

        

                
            
