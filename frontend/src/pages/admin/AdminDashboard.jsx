import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
const AdminDashboard = () => {

  
    const dispatch=useDispatch();


  return (
    <>
    <div  className='ml-52 p-4   bg-zinc-100'>
      

      <li>total no of users.</li>
      <li>revenue</li>
      <li>stock</li>
      <li>product ranking</li>
      <li></li>

    </div>
    
    </>
  )
}

export default AdminDashboard