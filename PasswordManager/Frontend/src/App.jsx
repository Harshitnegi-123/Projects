import { useState } from 'react'
import Navbar from './Component/Navbar'
import Manager from './Component/Manager'
import './App.css'
import Footer from './Component/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  <Navbar/>
  <div className='min-h-screen flex flex-col bg-green-50 overflow-x-hidden'>
    <main className='flex-grow'>
  <Manager/>
    </main>
  <Footer/>
  </div>
    </>
  )
}

export default App
