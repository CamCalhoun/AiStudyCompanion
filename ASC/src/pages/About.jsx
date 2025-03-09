import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../styles.css'
import Button from '../components/Button.jsx'
import TopBar from '../components/TopBar.jsx'
function About() {
    const navigate = useNavigate();

    return (
        <>
            {/* Full Page Layout */}
            <div className="grid grid-rows-[auto_1fr] min-h-screen">
                <TopBar title="About ASC" />
                <div>
                    {/* About Article */}
                    <div className="p-10 max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">What is AI Study Companion?</h2>
                        <p className="text-lg mb-4">
                            AI Study Companion (ASC) is a collaborative project spawned from PennWest California's Senior Project: Software Engineering course.
                            This project is headed by four Computer Science students of PennWest California:</p>
                        <ul className="list-disc pl-6 text-lg space-y-2 mb-4">
                            <li>Cameron Calhoun</li>
                            <li>Gage Keslar</li>
                            <li>Jonathan Buckel</li>
                            <li>Seth Morgan</li>
                        </ul>
                        <p className="text-lg mb-4">
                            AI Study Companion is a website built to utilize the latest large language model capabilities to provide a convenient
                            solution to studying given subjects. AI Study Companion provides users with a set of subjects in which they can interactively test their skills in
                            with ASC adjusting the difficulty based on your individual progress.
                        </p>

                        <h2 className="text-3xl font-bold mt-8 mb-4">Why Use AI Study Companion?</h2>
                        <ul className="list-disc pl-6 text-lg space-y-2">
                            <li>Personalized learning paths based on your progress.</li>
                            <li>Instant explanations and interactive problem-solving.</li>
                            <li>Access to a vast library of study materials.</li>
                            <li>Time-efficient and engaging study sessions.</li>
                        </ul>

                        <h2 className="text-3xl font-bold mt-8 mb-4">How It Works</h2>
                        <p className="text-lg mb-4">
                            Simply visit the website, select your subject of interest, and start interacting with AI to get
                            step-by-step guidance. The more you use the tool, the better it adapts to your learning style.
                            Need to study on the go? Just export your progress to a portable file and import it on any other machine.
                        </p>

                        {/* Back Button */}
                        <div className="mt-10 flex justify-center">
                            <Button text="Back" onClick={() => navigate("/")} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
