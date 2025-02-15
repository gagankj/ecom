import React,{useState} from 'react'
import axios from "axios"
import { SERVER_API } from '../../config'

const AdminUsers = () => {
  const [users,setUsers]=useState([])

  const fetchUsers=async ()=>{
    try {
      const users=await axios.get(`${SERVER_API}/api/get-users`);
      setUsers(users.data)
    } catch (error) {
      console.error(error)
      
    }
  }
  fetchUsers()
  return (
    <div className='ml-52 px-10 py-4'>
      {users.length>0?(
        users.map((user)=>(
          <div key={user._id} className='bg-zinc-100 my-4 w-1/2  rounded-lg px-4 py-2'>
            
            <p className='font-bold text-zinc-800 text-lg'>{user.name}({user.role})</p>
            <p>{user.email}</p>
            
            <p className='text-zinc-500'>{new Date(user.createdAt).toLocaleString()}</p>
            <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg '>Delete</button>

          </div>
        ))
      ):(
        <p>no users</p>
      )}
    </div>
  )
}

export default AdminUsers