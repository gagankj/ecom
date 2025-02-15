import React,{useState} from 'react'
import contact from "../assets/contactUs.jpg"
import { SERVER_API } from '../config'
import {toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    message:""
  })

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      const response=await fetch(`${SERVER_API}/api/contact`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData),
      })
      if(response.ok){
        toast.success("Message sent Successfully!", {
                position: "top-right",
                autoClose: 3000, // Close after 3 seconds
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              setFormData({
                name:"",
                email:"",
                message:"",
              })
      } else{
        toast.error("Error sending message!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
        
      })
      
    } 
  }
    catch (error) {
    console.error("Error: ",error);
      
    }

  };

  return (
    <div className="my-10 px-32" >

      <h1 className='text-5xl py-12 font-bold tracking-tight text-center '>Contact Us</h1>

      <div className='flex justify-around '>
          <img src={contact} className='w-[500px] rounded-lg h-[600px] ' alt="" />

          <form onSubmit={handleSubmit} className='w-[500px] h-[600px] flex flex-col p-10 frounded-lg border-zinc-200 border ' >

            <label className='text-2xl' htmlFor="name">Name</label>
            <input required onChange={handleChange} id='name' name='name' className='bg-zinc-50 rounded-lg px-4 py-1 outline-none mt-4 mb-8 ' type="text" placeholder='Enter your Name' />

            <label className='text-2xl' htmlFor="email">Email</label>
            <input required onChange={handleChange} id='email' name='email' className='bg-zinc-50 rounded-lg px-4 py-1 outline-none mt-4 mb-8 ' type="email" placeholder='Enter your email' />

            <label className='text-2xl' htmlFor="message">Message</label>
            <textarea required onChange={handleChange} htmlFor="message" name='message' className='bg-zinc-50 rounded-lg px-4 py-1 outline-none mt-4 mb-8 ' placeholder='Ask us anything...' />
            
            <button className='bg-blue-500 hover:bg-blue-600 rounded-lg px-4 py-1 cursor-pointer text-white'>Submit</button>
          </form>

          
      

      </div>
      <ToastContainer/>

    </div>
  )
};

export default Contact