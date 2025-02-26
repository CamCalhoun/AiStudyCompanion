import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import '../styles.css'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import TopBar from '../components/TopBar.jsx'

function Home() {
    const navigate = useNavigate()

    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)
    const [delayed, setDelayed] = useState(false)

    useEffect(() => {
        setLoading(true)
        setDelayed(false)

        const delayTimer = setTimeout(() => setDelayed(true), 5000)

        axios.get("https://aistudycompanion.onrender.com/api/hello")
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
            {/* Full Page Layout */}
            <div className="grid grid-rows-[auto_auto_1fr] min-h-screen">
                <TopBar title={`Welcome ${loading ? (delayed ? "Server is waking up... Please wait." : "Loading...") : message}`} />
                {/* Buttons + Card */}
                <div className="grid grid-cols-[53.75%_46.25%]">
                    {/* Buttons */}
                    <div className="flex items-center justify-center">
                        <div className="grid grid-cols-2 gap-20 w-full h-full p-20">
                            <Button text="Study" />
                            <Button text="Flashcards" />
                            <Button text="Import" />
                            <Button text="Export" />
                            <Button text="Subjects" />
                            <Button text="About" onClick={() => navigate("/about")} />
                        </div>
                    </div>
                    {/* Card */}
                    <div className='flex items-center justify-center'>
                        <Card text="Make a selection on the left to begin!" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
