import '../styles.css'

function Button({ text, onClick, className }) {

    return (
        <div
            className={`w-full h-full ${className} py-2 bg-pwblue rounded-full shadow-2xl flex items-center whitespace-nowrap justify-center 
			hover:bg-[#3DAEF9]
			active:scale-95 active:shadow-md transition-all duration-300`}
            onClick={onClick}
        >
            <h1 className="text-shadow text-2xl font-bold text-[#F3F4F6]">{text}</h1>
        </div>
    )
}

export default Button

