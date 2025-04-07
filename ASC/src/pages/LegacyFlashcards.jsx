import { useEffect, useState } from 'react'
import '../styles.css'
import Button from '../components/Button.jsx'
import TopBar from '../components/TopBar.jsx'
import { API_GENERATE_FLASHCARDS } from '../config/api'
import axios from 'axios';
import jsPDF from 'jspdf'
import { useNavigate } from 'react-router-dom'

function LegacyFlashcards() {
    const navigate = useNavigate()
    const [subjects, setSubjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedSubject, setSelectedSubject] = useState("")
    const [newChat, setNewChat] = useState(Boolean)

    // useEffect to load subjects, and listen for subject changes
    useEffect(() => {
        const loadSubjects = () => {
            const storedData = sessionStorage.getItem("importedSubjects")
            setSubjects(storedData ? JSON.parse(storedData) : [])
        }

        loadSubjects()

        const handleUpdate = () => loadSubjects()

        window.addEventListener("subjectsUpdated", handleUpdate)
        return () => window.removeEventListener("subjectsUpdated", handleUpdate)
    }, [])

    // on subject change, set selected subject, and set new chat to true
    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
        setNewChat(true)
    }

    const handleGenerateFlashcards = async (selectedSubject) => {
        if (!selectedSubject) {
            console.error("No subject selected!")
            return
        }

        const currentSubjects = JSON.parse(sessionStorage.getItem("importedSubjects")) || []
        try {
            setLoading(true)
            const payload = {
                subjects: currentSubjects,
                curSubject: selectedSubject,
                newChat: newChat,
            }
            console.log(payload)
            const response = await axios.post(API_GENERATE_FLASHCARDS, payload, {
                headers: { "Content-Type": "application/json" }
            })
            const ai_responses = response.data.ai_response
            console.log(ai_responses)



            const questionRegex = /^Question:\s([\s\S]+?)^(?=[A-D]\))/m;

            const answerChoicesRegex = /([A-D])\)\s(.+)/g
            const correctAnswerRegex = /Answer:\s([A-D])/

            const parsedFlashcards = ai_responses.map(ai_response => {

                const matchQuestion = ai_response.match(questionRegex)
                const matchAnswerChoices = [...ai_response.matchAll(answerChoicesRegex)]
                    .map(m => `${m[1]}) ${m[2].trim()}`)

                const matchCorrectAnswer = ai_response.match(correctAnswerRegex)
                const limitedAnswerChoices = matchAnswerChoices.slice(0, 4)
                return {
                    question: matchQuestion ? matchQuestion[1].trim() : "",
                    choices: limitedAnswerChoices,
                    answer: matchCorrectAnswer ? matchCorrectAnswer[1] : "",
                }
            })
            console.log(parsedFlashcards)
            generatePDF(parsedFlashcards, selectedSubject)
            setLoading(false)

        }
        catch (error) {
            console.error("Error generating question: ", error)
        }
    }

    function generatePDF(questions, selectedSubject) {
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
            doc.setFontSize(14)
            doc.text("Correct Answer:", centerX + margin + 5, margin + 10)
            doc.setFontSize(16)
            doc.text(q.answer, centerX + margin + 5, margin + 25)
        })

        doc.save(selectedSubject.toLowerCase() + "Flashcards.pdf")
    }


    return (
        <>
            {/* Full Page Layout */}
            <div className="grid grid-rows-[auto_1fr] min-h-screen">
                <TopBar title="Legacy Flashcards" />
                <div>
                    <div className='flex justify-between border-3 p-4 border-pwred rounded-xl items-center mb-8 gap-5 h-1/8'>
                        {subjects.length === 0 &&
                            <div className="w-1/3 h-full flex justify-center items-center 
                                        text-shadow text-3xl font-bold text-[#F3F4F6] text-center gap-2">
                                <Button text="Add a subject." onClick={() => navigate("/subjects")} />
                            </div>
                        }

                        {subjects.length !== 0 &&
                            <form className='w-1/3 pl-17'>
                                <label for="subjects" className="block mb-2 text-xl font-semibold text-gray-900"></label>
                                <select id="subjects"
                                    name="subjects"
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-pwblue focus:border-blue-500 block w-full p-2.5'
                                    onChange={handleSubjectChange}>
                                    <option value="" hidden disabled selected>
                                        {subjects.length === 0 ? 'Please add a subject in "Subjects".' : "Subjects"}
                                    </option>
                                    {subjects.map((subject, index) => (
                                        <option key={index} value={subject.subjectName}>
                                            {subject.subjectName}
                                        </option>
                                    ))}
                                </select>
                            </form>

                        }
                        <div className="w-1/3 h-full flex justify-center items-center 
                                        text-shadow text-3xl font-bold text-[#F3F4F6] text-center gap-2">
                            <Button
                                text='Generate'
                                onClick={() => { handleGenerateFlashcards(selectedSubject) }} />
                        </div>

                        <div className="w-1/3 h-full bg-pwblue rounded-xl shadow-xl flex justify-center items-center 
                                        text-shadow text-3xl font-bold text-[#F3F4F6] text-center">
                            {subjects.length === 0 ? (
                                <h1>No subject found</h1>

                            ) : !selectedSubject ? (
                                <h1>No subject selected</h1>
                            ) : (
                                <div className='w-full flex'>
                                    <h1 className="w-1/2">
                                        {selectedSubject}
                                    </h1>
                                    <h1 className="w-1/2">
                                        Elo: {subjects.find(subject => subject.subjectName === selectedSubject)?.subjectElo || ""}
                                    </h1>
                                </div>
                            )}
                        </div>
                    </div>
                    {loading &&
                        <div className='flex flex-col justify-center items-center pt-8'>
                            <h1 className="text-pwblue text-6xl font-semibold py-10">Generating Flashcards</h1>
                            <div className="col-3">
                                <div className="snippet" data-title="dot-flashing">
                                    <div className="stage">
                                        <div className="dot-flashing"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>


            </div>
        </>
    );
}

export default LegacyFlashcards;
