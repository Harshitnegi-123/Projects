import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white overflow-hidden max-w-[100%]'>
            <div className=" mx-2 sm:mx-10 lg:mx-32 flex justify-between items-center px-2 p-6 h-10 ">

            <div className='logo font-bold text-2xl'>
                <span className='text-green-800'>&lt;</span>
                Yo
                <span className='text-green-800'>Pass/&gt;</span>
                </div>
            {/* <ul>
                <li className='flex gap-3'>
            <a className='hover:font-bold' href="/">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="/">Contact</a>
                </li>
            </ul> */}
            <button className='text-white font-bold flex justify-between bg-green-800 hover:bg-green-700 ring-1 ring-white items-center rounded-md w-26 mx-2 cursor-pointer'>
                <img className=' invert w-10 p-1 h-9' src="/github-mark.png" alt="" />
                <span className='font-bold px-2'>GitHub</span>
            </button>
            </div>
        </nav>
    )
}

export default Navbar
