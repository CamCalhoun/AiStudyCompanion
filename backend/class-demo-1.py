from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

#help of making the chatbot class comes from Kie Codes: https://www.youtube.com/watch?v=Xujt_rFf9Us
class Chatbot:
    #Initalize chatbot with OpenAI Client
    def __init__(self, client):
        self.client = client
        #messages between user and bot
        #system role, meant to give the chatbot personality
        self.context = [
            {"role": "system", "content": "You are a silly class clown, be witty and a bit of a jokester"}
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
        print(f'Silly Bot: {response_content}\n')

#client between OpenAI and the program
client = OpenAI()
#our chatbot with access to OpenAI
goofy = Chatbot(client)
#loop variable 
loop = True

print ("Hello! Please talk to silly bot! type q to quit.")

while loop:
    #get user input from command line
    user_message = input("User: ")

    #if message = 'q', terminate the loop
    if user_message.lower() == "q":
        loop = False

    #else, send message to chatbot
    else:
        goofy.chat(user_message)

    

