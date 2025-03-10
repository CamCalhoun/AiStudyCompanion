import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../styles.css'
import Button from '../components/Button.jsx'
import TopBar from '../components/TopBar.jsx'
import SubjectList from '../components/SubjectList.jsx'
function About() {
    const navigate = useNavigate();

    const [selectedSubject, setSelectedSubject] = useState("English"); // Default to English
    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };
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
                        <div className="mt-10 grid grid-cols-2 gap-4 items-center ">
                            <div className='flex justify-center items-center'>
                                <Button text="Add Subject" className="w-1/2" />
                                <form className='max-w-sm mx-auto pl-17'>
                                    <label for="subjects" className="block mb-2 text-xl font-semibold text-gray-900">Select a subject:</label>
                                    <select id="subjects"
                                        name="subjects"
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-pwblue focus:border-blue-500 block w-full p-2.5'
                                        onChange={handleSubjectChange}>
                                        <option value="English">English</option>
                                        <option value="History">History</option>
                                        <option value="Geography">Geography</option>
                                        <option value="ComputerScience">Computer Science</option>
                                    </select>
                                </form>
                            </div>
                            <Button text="Remove Subject" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;
