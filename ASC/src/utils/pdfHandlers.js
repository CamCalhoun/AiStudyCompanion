import jsPDF from 'jspdf'
export function generatePDF(questions, selectedSubject) {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
    })

    const pageWidth = doc.internal.pageSize.width
    const pageHeight = doc.internal.pageSize.height
    const margin = 10
    const centerX = pageWidth / 2
    const sectionWidth = (pageWidth / 2) - (margin * 1.5)

    questions.forEach((q, index) => {
        if (index > 0) doc.addPage()

        // Draw center line for folding
        doc.setDrawColor(0)
        doc.setLineWidth(0.5)
        doc.line(centerX, margin, centerX, pageHeight - margin)

        // Draw left and right section borders
        doc.rect(margin, margin, sectionWidth, pageHeight - 2 * margin)
        doc.rect(centerX + margin / 2, margin, sectionWidth, pageHeight - 2 * margin)

        // Left Side: Question and Answer Choices
        doc.setFontSize(14)
        let yPosition = margin + 10

        const wrappedQuestion = doc.splitTextToSize(q.question, sectionWidth - 10)
        doc.text(`Q${index + 1}:`, margin + 5, yPosition)
        yPosition += 6
        doc.text(wrappedQuestion, margin + 5, yPosition)
        yPosition += wrappedQuestion.length * 6 + 4

        doc.setFontSize(12)
        q.choices.forEach((choice) => {
            const wrappedChoice = doc.splitTextToSize(choice, sectionWidth - 10)
            doc.text(wrappedChoice, margin + 5, yPosition)
            yPosition += wrappedChoice.length * 6
        })

        // Right Side: Correct Answer
        const wrappedAnswer = doc.splitTextToSize(q.answer, sectionWidth - 10)
        doc.setFontSize(14)
        doc.text("Correct Answer:", centerX + margin + 5, margin + 10)
        doc.setFontSize(16)
        doc.text(wrappedAnswer, centerX + margin + 5, margin + 25)
    })

    doc.save(selectedSubject.toLowerCase() + "Flashcards.pdf")
}
