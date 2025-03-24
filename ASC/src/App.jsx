import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Subjects from "./pages/Subjects";
import Progress from "./pages/Progress"
import Study from "./pages/Study";
import Flashcards from "./pages/Flashcards"
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/study" element={<Study />} />
                <Route path="/flashcards" element={<Flashcards />} />
            </Routes>
        </Router>
    )
}

export default App;
