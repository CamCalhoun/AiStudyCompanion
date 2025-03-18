import { useState } from 'react'
import '../styles.css'
import Button from '../components/Button.jsx'
import TopBar from '../components/TopBar.jsx'
import SubjectList from '../components/SubjectList.jsx'
import { API_ADD_SUBJECT } from '../config/api';
import axios from 'axios';

function Subjects() {
    const [selectedSubjects, setSelectedSubjects] = useState(new Set())

    const handleSubjectSelection = (subjectName, isChecked) => {
        setSelectedSubjects(prev => {
            const newSelection = new Set(prev);
            isChecked ? newSelection.add(subjectName) : newSelection.delete(subjectName);
            return newSelection;
        });
    }

    const [forceUpdate, setForceUpdate] = useState(false)
    const handleRemoveSubjects = () => {
        let subjects = JSON.parse(sessionStorage.getItem("importedSubjects")) || [];
        subjects = subjects.filter(sub => !selectedSubjects.has(sub.subjectName));

        sessionStorage.setItem("importedSubjects", JSON.stringify(subjects));
        setSelectedSubjects(new Set()); // Clear selection after removal

        setForceUpdate(prev => !prev)
        window.dispatchEvent(new Event("subjectsUpdated"));
    };


    const handleAddSubject = async (newSubject) => {
        if (!selectedSubject) {
            console.error("No subject selected!")
            return
        }

        const currentSubjects = JSON.parse(sessionStorage.getItem("importedSubjects")) || []
        console.log("Current subjects from sessionStorage:", currentSubjects)
        console.log("New Subject:", newSubject)

        try {
            const payload = {
                subjects: currentSubjects,
                newSubject: newSubject
            }
            const response = await axios.post(API_ADD_SUBJECT, payload, {
                headers: { "Content-Type": "application/json" }
            })

            sessionStorage.setItem("importedSubjects", JSON.stringify(response.data.subjects))
            console.log("Subjects updated:", response.data.subjects)

            window.dispatchEvent(new Event("subjectsUpdated"))
        } catch (error) {
            console.error("Error adding subject:", error)
        }
    }


    const [selectedSubject, setSelectedSubject] = useState("")
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
                        <SubjectList onSubjectSelect={handleSubjectSelection} key={forceUpdate} />
                        {/* REMOVE BUTTON */}
                        <div className='h-12 w-1/5 ml-auto '>
                            {selectedSubjects.size !== 0 &&
                                <Button
                                    text="Remove Subject"
                                    onClick={handleRemoveSubjects}
                                    className="" />
                            }
                        </div>
                        {/* ADD BUTTON & LIST */}
                        <div className="w-1/3 mt-10 flex justify-end relative -translate-y-23 translate-x-69 z-0">
                            <div className=''>

                                <form className='max-w-sm mx-auto '>
                                    <label for="subjects" className=" text-center block mb-2 text-xl font-semibold text-gray-900">Add a subject:</label>
                                    <select id="subjects"
                                        name="subjects"
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-pwblue focus:border-blue-500 block w-full p-2.5'
                                        onChange={handleSubjectChange}>
                                        <option value="" hidden disabled selected>Subjects</option>
                                        <option value="English">English</option>
                                        <option value="History">History</option>
                                        <option value="Geography">Geography</option>
                                        <option value="Computer Science">Computer Science</option>
                                    </select>
                                </form>
                                <div className='h-1/3 z-10 mt-2'>
                                    <Button text="Add Subject"
                                        className="mx-auto "
                                        onClick={() => handleAddSubject(selectedSubject)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Subjects;
