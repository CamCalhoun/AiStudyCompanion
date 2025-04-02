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
                        <div className='w-1/2 h-1/6'>
                            <Button
                                text='Legacy Flashcards'
                                className='p-20'
                                onClick={() => navigate('/legacy_flashcards')} />
                        </div>

                        <div className='w-1/2 h-1/6'>
                            <Button
                                text='Interactive Flashcards'
                                className='p-20'
                                onClick={() => navigate('/interactive_flashcards')} />
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Flashcards;
