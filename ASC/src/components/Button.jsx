import '../styles.css'

function Button({ text, onClick, className }) {

    return (
        <div className={className}>
            <div
                className="w-full h-full mt-2 bg-pwblue rounded-full shadow-2xl flex items-center whitespace-nowrap justify-center py-3 px-40
			hover:bg-[#3DAEF9]
			active:scale-95 active:shadow-md transition-all duration-300"
                onClick={onClick}
            >
                <h1 className="text-shadow text-4xl font-bold text-[#F3F4F6]">{text}</h1>
            </div>
        </div>
    )
}

export default Button

