import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../styles.css'
import Button from '../components/Button.jsx'
import TopBar from '../components/TopBar.jsx'
import SubjectList from '../components/SubjectList.jsx'
function About() {
    const navigate = useNavigate();

    return (
        <>
            {/* Full Page Layout */}
            <div className="grid grid-rows-[auto_1fr] min-h-screen">
                <TopBar title="Subjects" />
                <div>
                    {/* Subjects */}
                    <div className="p-10 max-w-6xl mx-auto">
                        <SubjectList />
                        {/* Buttons */}
                        <div className="mt-10 grid grid-cols-2 gap-4 ">
                            <Button text="Add Subject" />
                            <Button text="Remove Subject" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
