import './styles.css'

function Button({ text }) {

    return (
        <>
            <div className="w-full h-full mt-2 bg-pwblue rounded-full shadow-2xl flex items-center justify-center py-3 px-40
				            hover:bg-[#3DAEF9] hover:shadow-3xl hover:scale-105
				            active:bg-[#3B82F6] active:scale-95 active:shadow-md transition-all duration-300">
                <h1 className="text-shadow text-4xl font-bold text-[#F3F4F6]">{text}</h1>
            </div>
        </>
    )
}

export default Button

