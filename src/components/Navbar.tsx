import React from 'react'
import { NavLink } from 'react-router-dom' 
import "tailwindcss";

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 space-around text-xl'>
       
            <NavLink to="/"> 
                Home
            </NavLink>
        
            <NavLink 
            to="/notes">
                Notes
            </NavLink>
       
    </div>
  )
}

export default Navbar
