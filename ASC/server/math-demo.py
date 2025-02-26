from openai import OpenAI
from dotenv import load_dotenv
from sympy import *

init_printing(use_unicode = True)

def makePretty(text):
    return str(text).replace("**", "^")

load_dotenv()

client = OpenAI()

context = [{
    "role" : "system",
    "content" : ("You are tasked with producing a simple, solveable math problem."
                 "Problems include algebra."
                 "Only provide the expression and nothing more."
                 "All expressions must be written using the format accepted by the sympy Python library."
                 "The simplified and unsimplified answers to the expression cannot match the problem."
                 "Do not write anything in quotes."
                 "Do not produce any code."
                 "Do not repeat problems."
                 "Variables may only be used when the value of the variable is not required."
                 "Variables must be lowercase."
                 "You may only use the variables a, b, c, x, y, z."
                 )}]

response = client.chat.completions.create(
            model="gpt-4o",
            messages=context
        )

retry_request = context
retry_request[0]["content"] += ("Create a new expression.")

var('a, b, c, x, y, z')
run = True

while run:
    expr = response.choices[0].message.content

    print("Expression:", makePretty(expr))

    sympy_expr = sympify('0', None, True, False, False, True)

    try:
        sympy_expr = sympify(expr, None, True, False, False, True)
    except:
        print("Invalid expression.")

        response = client.chat.completions.create(
                model="gpt-4o",
                messages=retry_request
            )
        continue

    try:
        res = sympy_expr.doit()

        simplified = simplify(res)

        print("Result    :", makePretty(res))

        if res != simplified:
            print("Simplified:", makePretty(simplified))
        else:
            print("Simplified: Can't simplify any further.")
    except:
        print("Can't solve")

        response = client.chat.completions.create(
                model="gpt-4o",
                messages=retry_request
            )
        continue

    run = False

