import { useState } from 'react'

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')

  const fetchweather = async () => {
    if (!city) return; // agar input blank hai to kuch mat karo
    const apikey = "59f32c1955d373e3b3f706de23269382"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=59f32c1955d373e3b3f706de23269382&units=metric`
    
    setLoading(true); // Start loading
    setError(''); // Reset error

    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      // cod mtlb code or 200 se check krna mtlb ok check kre hai ki agar okay nhi h to error do ni to setweather me data update krdo
      if (data.cod !== 200) {
        setError('City Not Found')
        setWeather(null)
      } else {
        setWeather(data)
      }
    } catch {
      setError('Something went wrong!');
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <div className='flex bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 flex-col justify-center items-center min-h-screen space-y-6'>
        <h1 className='text-5xl font-extrabold text-white mb-5 drop-shadow-lg'>Weather App</h1>

        <div className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-md'>
          <input type="text" placeholder='Enter City Name' value={city} onChange={(e) => setCity(e.target.value)} className='px-4 py-2 rounded-lg text-black border-none outline-none focus:ring-2 focus:ring-blue-900' />
          <button onClick={fetchweather} className='px-6 py-2 bg-white font-bold rounded-lg text-blue-600 hover:bg-gray-200 transition-all disabled:opacity-50 shadow-md '>{loading?'Searching' : 'Search'}</button>
        </div>
      </div>

      {error && (
          <p className="text-red-600 font-semibold bg-white px-4 py-2 rounded-md shadow-md">{error}</p>
        )}
        
      {weather && weather.main && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
          <h2 className="text-3xl font-bold mb-2">{weather.name}</h2>
          <p className="text-xl capitalize mb-2">{weather.weather[0].description}</p>
          <p className="text-2xl font-semibold">{weather.main.temp}°C</p>
        </div>
      )}
    </>
  )
}

export default App
