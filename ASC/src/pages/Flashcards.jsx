import { useState } from 'react'
import '../styles.css'
import Button from '../components/Button.jsx'
import TopBar from '../components/TopBar.jsx'
import SubjectList from '../components/SubjectList.jsx'
import { API_ADD_SUBJECT } from '../config/api';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icons for navigation


function Flashcards() {
    const flashcardsData = sessionStorage.getItem("flashcards")
    const flashcards = flashcardsData ? JSON.parse(flashcardsData) : {}

    const categories = Object.keys(flashcards)

    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)

    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0)

    const prevCategory = () => {
        setCurrentCategoryIndex((prev) => (prev > 0 ? prev - 1 : categories.length - 1));
    }

    const nextCategory = () => {
        setCurrentCategoryIndex((prev) => (prev < categories.length - 1 ? prev + 1 : 0));
    }

    const prevFlashcard = () => {
        const category = categories[currentCategoryIndex];
        setCurrentFlashcardIndex((prev) => (prev > 0 ? prev - 1 : flashcards[category].length - 1));
    };

    const nextFlashcard = () => {
        const category = categories[currentCategoryIndex];
        setCurrentFlashcardIndex((prev) => (prev < flashcards[category].length - 1 ? prev + 1 : 0));
    };

    const currentCategory = categories[currentCategoryIndex];
    const currentFlashcard = flashcards[currentCategory] && flashcards[currentCategory][currentFlashcardIndex];

    const choices = currentFlashcard ? currentFlashcard.choices : []
    return (
        <>
            {/* Full Page Layout */}
            <div className="grid grid-rows-[auto_1fr] min-h-screen">
                <TopBar title="Flashcards" />

                <div className='flex justify-center'>
                    <div className="p-4 text-center">
                        {/* Display categories if available */}
                        {categories.length > 0 ? (
                            <div className='w-full flex justify-center pb-4'>
                                <div className="w-1/3 flex">

                                    <Button text="<" onClick={prevCategory} />

                                    <h2 className="text-5xl font-semibold text-pwblue">{categories[currentCategoryIndex]}</h2>

                                    <Button text=">" onClick={nextCategory} />

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
                                    <div className="w-full p-5 border-3 border-pwred bg-pwblue rounded-xl shadow-xl flex items-center justify-center gap-8 ">
                                        <h1 className="text-shadow text-4xl font-bold text-[#F3F4F6]  w-1/2 text-center">{currentFlashcard.question}</h1>
                                        <div className="text-shadow text-2xl font-bold text-[#F3F4F6] w-1/2 text-left">
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
                                    </div>
                                    <div className="flex justify-start items-center w-full h-full">
                                        <div className="w-1/3 h-12">
                                            <Button text=">" onClick={nextFlashcard} />

                                        </div>
                                    </div>
                                </div>

                            </div>


                        ) : (
                            <p>No flashcards in this category</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Flashcards;
