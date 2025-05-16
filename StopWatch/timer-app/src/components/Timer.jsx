import { useEffect, useState } from "react";

function Timer(params) {
    const [isRunning, setisRunning] = useState(false)
    const [time, settime] = useState(0)
    const [intervalId, setIntervalId] = useState(null);

    const formatTime = (time) => {
        //         1 ghanta = 3600 seconds hota hai.

        // time / 3600 karne se kitne ghante hue woh pata chalega.

        // Math.floor ka matlab hai decimal hata do sirf poora number lo.

        // Example:

        // 3675 / 3600 = 1.0208, Math.floor(1.0208) = 1

        // → 1 ghanta hua.
        const hours = Math.floor(time / 3600)
        // time % 3600 ka matlab:

        // Pura ghanta hata ke bacha hua time nikal lo.

        // Example:

        // 3675 % 3600 = 75 seconds bache.

        // Ab bache hue seconds ko divide kar rahe hain 60 se:

        // 75 / 60 = 1.25, Math.floor(1.25) = 1

        // → 1 minute.
        const minutes = Math.floor((time % 3600) / 60)
        // Ab bacha hua seconds nikalne ke liye time % 60 karte hain.

        // Example:

        // 75 % 60 = 15

        // → 15 seconds.
        const seconds = Math.floor(time % 60)
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    useEffect(() => {
        if (isRunning) {
            const id = setInterval(() => {
                // Yeh prevTime wohi purana time hai jo abhi state ke andar pada hua hai.
                settime((prevTime) => prevTime + 1)
            }, 1000)
            setIntervalId(id)
        } else {
            clearInterval(intervalId)
        }
        // Jab component band ho ya useEffect dubara chale, tab purane interval ko hata dena.
        return () => clearInterval(intervalId)
    }, [isRunning])

    const handleStartPause = ()=>{
        setisRunning((prev) => !prev)
    }
    const handleReset = () => {
        setisRunning(false)
        settime(0)
    }
    const buttonText = isRunning ? "Pause" : "Start";
    const buttonColor = isRunning ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600";
    
    return (
        <div className="bg-gray-100 flex justify-center items-center min-h-screen flex-col">
            <h1 className="text-4xl font-bold mb-4">Timer App</h1>
            <div className="text-6xl font-mono mb-6">{formatTime(time)}</div>
            <div className="space-x-4">
                <button onClick={handleStartPause} className={`${buttonColor} text-white rounded py-2 px-4`}>{buttonText}</button>
                {/* <button onClick={handlePause} className="bg-yellow-500 hover:bg-yellow-600 text-white rounded py-2 px-4">Pause</button> */}
                <button onClick={handleReset} className="bg-red-500 hover:bg-red-600 text-white rounded py-2 px-4">Reset</button>
            </div>
        </div>
    )
}
export default Timer;