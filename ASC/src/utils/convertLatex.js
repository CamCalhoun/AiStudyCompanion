export function convertToLatex(input) {
    let latex = input;

    latex = latex.replace(/\b(-?\d+)\s*\/\s*(-?\d+)\b/g, '\\frac{$1}{$2}')

    latex = latex
        .replace(/i/g, '\\i')
        .replace(/sqrt/g, '\\sqrt')
        .replace(/(\d)([a-zA-Z])/g, '$1 $2')
        .replace(/(\d)([+\-])/g, '$1 $2')
        .replace(/\*/g, '')

    return latex;
}




