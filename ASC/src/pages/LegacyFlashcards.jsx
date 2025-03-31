import { useEffect, useState } from 'react'
import '../styles.css'
import Button from '../components/Button.jsx'
import TopBar from '../components/TopBar.jsx'
import SubjectList from '../components/SubjectList.jsx'
import { API_GENERATE_FLASHCARDS } from '../config/api'
import axios from 'axios';


function LegacyFlashcards() {
    const [subjects, setSubjects] = useState([])
    const [loading, setLoading] = useState(false)

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

    const [selectedSubject, setSelectedSubject] = useState("")

    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
        handleNewChatState(true)
    }

    const [newChat, setNewChat] = useState(Boolean)

    const handleNewChatState = (set) => {
        setNewChat(set)
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

            const questionRegex = /^Question:\s(.+)/m
            const answerChoicesRegex = /([A-D])\)\s(.+)/g
            const correctAnswerRegex = /Answer:\s([A-D])/

            const parsedFlashcards = ai_responses.map(ai_response => {
                const matchQuestion = ai_response.match(questionRegex)
                const matchAnswerChoices = [...ai_response.matchAll(answerChoicesRegex)]
                const matchCorrectAnswer = ai_response.match(correctAnswerRegex)

                return {
                    question: matchQuestion ? matchQuestion[1].trim() : "",
                    answerChoices: matchAnswerChoices ? matchAnswerChoices.map(match => match[0].trim()) : [],
                    correctAnswer: matchCorrectAnswer ? matchCorrectAnswer[1] : "",
                }
            })
            console.log(parsedFlashcards)
            setLoading(false)
        }
        catch (error) {
            console.error("Error generating question: ", error)
        }
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
                </div>


            </div>
        </>
    );
}

export default LegacyFlashcards;
