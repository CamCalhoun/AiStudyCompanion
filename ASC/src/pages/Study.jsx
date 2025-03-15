import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../styles.css'
import Button from '../components/Button.jsx'
import TopBar from '../components/TopBar.jsx'
function Study() {
    const navigate = useNavigate();

    return (
        <>
            {/* Full Page Layout */}
            <div className="grid grid-rows-[auto_1fr_] min-h-screen">
                <TopBar title="Study" />
                <div className="grid grid-rows-[50%_35%_15%]">

                    {/* Question */}
                    <div className="bg-orange-200 flex justify-center items-center">
                        <div className="w-[82.99%] h-[71.77%] bg-pwblue rounded-xl shadow-xl flex items-center ">
                            <h1 className="text-shadow text-4xl font-bold text-[#F3F4F6] w-1/2 text-center">
                                Question: Which event is considered the immediate cause of World War I?
                            </h1>
                            <div className="text-shadow text-2xl font-bold text-[#F3F4F6] w-1/2">
                                <h1 className="py-1">
                                    A) The Treaty of Versailles
                                </h1>
                                <h1 className="py-1">
                                    B) The assassination of Archduke Franz Ferdinand
                                </h1>
                                <h1 className="py-1">
                                    C) The rise of Adolf Hitler
                                </h1>
                                <h1 className="py-1">
                                    D) The signing of the Molotov-Ribbentrop Pact
                                </h1>
                            </div>
                        </div>

                    </div>

                    {/* Answer choices */}
                    <div className='bg-lime-200 flex justify-between items-center w-3/5 mx-auto'>
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
                    <div className='bg-purple-500 flex justify-between items-center'>
                        <form className='w-1/3 pl-17'>
                            <label for="subjects" className="block mb-2 text-xl font-semibold text-gray-900">Select a subject:</label>
                            <select id="subjects"
                                name="subjects"
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-pwblue focus:border-blue-500 block w-full p-2.5'>
                                <option value="" hidden disabled selected>Subjects</option>
                                <option value="English">English</option>
                                <option value="History">History</option>
                                <option value="Geography">Geography</option>
                                <option value="Computer Science">Computer Science</option>
                            </select>
                        </form>
                        <Button text='Generate' />
                        <div className="w-1/3 h-[71.77%] bg-pwblue rounded-xl shadow-xl flex justify-center items-center ">
                            <h1 className="text-shadow text-4xl font-bold text-[#F3F4F6] w-1/2 text-center">
                                Current Subject
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Study;
