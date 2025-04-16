import NavButton from "./NavButton"
import { useNavigate } from "react-router-dom"
import { handleExport, handleImport } from "../utils/fileHandlers"
import { useToast } from "../contexts/ToastContext"
function NavBar() {
    const navigate = useNavigate()
    const { addToast } = useToast()
    return (
        <div className="bg-pwblue h-16 flex justify-center">
            <div className="flex justify-center gap-1/2 w-full">
                <NavButton text="Home" onClick={() => navigate("/")} />
                <NavButton text="Study" onClick={() => navigate("/study")} />
                <NavButton text="Flashcards" onClick={() => navigate("/flashcards")} />
                <NavButton text="Subjects" onClick={() => navigate("/subjects")} />
                <NavButton text="Import" onClick={() => handleImport(addToast)} />
                <NavButton text="Export" onClick={() => handleExport(addToast)} />
                <NavButton text="About" onClick={() => navigate("/about")} />
            </div>
        </div>
    )
}
export default NavBar
