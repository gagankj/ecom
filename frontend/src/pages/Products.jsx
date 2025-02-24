import {useEffect, useState} from 'react'
import ProductCard from '../components/Products/ProductCard';
import { SERVER_API } from '../config';
import axios from "axios"

const Products = () => {

  const [products,setProducts]=useState([])
  useEffect(()=>{
    fetchProducts()
  },[])
  const fetchProducts=async()=>{
    try{
      const res= await axios.get(`${SERVER_API}/api/product`);
      setProducts(res.data);

    } catch(error){
      console.log(error)
    }
  }
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 '>

      {products.map((prod)=>(
        <ProductCard  key={prod._id} prod={prod} />
        
      ))}
      </div>
    </div>
  )
}

export default Products;