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
  <Manager/>
  <Footer/>
    </>
  )
}

export default App
