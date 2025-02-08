import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
      <div className='w-screen h-72 bg-black flex justify-around py-10 gap-10 text-white'>
        <div>

        <h1 className='text-5xl font-bold tracking-tight'>Footer</h1>
        <h1>Subscribe</h1>
    
        </div>
        <div  className='flex flex-col'>
            <h1>Title</h1>
            <NavLink>sub title</NavLink>
            <NavLink>sub title</NavLink>
            <NavLink>sub title</NavLink>
            <NavLink>sub title</NavLink>
        </div>
        <div className='flex flex-col'>
            <h1>Title</h1>
            <NavLink>sub title</NavLink>
            <NavLink>sub title</NavLink>
            <NavLink>sub title</NavLink>
            <NavLink>sub title</NavLink>
        </div>
        <div className='flex flex-col'>
            <h1>Title</h1>
            <NavLink>sub title</NavLink>
            <NavLink>sub title</NavLink>
            <NavLink>sub title</NavLink>
            <NavLink>sub title</NavLink>
        </div>
        <div className='flex flex-col'>
            <h1>Title</h1>
            <NavLink>sub title</NavLink>
            <NavLink>sub title</NavLink>
            <NavLink>sub title</NavLink>
            <NavLink>sub title</NavLink>
        </div>


    </div>
  )
}

export default Footer