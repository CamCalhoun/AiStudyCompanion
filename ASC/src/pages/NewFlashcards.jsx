import { useState } from 'react'
import '../styles.css'
import Button from '../components/Button.jsx'
import TopBar from '../components/TopBar.jsx'
import SubjectList from '../components/SubjectList.jsx'
import { API_ADD_SUBJECT } from '../config/api';
import axios from 'axios';


function NewFlashcards() {
    const [flashcards, setFlashcards] = useState(() => {
        const flashcardsData = sessionStorage.getItem("flashcards")
        return flashcardsData ? JSON.parse(flashcardsData) : {}
    })

    const subjects = Object.keys(flashcards)

    const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0)
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)
    const [answerDisplayed, setAnswerDisplayed] = useState(Boolean)
    const handleQuestionDisplayedState = () => {
        if (answerDisplayed == false) {
            setAnswerDisplayed(true)
        } else {
            setAnswerDisplayed(false)
        }
    }

    const currentSubject = subjects[currentSubjectIndex];
    const currentFlashcard = flashcards[currentSubject] && flashcards[currentSubject][currentFlashcardIndex];

    const choices = currentFlashcard ? currentFlashcard.choices : []


    const prevSubject = () => {
        if (answerDisplayed) { handleQuestionDisplayedState() }
        setCurrentSubjectIndex((prev) => (prev > 0 ? prev - 1 : subjects.length - 1));
        setCurrentFlashcardIndex(0)
    }

    const nextSubject = () => {
        if (answerDisplayed) { handleQuestionDisplayedState() }
        setCurrentSubjectIndex((prev) => (prev < subjects.length - 1 ? prev + 1 : 0));
        setCurrentFlashcardIndex(0)
    }

    const prevFlashcard = () => {
        const subject = subjects[currentSubjectIndex]
        setCurrentFlashcardIndex((prev) => (prev > 0 ? prev - 1 : flashcards[subject].length - 1))
        if (answerDisplayed) { handleQuestionDisplayedState() }
    };

    const nextFlashcard = () => {
        if (answerDisplayed) { handleQuestionDisplayedState() }
        const subject = subjects[currentSubjectIndex];
        setCurrentFlashcardIndex((prev) => (prev < flashcards[subject].length - 1 ? prev + 1 : 0));
    };

    const removeFlashcard = () => {
        const subject = subjects[currentSubjectIndex]
        if (!flashcards[subject]) return

        const updatedFlashcards = { ...flashcards }

        if (flashcards[subject].length > 0) {
            updatedFlashcards[subject].splice(currentFlashcardIndex, 1)

            if (updatedFlashcards[subject].length === 0) {
                delete updatedFlashcards[subject]

                setCurrentSubjectIndex((prev) => (subjects.length > 1 ? (prev > 0 ? prev - 1 : 0) : 0))
            } else {
                setCurrentFlashcardIndex((prev) => (prev > 0 ? prev - 1 : 0))
            }
        }

        if (answerDisplayed) { handleQuestionDisplayedState() }
        setFlashcards(updatedFlashcards)
        sessionStorage.setItem("flashcards", JSON.stringify(updatedFlashcards))
    }

    return (
        <>
            {/* Full Page Layout */}
            <div className="grid grid-rows-[auto_1fr] min-h-screen">
                <TopBar title="Interactive Flashcards" />

                <div className='flex justify-center'>
                    <div className="p-4 text-center">
                        {/* Display subjects if available */}
                        {subjects.length > 0 ? (
                            <div className='w-full flex justify-center pb-4'>
                                <div className="w-1/3 flex">

                                    <Button text="<" onClick={prevSubject} />

                                    <h2 className="text-5xl font-semibold text-pwblue">{subjects[currentSubjectIndex]}</h2>

                                    <Button text=">" onClick={nextSubject} />

                                </div>
                            </div>

                        ) : (
                            <p className="text-gray-500">No flashcards available.</p>
                        )}

                        {currentFlashcard ? (
                            <div classname="w-full">
                                <div className="grid grid-cols-[1fr_3fr_1fr] gap-4">

                                    <div className="flex justify-end items-center w-full h-full">
                                        <div className="w-1/3 h-12">
                                            <Button text="<" onClick={prevFlashcard} />
                                        </div>
                                    </div>

                                    <div className="w-full p-5 border-3 border-pwred bg-pwblue text-[#F3F4F6] rounded-xl shadow-xl flex items-center justify-center gap-8
                                        hover:bg-[#0055a4] hover:border-[#ff4a3d] hover:text-[#ffffff] min-h-[200px] min-w-[700px]"
                                        onClick={handleQuestionDisplayedState}>
                                        {!answerDisplayed && (
                                            <>
                                                <h1 className="text-shadow text-4xl font-bold  w-1/2 text-center">{currentFlashcard.question}</h1>
                                                <div className="text-shadow text-2xl font-bold w-1/2 text-left">
                                                    <h1 className="py-1">
                                                        {choices[0]}
                                                    </h1>
                                                    <h1 className="py-1">
                                                        {choices[1]}
                                                    </h1>
                                                    <h1 className="py-1">
                                                        {choices[2]}
                                                    </h1>
                                                    <h1 className="py-1">
                                                        {choices[3]}
                                                    </h1>
                                                </div>
                                            </>)}
                                        {answerDisplayed && (
                                            <h1 className="text-shadow text-4xl font-bold  w-1/2 text-center">{currentFlashcard.answer}</h1>
                                        )}
                                    </div>

                                    <div className="flex justify-start items-center w-full h-full">
                                        <div className="w-1/3 h-12">
                                            <Button text=">" onClick={nextFlashcard} />

                                        </div>
                                    </div>

                                </div>
                                <div className='flex justify-center items-center w-full h-full flex-col p-4 gap-8'>
                                    <h3>Click on Flashcard to flip sides.</h3>
                                    <div className="w-1/3 h-12">
                                        <Button text="Remove Flashcard" onClick={removeFlashcard} />
                                    </div>

                                </div>

                            </div>


                        ) : (
                            <p>No flashcards in this subject</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewFlashcards;
