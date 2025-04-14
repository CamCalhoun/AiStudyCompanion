import '../styles.css'

function Card({ text, className }) {

    return (
        <div className="w-[85%] h-[71.77%] px-8 py-50 bg-pwblue rounded-xl shadow-xl flex text-center items-center justify-center ">
            <h1 className="text-shadow text-4xl font-bold text-[#F3F4F6]">{text}</h1>
        </div>
    )
}

export default Card

