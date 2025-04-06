import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../styles.css'
import Button from '../components/Button.jsx'
import TopBar from '../components/TopBar.jsx'
import axios from 'axios';
import { API_GENERATE_QUESTION } from '../config/api';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import "katex/dist/katex.min.css"
import latex2js from 'latex-to-js/dist';
import nerdamer from 'nerdamer/all';
import 'nerdamer/Algebra';
import 'nerdamer/Solve';
import 'nerdamer/Calculus';
import { convertToLatex } from '../utils/convertLatex';

const markdown = `
$$
\\int_0^1 x^2 \\,dx = \\frac{1}{3}
$$
`
function Study() {
    const navigate = useNavigate()

    const answerToNumKey = { "A": 0, "B": 1, "C": 2, "D": 3 }
    const [question, setQuestion] = useState("")
    const [answerChoices, setAnswerChoices] = useState([])
    const [answerSelection, setAnswerSelection] = useState("")
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [explanation, setExplanation] = useState("")
    const [subjectsRight, setSubjectsRight] = useState([])
    const [subjectsWrong, setSubjectsWrong] = useState([])
    const [answerStatus, setAnswerStatus] = useState("")
    const [delta, setDelta] = useState(1)


    const [selectedSubject, setSelectedSubject] = useState("")
    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
        setAnswerSelection("")
        setQuestion("")
        setAnswerChoices([])
        setCorrectAnswer("")
        setExplanation("")
        setSubjectsRight([])
        setSubjectsWrong([])
        handleNewChatState(true)
    };

    const [newChat, setNewChat] = useState(Boolean)
    const handleNewChatState = (set) => {
        setNewChat(set)
    }

    const [loading, setLoading] = useState(false)

    const [subjects, setSubjects] = useState([])

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

    useEffect(() => {
        if (answerSelection != "") {
            if (answerSelection == correctAnswer) {
                sessionStorage.setItem("importedSubjects", JSON.stringify(subjectsRight))
                setAnswerStatus("Correct")
            } else {
                sessionStorage.setItem("importedSubjects", JSON.stringify(subjectsWrong))
                setAnswerStatus("Incorrect")
            }
            window.dispatchEvent(new Event("subjectsUpdated"))
        }
    }, [answerSelection])

    const handleGenerateQuestion = async (selectedSubject) => {
        if (!selectedSubject) {
            console.error("No subject selected!")
            return
        }

        if (answerSelection != "") {
            setAnswerStatus("")
        }

        setAnswerSelection("")
        setQuestion("")
        setAnswerChoices([])
        setCorrectAnswer("")
        setExplanation("")
        setSubjectsRight([])
        setSubjectsWrong([])

        const currentSubjects = JSON.parse(sessionStorage.getItem("importedSubjects")) || []
        try {
            setLoading(true)
            const payload = {
                subjects: currentSubjects,
                curSubject: selectedSubject,
                newChat: newChat,
                delta: delta,
                answerStatus: answerStatus

            }
            console.log(payload)
            const response = await axios.post(API_GENERATE_QUESTION, payload, {
                headers: { "Content-Type": "application/json" }
            })

            let question = ""
            let answerChoices = []
            let correctAnswer = ""
            let explanation = ""

            console.log("Raw data: ", response.data.ai_response)
            const ai_response = response.data.ai_response





            const questionRegex = /^Question:\s([\s\S]+?)^(?=[A-D]\))/m;

            const answerChoicesRegex = /([A-D])\)\s(.+)/g

            const correctAnswerRegex = /Answer:\s([A-D])/
            const explanationRegex = /Explanation:\s\{(.*?)\}/s

            const matchQuestion = ai_response.match(questionRegex)
            const matchAnswerChoices = [...ai_response.matchAll(answerChoicesRegex)]
            const matchCorrectAnswer = ai_response.match(correctAnswerRegex)
            const matchExplanation = ai_response.match(explanationRegex)

            if (matchQuestion) {
                question = matchQuestion[1].trim();
            }

            if (matchAnswerChoices) {
                answerChoices = matchAnswerChoices.map(match => match[0].trim())
            }

            if (matchCorrectAnswer) {
                correctAnswer = matchCorrectAnswer[1]
            }

            if (matchExplanation) {
                explanation = matchExplanation[1].trim()
            }

            console.log("Question: ", question)
            console.log("Answer Choices:", answerChoices)
            console.log("Correct Answer:", correctAnswer)
            console.log("Explanation:", explanation)
            console.log("Delta: ", response.data.delta)

            if (selectedSubject == "Math") {

                const qregex = /Solve for \$\$(\w+)\$\$\s*\$\$([^\n]+)\$\$/
                const match = question.match(qregex)
                const varToSolveFor = match[1]
                const expression = match[2]
                console.log("Var: ", varToSolveFor)
                console.log("Expression: ", expression)



                const acregex = /([A-D])\)\s*\${1,2}(\w+)\s*=\s*([-\w\\{}\/^+\d]+)\${1,2}/
                const answers = []

                for (let i = 0; i < answerChoices.length; i++) {
                    const match = answerChoices[i].match(acregex)
                    if (match) {
                        const letter = match[1]
                        let value = match[3]

                        // Optional LaTeX cleanup
                        value = value.replace(/\\frac{(\d+)}{(\d+)}/, "$1/$2")
                        answers.push({ letter, value })
                    }
                }

                console.log("Answers: ", answers)
                const jsExpression = latex2js(expression).toString()
                console.log("JS Expr: ", jsExpression)

                let solution
                try {
                    const jssolution = nerdamer.solveEquations(jsExpression, varToSolveFor).toString()
                    console.log("JS Solution: ", jssolution)

                    solution = convertToLatex(jssolution)
                    console.log("Solution: ", solution)
                } catch {
                    solution = "No solution"
                }
                let validAnswerFound = false
                for (let i = 0; i < answers.length; i++) {
                    // If the valid answer is found
                    if (answers[i].value === solution) {
                        validAnswerFound = true

                        // If the correctAnswer matches, change nothing
                        if (answers[i].letter === correctAnswer) {
                            console.log('Correct answer alr set, no change needed')
                            break
                        }

                        // If correctAnswer doesnt match, swap values
                        if (answers[i].letter !== correctAnswer) {
                            console.log('Correct answer found but in the wrong spot')
                            correctAnswer = answers[i].letter
                        }
                    }
                }

                if (!validAnswerFound) {
                    // Find the answer corresponding to the correctAnswer letter and update its value
                    console.log('Correct answer not found, replacing correct answers value')
                    for (let i = 0; i < answers.length; i++) {
                        if (answers[i].letter === correctAnswer) {
                            answers[i].value = solution;  // Update the value to the solution
                            answerChoices[i] = `${correctAnswer}) $$${varToSolveFor} = ${solution}$$`
                            break;
                        }
                    }
                }
                console.log(correctAnswer)
            }

            handleNewChatState(false)

            setDelta(response.data.delta)
            setQuestion(question)
            setAnswerChoices(answerChoices)
            setCorrectAnswer(correctAnswer)
            setExplanation(explanation)
            setSubjectsRight(response.data.subjects_right)
            setSubjectsWrong(response.data.subjects_wrong)
            setLoading(false)
        }
        catch (error) {
            console.error("Error generating question:", error)
        }


    }

    const handleSaveAsFlashcard = async (question, answerChoices, correctAnswer, selectedSubject) => {
        console.log(question)
        console.log(answerChoices[answerToNumKey[correctAnswer]])
        let answer = answerChoices[answerToNumKey[correctAnswer]]

        let choices = answerChoices.slice(0, 4)

        try {
            const flashcardsData = sessionStorage.getItem("flashcards")
            let flashcards = flashcardsData ? JSON.parse(flashcardsData) : {}

            if (!flashcards[selectedSubject]) {
                flashcards[selectedSubject] = []
            }

            const exists = flashcards[selectedSubject].some(flashcard => flashcard.question === question)
            if (exists) {
                alert("Flashcard already exists!")
                return
            }

            const newFlashcard = { question, choices, answer }

            flashcards[selectedSubject].push(newFlashcard)

            sessionStorage.setItem("flashcards", JSON.stringify(flashcards))

            console.log("Flashcard added")
            alert("Flashcard added")
        } catch (error) {
            console.error("ERROR adding flashcard: ", error)
            alert("Failed to add flashcard.")
        }
    }
    return (
        <>
            {/* Full Page Layout */}
            <div className="grid grid-rows-[auto_1fr] min-h-screen">
                <TopBar title="Study" />
                <div className="flex flex-col p-4 ">

                    {/* Header */}
                    <div className='flex justify-between border-3 p-4 border-pwred rounded-xl items-center mb-8 gap-5'>
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
                                onClick={() => { handleGenerateQuestion(selectedSubject) }} />
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
                            <h1 className="text-pwblue text-6xl font-semibold py-10">Generating question</h1>
                            <div className="col-3">
                                <div className="snippet" data-title="dot-flashing">
                                    <div className="stage">
                                        <div className="dot-flashing"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {/* Question */}
                    {question && !answerSelection &&
                        <div className="flex justify-center items-center m-auto">
                            <div className="w-full h-full p-5 border-3 border-pwred bg-pwblue rounded-xl shadow-xl flex items-center justify-center gap-8 ">
                                <div className="text-shadow text-4xl font-bold text-[#F3F4F6]  w-1/2 text-center">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkMath]}
                                        rehypePlugins={[rehypeKatex]}
                                    >
                                        {question}
                                    </ReactMarkdown>
                                </div>
                                <div className="text-shadow text-2xl font-bold text-[#F3F4F6] w-1/2 text-left">
                                    <div className="py-1">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkMath]}
                                            rehypePlugins={[rehypeKatex]}
                                        >
                                            {answerChoices[0]}
                                        </ReactMarkdown>
                                    </div>
                                    <div className="py-1">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkMath]}
                                            rehypePlugins={[rehypeKatex]}
                                        >
                                            {answerChoices[1]}
                                        </ReactMarkdown>
                                    </div>
                                    <div className="py-1">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkMath]}
                                            rehypePlugins={[rehypeKatex]}
                                        >
                                            {answerChoices[2]}
                                        </ReactMarkdown>
                                    </div>
                                    <div className="py-1">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkMath]}
                                            rehypePlugins={[rehypeKatex]}
                                        >
                                            {answerChoices[3]}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            </div>

                        </div>}

                    {/* Answer choices */}
                    {answerChoices.length !== 0 && !answerSelection &&
                        <div className='border-3 border-pwred rounded-xl p-12 grid grid-cols-2 gap-20 w-3/5 m-auto'>
                            <div className="flex flex-col gap-10">
                                <Button text="A" onClick={() => setAnswerSelection("A")} />
                                <Button text="C" onClick={() => setAnswerSelection("C")} />
                            </div>
                            <div className="flex flex-col gap-10">
                                <Button text="B" onClick={() => setAnswerSelection("B")} />
                                <Button text="D" onClick={() => setAnswerSelection("D")} />
                            </div>
                        </div>
                    }

                    {answerSelection && explanation &&
                        <div className="flex flex-col justify-center items-center gap-12 p-12">
                            <div className="w-full h-full p-5 border-3 border-pwred bg-pwblue rounded-xl shadow-xl flex flex-col items-center justify-center gap-8 ">
                                <h1 className="text-shadow text-4xl font-bold text-[#F3F4F6] text-center">{answerSelection == correctAnswer ? 'Correct!' : 'Incorrect.'}</h1>
                                {selectedSubject != "Math" &&
                                    <h1 className="text-shadow text-2xl font-bold text-[#F3F4F6] text-center">{explanation}</h1>
                                }
                                {console.log(selectedSubject)}
                            </div>
                            <div className='w-1/3 h-20'>
                                <Button text="Save question as Flashcard"
                                    onClick={() => handleSaveAsFlashcard(question, answerChoices, correctAnswer, selectedSubject)} />
                            </div>
                        </div>

                    }



                </div>
            </div>
        </>
    );
}

export default Study;
