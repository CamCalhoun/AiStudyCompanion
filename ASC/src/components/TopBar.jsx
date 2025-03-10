import NavBar from "./NavBar"
function TopBar({ title }) {
    return (
        <div className="sticky top-0 z-10">
            {/* White bar */}
            <div className="bg-bgwhite p-1 flex h-24 items-center justify-between text-4xl font-semibold">
                <h1 className="w-1/3">
                    <span className="text-shadow text-pwblue">AI Study</span>
                    <span className="text-shadow text-pwred"> Companion</span>
                </h1>
                <h1 className="text-pwblue w-1/3 text-center">{title}</h1>
                <div className="w-1/3">
                    <img src="pennwest-california.png" className="h-30 ml-auto" />
                </div>
            </div>

            {/* Blue bar */}
            <NavBar />
        </div>
    )
}

export default TopBar
