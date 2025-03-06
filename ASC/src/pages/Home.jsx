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

    // PROD URL AND DEV URL
    const LOCAL_BASE_URL = "http://127.0.0.1:8000"
    const PROD_BASE_URL = "https://aistudycompanion.onrender.com"
    // Change the line below depending on prod or dev
    const BASE_URL = PROD_BASE_URL

    const API_HELLO = `${BASE_URL}/api/hello`
    const API_EXPORT = `${BASE_URL}/api/export`

    const handleExport = () => {
        try {
            const storedData = sessionStorage.getItem("importedSubjects")

            if (!storedData) {
                alert("No subjects to export!")
                return
            }


            const blob = new Blob([storedData], { type: "application/json" })
            const url = window.URL.createObjectURL(blob)

            const a = document.createElement("a")
            a.href = url
            a.download = "subjects.json"
            a.style.display = "none"
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            // free url memory
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error("ERROR exporting subjects: ", error)
            alert("Failed to export subjects.")
        }
    }

    const handleImport = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result)

                sessionStorage.setItem("importedSubjects", JSON.stringify(jsonData))

                alert("Subjects successfully imported!")
            } catch (error) {
                console.error("ERROR importing data: ", error)
                alert("Failed to import subjects.")
            }
        }
        reader.readAsText(file)
    }

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
                            <div>
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleImport}
                                    style={{ display: "none" }}
                                    id="importFile"
                                />
                                <label htmlFor="importFile">
                                    <Button text="Import" />
                                </label>
                            </div>
                            <Button text="Export" onClick={handleExport} />
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
