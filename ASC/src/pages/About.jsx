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


                        <h2 className="text-3xl font-bold mt-8 mb-4">Project Progress</h2>
                        <div className="border-3 p-4 border-pwred rounded-xl p-6 rounded-2xl shadow-md text-lg space-y-2">
                            <p>
                                Curious about how ASC has developed over time? We maintain a transparent development log to track our goals, updates, and milestones.
                            </p>
                            <p>
                                Visit our <span className="text-blue-600 cursor-pointer underline" onClick={() => navigate("/progress")}>Progress</span> page to follow along with the journey and see how the site has evolved since its inception.
                            </p>
                        </div>

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

                        <h2 className="text-3xl font-bold mt-8 mb-4">Explore the Features</h2>
                        <div className="text-lg space-y-4">
                            <p><strong>Study:</strong> Practice with AI-generated questions tailored to your progress and performance.</p>
                            <p><strong>Flashcards:</strong> Create and study randomized flashcards, or review ones you've saved for targeted practice.</p>
                            <p><strong>Subjects:</strong> Manage your subjects, add new topics, and view detailed scores for each to track your growth.</p>
                            <p><strong>Import & Export:</strong> Use the navbar buttons to save your progress as a portable file or load existing progress easily.</p>
                        </div>

                        <h2 className="text-3xl font-bold mt-8 mb-4">More Resources</h2>
                        <div className="text-lg space-y-4">
                            <p>
                                Need help navigating ASC or want technical details about how it works? Check out our <span className="text-blue-600 cursor-pointer underline" onClick={() => window.location.href = "/docs/html/index.html"}>Docs</span> page for guides, FAQs, and contributor info.
                            </p>
                        </div>
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
