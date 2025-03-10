import React, { useEffect, useState } from 'react'
import Subject from './Subject'

function SubjectList() {
    const [subjects, setSubjects] = useState([])

    useEffect(() => {
        const storedData = sessionStorage.getItem("importedSubjects")

        if (storedData) {
            const parsedData = JSON.parse(storedData)
            setSubjects(parsedData)
        } else {
            console.log("No subjects found in sessionStorage")
        }
    }, [])

    return (
        <div>
            <h2 className="text-3xl text-center font-bold mb-4">Tracked subjects:</h2>
            <div className="bg-blue-100 w-full h-full">
                {subjects.length > 0 && (
                    <div className="border-4 border-pwred font-semibold text-4xl flex justify-between p-4">
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
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default SubjectList
