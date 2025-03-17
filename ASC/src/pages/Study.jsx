import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../styles.css'
import Button from '../components/Button.jsx'
import TopBar from '../components/TopBar.jsx'
function Study() {
    const [selectedSubject, setSelectedSubject] = useState("")
    const handleSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
    };

    const [subjects, setSubjects] = useState([])



    useEffect(() => {
        const loadSubjects = () => {
            const storedData = sessionStorage.getItem("importedSubjects")
            setSubjects(storedData ? JSON.parse(storedData) : [])
        }

        loadSubjects()

        const handleUpdate = () => loadSubjects()

        window.addEventListener("subjectsUpdated", handleUpdate)
        return () => window.removeEventListener("subjectsUpdated", handleUpdate)
    }, [])

    return (
        <>
            {/* Full Page Layout */}
            <div className="grid grid-rows-[auto_1fr_] min-h-screen">
                <TopBar title="Study" />
                <div className="flex flex-col p-4">

                    {/* Question */}
                    <div className="flex justify-center items-center">
                        <div className="w-full h-full p-5 border-3 border-pwred bg-pwblue rounded-xl shadow-xl flex items-center ">
                            <h1 className="text-shadow text-4xl font-bold text-[#F3F4F6] w-1/2 text-center">
                                Question: This is an example question. Questions generated will go here.
                            </h1>
                            <div className="text-shadow text-2xl font-bold text-[#F3F4F6] w-1/2">
                                <h1 className="py-1">
                                    A) Example answer choice A.
                                </h1>
                                <h1 className="py-1">
                                    B) Example answer choice B.
                                </h1>
                                <h1 className="py-1">
                                    C) Example Answer choice C.
                                </h1>
                                <h1 className="py-1">
                                    D) Example Answer choice D.
                                </h1>
                            </div>
                        </div>

                    </div>

                    {/* Answer choices */}
                    <div className='border-3 border-pwred rounded-xl p-12 flex justify-between items-center w-3/5 m-auto'>
                        <div className="flex flex-col gap-10">
                            <Button text="A" />
                            <Button text="C" />
                        </div>
                        <div className="flex flex-col gap-10">
                            <Button text="B" />
                            <Button text="D" />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className='flex justify-between border-3 p-4 border-pwred rounded-xl items-center'>
                        <form className='w-1/3 pl-17'>
                            <label for="subjects" className="block mb-2 text-xl font-semibold text-gray-900">Select a subject:</label>
                            <select id="subjects"
                                name="subjects"
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-pwblue focus:border-blue-500 block w-full p-2.5'
                                onChange={handleSubjectChange}>
                                <option value="" hidden disabled selected>
                                    {subjects.length === 0 ? 'Please add a subject in "Subjects".' : "Subjects"}
                                </option>
                                {subjects.map((subject, index) => (
                                    <option key={index} value={subject.subjectName}>
                                        {subject.subjectName}
                                    </option>
                                ))}
                            </select>
                        </form>
                        <Button
                            text='Generate'
                            onClick={() => handleGenerateQuestion(selectedSubject)} />
                        <div className="w-1/3 h-[71.77%] bg-pwblue rounded-xl shadow-xl flex justify-center items-center 
                                        text-shadow text-4xl font-bold text-[#F3F4F6] text-center">
                            {subjects.length === 0 ? (
                                <h1>No subject found</h1>

                            ) : !selectedSubject ? (
                                <h1>No subject selected</h1>
                            ) : (
                                <div className='w-full flex'>
                                    <h1 className="w-1/2">
                                        {selectedSubject}
                                    </h1>
                                    <h1 className="w-1/2">
                                        Elo: {subjects.find(subject => subject.subjectName === selectedSubject)?.subjectElo || ""}
                                    </h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Study;
