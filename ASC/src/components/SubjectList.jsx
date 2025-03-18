import React, { useEffect, useState } from 'react'
import Subject from './Subject'

function SubjectList({ onSubjectSelect }) {
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
        <div>
            <h2 className="text-3xl text-center font-bold mb-4">Tracked subjects:</h2>
            <div className={`${subjects.length > 0 && `bg-blue-100`} w-full h-full`}>
                {subjects.length > 0 && (
                    <div className="border-4 border-pwblue font-bold text-4xl mb-2 flex justify-between p-4">
                        <span className="w-1/3">Subject:</span>
                        <span className="w-1/3 text-center">Ranking</span>
                        <span className="w-1/3 text-right">Delete</span>
                    </div>
                )}
                {subjects.length === 0 ? (
                    <p className="text-2xl text-center font-bold mb-4">No subjects available. Add a subject to get started!</p>
                ) : (
                    subjects.map((subject, index) => (
                        <Subject
                            key={index}
                            name={subject.subjectName}
                            rank={subject.subjectElo}
                            onCheckboxChange={onSubjectSelect}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default SubjectList
