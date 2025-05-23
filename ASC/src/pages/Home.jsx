import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles.css'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import TopBar from '../components/TopBar.jsx'
import { useToast } from "../contexts/ToastContext"

import { API_HELLO } from "../config/api.js"
import { handleExport, handleImport } from "../utils/fileHandlers"


function Home() {
    const navigate = useNavigate()
    const { addToast } = useToast()

    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)
    const [delayed, setDelayed] = useState(false)
    const [cardMessage, setCardMessage] = useState("Make a selection on the left to begin!")


    useEffect(() => {
        setLoading(true)
        setDelayed(false)

        const delayTimer = setTimeout(() => setDelayed(true), 5000)

        axios.get(API_HELLO)
            .then((response) => {
                setMessage(response.data.message)
            })
            .catch((error) => {
                console.error("Error fetching data:", error)
            })
            .finally(() => {
                clearTimeout(delayTimer)
                setLoading(false)
            })
    }, [])

    return (
        <>
            {loading &&
                <div className="flex flex-col justify-center items-center text-center min-h-screen">
                    <h1 className="text-pwblue text-6xl font-semibold py-10">ASC is loading, please wait</h1>
                    <div class="col-3">
                        <div class="snippet" data-title="dot-flashing">
                            <div class="stage">
                                <div class="dot-flashing"></div>
                            </div>
                        </div>
                    </div>
                </div>}
            {/* Full Page Layout */}
            {!loading &&
                <div className="grid grid-rows-[auto_1fr] min-h-screen">
                    <TopBar title={`Welcome to ASC!`} />
                    {/* Buttons + Card */}
                    <div className="my-25 grid grid-cols-[53.75%_46.25%]">
                        {/* Buttons */}
                        <div className="flex items-center justify-center">
                            <div className="grid grid-cols-2 gap-20 w-full h-full p-20">
                                <Button text="Study"
                                    onClick={() => navigate("/study")}
                                    onMouseEnter={() => setCardMessage("Study your tracked subjects with the help of AI!")}
                                    onMouseLeave={() => setCardMessage("Make a selection on the left to begin!")} />
                                <Button text="Flashcards"
                                    onClick={() => navigate("/flashcards")}
                                    onMouseEnter={() => setCardMessage("Review saved questions in flashcard format, or let ASC generate some for you!")}
                                    onMouseLeave={() => setCardMessage("Make a selection on the left to begin!")} />
                                <Button text="Import"
                                    onClick={() => handleImport(addToast)}
                                    onMouseEnter={() => setCardMessage("Import your saved data to pick up where you left off!")}
                                    onMouseLeave={() => setCardMessage("Make a selection on the left to begin!")} />
                                <Button text="Export"
                                    onClick={() => handleExport(addToast)}
                                    onMouseEnter={() => setCardMessage("Export your data to study on the go!")}
                                    onMouseLeave={() => setCardMessage("Make a selection on the left to begin!")} />
                                <Button text="Subjects"
                                    onClick={() => navigate("/subjects")}
                                    onMouseEnter={() => setCardMessage("Add new subjects, and track your progress!")}
                                    onMouseLeave={() => setCardMessage("Make a selection on the left to begin!")} />
                                <Button text="About"
                                    onClick={() => navigate("/about")}
                                    onMouseEnter={() => setCardMessage("Learn more about this app!")}
                                    onMouseLeave={() => setCardMessage("Make a selection on the left to begin!")} />
                            </div>
                        </div>
                        {/* Card */}
                        <div className='flex items-center justify-center'>
                            <Card text={cardMessage} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Home
