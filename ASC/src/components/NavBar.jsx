import NavButton from "./NavButton"
import { useNavigate } from "react-router-dom"
function NavBar() {
    const navigate = useNavigate()
    return (
        <div className="bg-pwblue h-16 flex justify-center">
            <div className="flex justify-center gap-1/2 w-full">
                <NavButton text="Home" onClick={() => navigate("/")} />
                <NavButton text="Study" />
                <NavButton text="Flashcards" />
                <NavButton text="Subjects" onClick={() => navigate("/subjects")} />
                <NavButton text="Import" />
                <NavButton text="Export" />
                <NavButton text="About" onClick={() => navigate("/about")} />
            </div>
        </div>
    )
}
export default NavBar
