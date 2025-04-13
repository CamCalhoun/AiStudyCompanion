import { useState } from 'react'
import '../styles.css'
import Button from '../components/Button.jsx'
import TopBar from '../components/TopBar.jsx'
import { useNavigate } from "react-router-dom"

function Flashcards() {
    const navigate = useNavigate()
    return (
        <>
            {/* Full Page Layout */}
            <div className="grid grid-rows-[auto_1fr] min-h-screen">
                <TopBar title="Flashcards" />
                <div className='flex justify-center items-center h-full'>
                    <div className='flex w-full gap-80 p-30 h-full justify-between items-center'>
                        <div className='flex flex-col items-center w-1/2 h-1/2'>
                            <Button
                                text='Legacy Flashcards'
                                className='p-20'
                                onClick={() => navigate('/legacy_flashcards')} />
                            <h1 className='text-center text-2xl w-2/3 pt-5 border-3 p-4 border-pwred rounded-xl m-10'>
                                Randomly generate five questions of a chosen subject that match your skill level, and export them as a PDF!
                            </h1>
                        </div>

                        <div className='flex flex-col items-center w-1/2 h-1/2'>
                            <Button
                                text='Interactive Flashcards'
                                className='p-20'
                                onClick={() => navigate('/interactive_flashcards')} />
                            <h1 className='text-center text-2xl w-2/3 pt-5 border-3 p-4 border-pwred rounded-xl m-10'>                                Utilize flashcards saved during Study. Interact with them here, or export them as a PDF!
                            </h1>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Flashcards;
