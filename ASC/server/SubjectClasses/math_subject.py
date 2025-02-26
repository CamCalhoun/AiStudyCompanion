
from typing import List, Dict, ClassVar
from subject import Subject

class Math(Subject):
    subjectName:str = 'Math'
    subjectElo:int = 600
    subjectBreakpoints: ClassVar[List[int]] = [0, 200, 400, 600, 1000, 1400]
    subjectPrompts: ClassVar[Dict[int, str]] = {
        0: 'Very Basic level {topic} problem about {subtopic}',
        200: 'Basic level {topic} problem about {subtopic}',
        400: ' Pre-Intermediate level {topic} problem about {subtopic}',
        600: 'Intermediate level {topic} problem about {subtopic}',
        1000: 'Advanced level {topic} problem about {subtopic}',
        1400: 'Expert level {topic} problem about {subtopic}'
    }
    currentPrompt: str = ""

    # class level attributes

    topic:str = "algebra"

    subtopic:str = "any"

    topicElo: Dict[str, int] = { # With this a user can be an expert in basic math
        "basic math" : 600,      # without also being an expert in every other field of math.
        "pre-algebra": 600,
        "algebra": 600,
        "trigonometry": 600,
        "precalculus": 600,
        "calculus": 600,
        "statistics": 600,
        "linear algebra": 600      
    }

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




    def __init__(self):
        self.updatePrompt()

    def setSubtopic(self, subtopicName):
        for key, value in self.mathTopics.items():
            if subtopicName in value: #if we have a valid subtopic it will set the subtopic correctly and also set the topic.
                self.subtopic = subtopicName
                self.topic = key 
                self.subjectElo = self.topicElo[self.topic]
                self.updatePrompt()
                return
            elif subtopicName == key: #"Subtopic entered was actually a topic. So we set the topic with the given name and subtopic set to default 'any'
                self.topic = key        
                self.subtopic = "any"
                self.subjectElo = self.topicElo[self.topic]
                self.updatePrompt()
                return
        # If the subtopic is not in the values or keys of mathTopics
        raise ValueError("Error: subtopic chosen is not valid.")

    # seTopicElo is designed for changing an Elo that is not the current topic
    def setTopicElo(self, topicName: str, amount: int):
        if topicName in self.topicElo.keys():
            newElo = max(0, min(self.topicElo[topicName] + amount, 1600))
            self.topicElo[topicName] = newElo
        else:
            raise ValueError(f"Invalid topic: {topicName}")

    def getSubtopic(self):
        return self.subtopic

    def getTopic(self):
        return self.topic
               
            
    # ############################################################################################################################# #
    # The following methods are from the Subject class. I am overriding them here because of the various topics associated with mathmatics. #
    # ############################################################################################################################# #
    def updatePrompt(self):
        # Find the highest valid breakpoint that is <= subjectElo
        validBreakpoints = [bp for bp in self.subjectBreakpoints if bp <= self.subjectElo]
        closestBreakpoint = max(validBreakpoints, default=0)

        # Get the corresponding prompt and format it with the topic
        self.currentPrompt = self.subjectPrompts.get(closestBreakpoint, "").format(topic=self.topic, subtopic=self.subtopic)

    def setSubjectElo(self, amount: int): 
        # Send a positive integer to increase, negative integer to decrease.
        newElo = self.subjectElo + amount
        self.topicElo[self.topic] = newElo 
        self.subjectElo = max(0, min(newElo, 1600))
        self.updatePrompt()
        
   

