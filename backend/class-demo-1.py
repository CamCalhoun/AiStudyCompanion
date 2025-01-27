from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

#help of making the chatbot class comes from Kie Codes: https://www.youtube.com/watch?v=Xujt_rFf9Us
class Chatbot:
    def __init__(self, client):
        self.client = client
        self.context = [
            {"role": "system", "content": "You are a silly class clown, be witty and a bit of a jokester"}
    ]   

    def chat(self, message:str):
        self.context.append(
            {"role":"user","content":message}
        )
        response = self.client.chat.completions.create(
            model = "gpt-4o",
            store = True,
            messages = self.context,
        )
        
        response_content = response.choices[0].message.content
        self.context.append(
            {"role": "assistant","content": response_content}
        )
        print(f'Silly Bot: {response.choices[0].message.content}')

client = OpenAI()
goofy = Chatbot(client)
loop = True

print ("Hello! Please talk to silly bot! type q to quit." ,flush=True)
loop = True
while loop:
    user_message = input("User: ")
    if user_message.lower() == "q":
        loop = False
    else:
        goofy.chat(user_message)

    

