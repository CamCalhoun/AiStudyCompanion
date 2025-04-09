from sympy import *
import re

def findExpressions(text):
    # Find all expressions in the given text, excluding the surrounding $ pair
    return re.findall(r'\$(.*?)\$', text)

def findTargetVariable(text):
    v = re.findall(r'Solve for: \$([a-z])\$', text)

    if not v:
        return None
    
    return v[0]

def solve(text, solve_for = None):
    print(text)
    print(solve_for)
    a,b,c,x,y,z = symbols('a b c x y z')
    expr = sympify(text, solve_for, True, False, False, True)

    res = expr.doit()

    return simplify(res)

