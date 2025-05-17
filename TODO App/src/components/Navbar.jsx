import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between bg-slate-800 text-white py-3'>
            <div className="logo">
                <span className='font-bold mx-9'>iTask</span>
            </div>
            <ul className='flex gap-9 mx-14'>
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>Your Task</li>
            </ul>
        </nav>
    )
}

export default Navbar
