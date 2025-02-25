import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import '../styles.css'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import TopBar from '../components/TopBar.jsx'

function Home() {
    const navigate = useNavigate()

    return (
        <>
            {/* Full Page Layout */}
            <div className="grid grid-rows-[auto_auto_1fr] min-h-screen">
                <TopBar title="Welcome" />
                {/* Buttons + Card */}
                <div className="grid grid-cols-[53.75%_46.25%]">
                    {/* Buttons */}
                    <div className="flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-20 w-full h-full p-20">
                            <Button text="Study" />
                            <Button text="Flashcards" />
                            <Button text="Import" />
                            <Button text="Export" />
                            <Button text="Subjects" />
                            <Button text="About" onClick={() => navigate("/about")} />
                        </div>
                    </div>
                    {/* Card */}
                    <div className='flex items-center justify-center'>
                        <Card text="Make a selection on the left to begin!" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
