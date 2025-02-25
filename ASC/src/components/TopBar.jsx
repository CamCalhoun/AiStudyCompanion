function TopBar({ title }) {
    return (
        <>
            {/* White bar (scrolls away) */}
            <div className="p-1 flex items-center justify-between text-8xl font-semibold">
                <h1>
                    <span className="text-shadow text-pwblue">AI Study</span>
                    <span className="text-shadow text-pwred"> Companion</span>
                </h1>
                <img src="pennwest-california.png" className="" />
            </div>

            {/* Blue bar (sticky at the top) */}
            <div className="px-1 py-9 flex items-center text-8xl font-semibold bg-pwblue sticky top-0 z-10">
                <h1 className="text-white">{title}</h1>
            </div>
        </>
    )
}

export default TopBar
