import '../styles.css'

function NavButton({ text, onClick }) {

    return (
        <>
            <div
                className="w-1/4 h-full bg-pwblue flex items-center whitespace-nowrap justify-center py-3 px-10
			hover:bg-[#3DAEF9]
			active:scale-x-95 active:shadow-md transition-all duration-300"
                onClick={onClick}
            >
                <h1 className="text-shadow text-2xl font-bold text-[#F3F4F6]">{text}</h1>
            </div>
        </>
    )
}

export default NavButton

