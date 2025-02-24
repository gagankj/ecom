import {useState} from 'react'
import {NavLink} from "react-router-dom"
const ProductCard = ({prod}) => {
  const [imageIndex,setImageIndex]=useState(0);
  return (
    <>
        {/* <h1>Products</h1> */}
        <div className='w-80 p-4 rounded-md  border'>
            
            <NavLink to={`/product/${prod._id}`}>

            <img
            onMouseEnter={()=>setImageIndex(1)}
            onMouseLeave={()=> setImageIndex(0)}
            
            src={prod.variants[0]?.variants[0]?.images[imageIndex]} 
            alt=""
            className='rounded-md'
            />
            </NavLink>
            

            <h1 className='font-bold mt-4'>{prod.brand}</h1>
            <h1 className=''>{prod.name}</h1>
            <h1 className='inline text-xl font-bold'>&#x20B9; {prod.variants[0].variants[0].discountPrice}</h1>
            <h1 className='inline text-sm'>  MRP: <span className='text-zinc-500 line-through'>{prod.variants[0].variants[0].price}</span> </h1>
            <div className='flex gap-4 justify-center items-center'>

            <h1 className='bg-black px-4 text-white text-center py-1 rounded-sm mt-2'>Add to Cart</h1>
            <h1 className='bg-black px-4 text-white text-center py-1 rounded-sm mt-2'>Add to WIshlist</h1>
            </div>
            

        </div>
    
            </>
  )
}

export default ProductCard