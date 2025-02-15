import React from 'react'
import {useSelector} from "react-redux";

const Account = () => {
  const userName=useSelector((state)=>state.auth.user.name) || "user Name"
  const userEmail=useSelector((state)=>state.auth.user.email) || "User email"
  const avatar=useSelector((state)=>state.auth.avatar)

  // console.log(avatar)
  return (
    <div className='py-10 flex flex-col items-center'>
      <h1 className='text-5xl tracking-tight mb-6 font-bold'>My Account</h1>
      <div className='border w-18 h-18 border-zinc-200 my-2 rounded-full'>
        <img src={avatar} className='rounded-full' alt="user profile" />
      </div>
      <div className='flex items-center gap-4 mt-6 '>

  
      <h1 className='text-zinc-800 py-2 px-6 font-semibold '>Name</h1>
      <h1 className='text-zinc-600 bg-zinc-50 py-2 px-6 border-zinc-300 w-72 rounded-lg border'>{userName}</h1>
      </div>
      <div className='flex gap-4 items-center mt-6 '>

  
      <h1 className='text-zinc-800 py-2 px-6 font-semibold '>Email</h1>
      <h1 className='text-zinc-600 bg-zinc-50 py-2 px-6 border-zinc-300 w-72 rounded-lg border'>{userEmail}</h1>
      </div>

  
      

    </div>
  )
}

export default Account