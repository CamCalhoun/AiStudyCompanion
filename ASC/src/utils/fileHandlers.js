export const handleExport = () => {
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

export const handleImport = async (event) => {
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
