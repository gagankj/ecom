import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux"
const NotFound = () => {
    const role=useSelector((state)=>state.auth.role)
    let link;
    if(role=="admin"){
        link="/admin-dashboard"
    } else {
        link="/"

    }
  return (

    <div className='py-20 flex flex-col items-center'>
        <h1 className='text-blue-500 text-8xl font-bold tracking-tight'>OOPS!!</h1>
        <h1 className='text-blue-500 text-5xl  tracking-tight'>Page not Found!!</h1>
        <Link to={link} className='text-red-500 text-xl mt-4 tracking-tight'>Go Back Home</Link>
        
    </div>
  )
}

export default NotFound