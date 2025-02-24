import { useState,useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../../config";
import Select from "react-select";

const AdminProducts = () => {

  const [categories,setCategories]=useState([]);
  const fetchCategories=async()=>{
    try{

      const category=await axios.get(`${SERVER_API}/api/category/`);
      setCategories(category.data);
    } catch(error){
      console.error("error fetching categories",error)
    }
  }

  useEffect(()=>{

    fetchCategories();
    fetchProducts();
  },[])
  const [products,setProducts]=useState([])
  const fetchProducts=async ()=>{
      const res=await axios.get(`${SERVER_API}/api/product`);
      setProducts(res.data)

  }
  
  


  const [product, setProduct] = useState({
    name: "",
    brand: "",
    categories: [],
    description: "",
  });


  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };


  const handleCategoryChange = (selectedOptions) => {
    setProduct({ ...product, categories: selectedOptions.map(option => option.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await axios.post(`${SERVER_API}/api/product/add-product`,product);

      fetchCategories()
    } catch(error){
      console.error("error",error)
    }

  };

  // Convert categories into react-select format
  const categoryOptions = categories.map((category) => ({
    value: category._id,
    label: category.name,
  }));

  return (

    <div className="ml-52 p-10">
      <h1 className="text-4xl font-bold tracking-tight">Add Products</h1>
      <form onSubmit={handleSubmit} className="flex bg-zinc-50 p-6 flex-col">
        <input className="border bg-white border-zinc-200 my-2 p-2 rounded-md" type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
        <input className="border bg-white border-zinc-200 my-2 p-2 rounded-md" type="text" name="brand" placeholder="Brand" onChange={handleChange} required />
        <textarea className="border bg-white border-zinc-200 my-2 p-2 rounded-md" name="description" placeholder="Description" onChange={handleChange} required />
        
        {/* <h1 className="text-xl text-zinc-700 font-bold tracking-tight mt-6">Select Categories</h1> */}
        <Select
          isMulti
          options={categoryOptions}
          value={categoryOptions.filter(option => product.categories.includes(option.value))}
          onChange={handleCategoryChange}
          className="my-4"
          placeholder="select Categories"
          styles={{
            control: (base) => ({ ...base, backgroundColor: "white", borderColor: "#ccc" }),
            menu: (base) => ({ ...base, backgroundColor: "white" }),
            option: (base, { isFocused }) => ({
              ...base,
              backgroundColor: isFocused ? "#f1f1f1" : "white",
              color: "black",
            }),
          }}
        />

        <button type="submit" className="bg-blue-500 p-2 rounded-md text-white hover:bg-blue-600 w-40 w cursor-pointer">Add</button>
      </form>

      <h1 className="text-3xl my-4 font-bold tracking-tight">Manage Products</h1>
      <div className="grid grid-cols-2 gap-4">

      {products.map((prod)=>(
        <div className="border p-2" key={prod._id}>
          <h1>{prod.name}</h1>
          <h1>{prod.brand}</h1>
          <h1>{prod.categories[0].name}</h1>
          <button >Delete</button>
        </div>
      ))}
      </div>
      
    </div>
  );
};

export default AdminProducts;

