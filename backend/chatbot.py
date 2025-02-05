#Chatbot Class

from openai import OpenAI
from dotenv import load_dotenv
from subject import Subject
import os

class Chatbot:
    def __init__(self):
        #Client between user and OpenAI
        self.client = OpenAI()
        #Messages to be used for creations
        self.context = [
            {"role":"system", "content": "You will provide a mutliple question and choices to the user and wait for them to respond in the next message. If they choose the correct option, say Correct. If not, say Incorrect, explain why breifly, and then prompt for if the user wants another question."},
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
