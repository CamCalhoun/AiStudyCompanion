
export const handleExport = () => {
    try {
        const subjectsData = sessionStorage.getItem("importedSubjects");
        const flashcardsData = sessionStorage.getItem("flashcards");

        if (!subjectsData || subjectsData === "null") {
            alert("No subjects to export!");
            return;
        }

        // Ensure flashcardsData is a valid object
        const flashcards = flashcardsData ? JSON.parse(flashcardsData) : {};

        const exportData = {
            importedSubjects: JSON.parse(subjectsData),
            flashcards: flashcards
        };

        const jsonString = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "ascData.json";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Free URL memory
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("ERROR exporting subjects: ", error);
        alert("Failed to export subjects.");
    }
};

export const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const jsonData = JSON.parse(e.target.result);

                // Ensure importedSubjects is a valid array
                if (!Array.isArray(jsonData.importedSubjects)) {
                    throw new Error("Invalid file format.");
                }

                sessionStorage.setItem("importedSubjects", JSON.stringify(jsonData.importedSubjects));

                // Ensure flashcards is a valid object before setting it
                sessionStorage.setItem("flashcards", JSON.stringify(jsonData.flashcards || {}));

                window.dispatchEvent(new Event("subjectsUpdated"));
                alert("Subjects and flashcards successfully imported!");
            } catch (error) {
                console.error("ERROR importing data: ", error);
                alert("Failed to import subjects.");
            }
        };
        reader.readAsText(file);

        input.remove();
    });

    input.click();
};

