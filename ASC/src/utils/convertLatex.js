
export function convertToLatex(solution) {
    let latex = solution
        .replace(/i/g, '\\i') // Handle imaginary unit 'i'
        .replace(/sqrt/g, '\\sqrt') // Ensure 'sqrt' is properly formatted
        .replace(/(\d)([a-zA-Z])/g, '$1 $2') // Ensure proper space between numbers and variables
        .replace(/(\d)(\+)/g, '$1 +') // Ensure proper formatting for the plus sign
        .replace(/(\d)(\-)/g, '$1 -') // Ensure proper formatting for the minus sign
        .replace(/\*/g, '') // Optional: remove multiplication signs if desired

    // Convert the real and imaginary parts to LaTeX
    return latex
}
