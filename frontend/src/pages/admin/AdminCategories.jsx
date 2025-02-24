import {useState,useEffect} from 'react'
import axios from "axios";
import { SERVER_API } from '../../config';

const AdminCategories = () => {
  const [formData,setFormData]=useState({name:"",description:""});
  const [categories,setCategories]=useState([])

  // handle input change
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  // console.log(formData);


  // to fetch all the categories from backend
  const fetchCategories=async()=>{
    try{
      const res=await axios.get(`${SERVER_API}/api/category/`)
      setCategories(res.data);
    } catch(error){
      console.error("Error fetching categories:",error);
    }

  }

  useEffect(() => {
    fetchCategories();
  }, []);


  // to submit form and send data to backend
  const handleSubmit=async(e)=>{
      e.preventDefault();

      try{

        const res=await axios.post(`${SERVER_API}/api/category/add`,formData);
        setFormData({name:"",description:""});
        fetchCategories();
      } catch(error){
        console.log("Error adding category!");
      }


  }


  const handleDelete=async (id)=>{
    try {
      
      await axios.delete(`${SERVER_API}/api/category/delete/${id}`);
      fetchCategories();
    } catch (error) {
        console.log("Error deleting category!",error)
    }
    
  }

  return (
    <div className='ml-52 p-6 '>
      <h1 className='text-2xl my-2 font-bold tracking-tight'>Add Category</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' action="">
        <input value={formData.name} name='name' onChange={handleChange}    className='border border-zinc-200 rounded-md p-2' type="text" placeholder='Enter Category name' />
        <textarea value={formData.description} name='description' onChange={handleChange} className='border border-zinc-200 rounded-md p-2'  type="text" placeholder='Description' />
        <button type='submit' className='w-40 bg-blue-500 hover:bg-blue-600 p-1 rounded-md text-white cursor-pointer'>Add</button>
      </form>

      <h1 className='my-10 text-2xl font-bold tracking-tight'>Manage Categories</h1>
      <div className='grid grid-cols-3 gap-6'>

      { categories.length > 0 ?
      (
        categories.map((cat)=>(
          <div key={cat._id} className='border border-zinc-300 rounded-md flex flex-col items-start mt-6   p-2 '>
        <h1 className='text-2xl  tracking-tight text-zinc-700'>{cat.name}</h1> 
        <h1 className='text-zinc-400'>{cat.description}</h1>
        <button onClick={()=>handleDelete(cat._id)} className='bg-red-500 hover:bg-red-600 px-4 py-1 rounded-md text-white cursor-pointer my-1'>Delete</button>

       </div>
      ))
    ):(
      <p>No Categories found.</p>
    )
  }
  </div>



    </div>
  )
}

export default AdminCategories