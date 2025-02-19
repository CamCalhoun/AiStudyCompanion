import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

    return (
        <>
            <div className="grid grid-rows-[35.28%_64.72%] h-screen">
                <div className="grid grid-rows-2 h-full">
                    <div className="p-1 flex items-center text-8xl font-semibold bg-white">
                        <h1>
                            <span className="text-shadow text-pwblue">AI Study</span>
                            <span className="text-shadow text-pwred"> Companion</span>
                        </h1>
                    </div>
                    <div className="p-1 flex items-center text-8xl font-semibold bg-pwblue">
                        <h1 className="text-white">Welcome</h1>
                    </div>
                </div>
                <div className="bg-white"></div>
            </div>
        </>
    )
}

export default App
