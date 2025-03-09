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
                <TopBar title="Subjects" />
                <div>
                    {/* Subjects */}
                    <div className="p-10 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">Tracked subjects:</h2>

                        {/* Buttons */}
                        <div className="mt-10 grid grid-cols-2 gap-4 ">
                            <Button text="Back" onClick={() => navigate("/")} />
                            <Button text="Add Subject" onClick={() => navigate("/")} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
