import '../styles.css'

function Card({ text }) {

    return (
        <div className="w-[82.99%] h-[71.77%] py-50 bg-pwblue rounded-xl shadow-xl flex items-center justify-center py-3">
            <h1 className="text-shadow text-4xl font-bold text-[#F3F4F6]">{text}</h1>
        </div>
    )
}

export default Card

