import { useState } from "react";
import '../styles.css'
import articles from "./progressFiles/articles"

const sections = Object.keys(articles).map((id) => ({ id, label: id.charAt(0).toUpperCase() + id.slice(1) }));

export default function Progress() {
    const [selectedSection, setSelectedSection] = useState("about");

    return (
        <div className="h-screen flex flex-col bg-[#F9FAFB] text-[#0F172A]">
            {/* Top Bar */}
            <header className="w-full h-1/5 bg-[#0F172A] flex items-center justify-center">
                <div className="w-3/4 h-1/2 bg-[#3B82F6] rounded-xl shadow-2xl flex items-center justify-center">
                    <h1 className="text-3xl font-bold text-[#F3F4F6]">ASC Progress Reports</h1>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Side Bar */}
                <aside className="w-1/6 h-full bg-[#2D3748] flex flex-col items-center px-3">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            className="w-full mt-2 bg-[#3B82F6] rounded-full shadow-2xl flex items-center justify-center py-3
                hover:bg-[#3DAEF9] hover:shadow-3xl hover:scale-105
                active:bg-[#3B82F6] active:scale-95 active:shadow-md transition-all duration-300"
                            onClick={() => setSelectedSection(section.id)}
                        >
                            <h1 className="text-2xl font-bold text-[#F3F4F6]">{section.label}</h1>
                        </button>
                    ))}
                </aside>

                {/* Article Section */}
                <main className="w-full h-full overflow-y-auto bg-gradient-to-b from-blue-50 to-blue-100 p-5">
                    <article
                        id="main-article"
                        className="prose max-w-screen-xl mx-auto w-full p-8 bg-white shadow-lg rounded-lg"
                        dangerouslySetInnerHTML={{ __html: articles[selectedSection] }}
                    />
                </main>
            </div>
        </div>
    );
}
