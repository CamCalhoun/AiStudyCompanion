from openai import OpenAI
from dotenv import load_dotenv
from subject import Subject
import os

""" Design Doc

Class name: APITools

Class description: APITools is a utility class defined to house all utility functions for interacting with an LLM through various APIs. 
                   This will allow for clean reusable code, improve the readability of the program, and significantly help the writability of ASC.

Class data members: N/A

Class member functions: generateQuestion(), generateFlashcards(), solveMathEquation()
"""

load_dotenv()
class Chatbot:
    def __init__(self):
        #Client between user and OpenAI
        self.client = OpenAI()
        #Messages to be used for creations
        self.context = [
            {"role":"system", "content":(                 
                "You are an educational assistant that provides multiple-choice questions "
                "to help users learn different subjects. Each question should have exactly four "
                "answer choices labeled A, B, C, and D, and you must indicate the correct answer clearly. "
                "After the user responds, check their answer and provide feedback. If they are incorrect, "
                "explain why and then ask if they would like another question."
            )},
        ]
    
    #send and recieve messages to and from OpenAI
    def chat(self, message:str):
        #Append outgoing message to context
        self.context.append(
            {"role":"user","content":message}
        )
        #send the outgoing message, set model, store on OpenAI, and send messages stored in context
        response = self.client.chat.completions.create(
            model = "gpt-4o",
            store = True,
            messages = self.context,
        )
        
        #Responses are appened back on to give context for the AI to under it has send the message perviously
        response_content = response.choices[0].message.content
        self.context.append(
            {"role": "assistant","content": response_content}
        )
        #print chatbot response
        print(f'Open AI: {response_content}\n')
        
