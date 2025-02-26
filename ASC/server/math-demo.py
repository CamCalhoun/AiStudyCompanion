from openai import OpenAI
from dotenv import load_dotenv
from sympy import *

init_printing(use_unicode = True)

load_dotenv()

def makePretty(text):
    return text.replace("**", "^")

client = OpenAI()

context = [{
    "role" : "system",
    "content" : ("You are tasked with producing a single math problem."
                 "You only provide the expression and nothing more."
                 "All expressions must be written using the format accepted by the sympy Python library."
                 )}]

response = client.chat.completions.create(
            model="gpt-4o",
            messages=context
        )

expr = response.choices[0].message.content

print("Expression:", makePretty(expr))

sympy_expr = sympify('0', None, True, False, False, True)

try:
    sympy_expr = sympify(expr, None, True, False, False, True)
except:
    print("Invalid expression.")

try:
    res = sympy_expr.doit()
    simplified = simplify(res)

    print("Result    :", makePretty(res))
    print("Simplified:", makePretty(simplified))
except:
    print("Can't solve")


