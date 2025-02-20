import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../styles.css'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
function About() {
    const navigate = useNavigate()

    return (
        <>
            <div className="grid grid-rows-[35.28%_64.72%] h-screen bg-bgwhite">
                <div className="grid grid-rows-2 h-full">
                    <div className="p-1 flex items-center justify-between text-8xl font-semibold">
                        <h1>
                            <span className="text-shadow text-pwblue">AI Study</span>
                            <span className="text-shadow text-pwred"> Companion</span>
                        </h1>
                        <img
                            src="pennwest-california.png"
                            className=""
                        />
                    </div>
                    <div className="p-1 flex items-center text-8xl font-semibold bg-pwblue">
                        <h1 className="text-white">About ASC</h1>
                    </div>
                </div>

                <div className="grid grid-cols-[53.75%_46.25%]">
                    <div className="flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-20 w-full h-full p-20">
                            <Button text="Back" onClick={() => navigate("/")} />
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <Card text="Make a selection on the left to begin!" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
