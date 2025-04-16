
import { useState } from "react";
import '../styles.css'
import articles from "./progressFiles/articles"
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const sections = Object.keys(articles).map((id) => ({ id, label: id.charAt(0).toUpperCase() + id.slice(1) }));

export default function Progress() {
    const [selectedSection, setSelectedSection] = useState("about");
    const navigate = useNavigate();

    return (
        <div className="h-screen flex flex-col bg-bgwhite text-pwblue">
            {/* Top Bar */}
            <header className="w-full h-1/8 bg-pwblue flex items-center justify-center">
                <div className="w-3/4 h-1/2 bg-bgwhite rounded-xl shadow-2xl flex items-center justify-center">
                    <h1 className="text-3xl font-bold">
                        <span className="text-pwred">ASC</span>{' '}
                        <span className="text-pwblue">Progress Reports</span>
                    </h1>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden my-4">

                {/* Side Bar */}
                <aside className="w-1/6 h-full bg-bgwhite flex flex-col items-center px-3 py-4 
                  border-3 p-4 border-pwred rounded-xl overflow-y-auto">

                    {/* Home Button */}
                    <button
                        className="w-full mb-4 bg-pwblue rounded-full shadow-2xl flex items-center justify-center py-3
                   hover:bg-red-400 hover:shadow-3xl hover:scale-105
                   active:bg-pwred active:scale-95 active:shadow-md transition-all duration-300"
                        onClick={() => navigate("/")}
                    >
                        <h1 className="text-2xl font-bold text-white">Home</h1>
                    </button>

                    {/* Section Buttons */}
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            className="w-full mt-2 bg-pwblue rounded-full shadow-2xl flex items-center justify-center py-3
                       hover:bg-red-400 hover:shadow-3xl hover:scale-105
                       active:bg-pwred active:scale-95 active:shadow-md transition-all duration-300"
                            onClick={() => setSelectedSection(section.id)}
                        >
                            <h1 className="text-2xl font-bold text-white">{section.label}</h1>
                        </button>
                    ))}
                </aside>

                {/* Article Section */}
                <main className="w-full h-full overflow-y-auto bg-bgwhite p-5">
                    <article
                        id="main-article"
                        className="prose max-w-screen-xl mx-auto w-full p-8 bg-white shadow-lg rounded-lg"
                        dangerouslySetInnerHTML={{ __html: articles[selectedSection] }}
                    />
                </main>
            </div>

            {/* Sticky Download Section */}
            <div className="sticky bottom-0 bg-bgwhite border-t-4 border-pwred p-3 flex items-center justify-between space-x-4">
                <h2 className="text-xl font-bold text-pwblue">Download Relevant Documents</h2>
                <div className="flex space-x-4">
                    <a
                        href="/pdfs/project_proposal.pdf"
                        download
                        className="text-pwblue underline hover:text-pwred transition-colors duration-300"
                    >
                        Project Proposal
                    </a>
                    <a
                        href="/pdfs/requirements_document.pdf"
                        download
                        className="text-pwblue underline hover:text-pwred transition-colors duration-300"
                    >
                        Requirements Document
                    </a>
                    <a
                        href="/pdfs/specification_document.pdf"
                        download
                        className="text-pwblue underline hover:text-pwred transition-colors duration-300"
                    >
                        Specification Document
                    </a>
                    <a
                        href="/pdfs/design_document.pdf"
                        download
                        className="text-pwblue underline hover:text-pwred transition-colors duration-300"
                    >
                        Design Document
                    </a>
                    <a
                        //href="/pdfs/user_manual.pdf"
                        download
                        //className="text-pwblue underline hover:text-pwred transition-colors duration-300"
                        className="text-gray-400 cursor-not-allowed"
                    >
                        User Manual
                    </a>
                </div>
            </div>
        </div>
    );
}

