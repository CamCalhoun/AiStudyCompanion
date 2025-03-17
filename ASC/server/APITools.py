
from openai import OpenAI
from dotenv import load_dotenv
import re

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
        # Client between user and OpenAI
        self.client = OpenAI()
        # Messages to be used for creations
        self.context = [
            {"role": "system", "content": (
                "You are an educational assistant that provides multiple-choice questions "
                "to help users learn different subjects. Each question should have exactly four "
                "answer choices labeled A, B, C, and D. Exactly one of these choices can be the correct answer. "
                "One choice MUST be the correct answer, and the other three MUST be incorrect."
                "NONE is not a valid answer. "
                "You must indicate the correct answer clearly "
                "and provide an explanation for why the answer is correct."
                "For this explanation, please surround the entire explanation in {}."
                "A format for your response will be described. Do not respond with anything other than the exact format."
                "The format of your response must be as follows:\n"
                "Question: <Insert question here>\n"
                "A) <Option A>\n"
                "B) <Option B>\n"
                "C) <Option C>\n"
                "D) <Option D>\n"
                "Answer: <Correct answer letter>\n"
                "Explanation: {<Detailed explanation of why the correct answer is correct and why the others are not>}"
            )},
        ]
    
    # Send and receive messages to and from OpenAI
    def generateQuestion(self, message: str):
        self.context.append({"role": "user", "content": message})

        # Send the outgoing message, set model, store on OpenAI, and send messages in context
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=self.context
        )
        # Store response
        response_content = response.choices[0].message.content
        
        # Commented out statement for testing raw output
        # print(f"\nRaw Response Content:\n{response_content}")
        #
        # # Extract the correct answer using regex
        # match = re.search(r'Answer:\s*([A-D])', response_content)
        # correct_answer = match.group(1) if match else None
        #
        # # Remove the answer line for the displayed question
        # displayed_question = re.sub(r'\nAnswer:.*', '', response_content)
        # displayed_question = re.sub(r'\nExplanation:.*', '', displayed_question)
        #
        # print(f"\nOpenAI Response:\n{displayed_question}")
        #
        # # Extract the answer choices using regex
        # choices = re.findall(r'([A-D])\)\s(.+)', displayed_question)
        #
        # # Prompt the user for their answer
        # user_answer = self.get_user_answer(choices)
        #
        # # Extract the explanation in case the user answers wrong, and remove it from the displayed question.
        # explanation_match = re.search(r'Explanation:\s*{\s*(.*?)\s*}', response_content, re.DOTALL)
        # explanation = explanation_match.group(1).strip() if explanation_match else "No explanation provided."
        #
        # # Check if the answer is correct
        # if user_answer == correct_answer:
        #     print("Correct!")
        # else:
        #     print(f"Incorrect! The correct answer was {correct_answer}")
        #     print(f"Explanation: {explanation}")
        #
        # Append response to the context

        self.context.append({"role": "assistant", "content": response_content})

        return response_content

    def get_user_answer(self, choices):
        valid_responses = {"A", "B", "C", "D"}
        while True:
            print("\nPlease select an answer:")
            user_answer = input("A/B/C/D").strip().upper()

            if user_answer in valid_responses:
                return user_answer
            else:
                print("Invalid choice. Please choose A, B, C, or D.")
