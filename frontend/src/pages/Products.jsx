import { useEffect, useState } from "react";
import ProductCard from "../components/Products/ProductCard";
import { SERVER_API } from "../config";
import axios from "axios";
import Sidebar from "../components/Products/Sidebar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ category: "", priceRange: 50000 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${SERVER_API}/api/product`);
      setProducts(res.data);
      setFilteredProducts(res.data); // Set initially filtered products same as all products
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  
    const selectedCategory = newFilters.category?.trim().toLowerCase() || "";
  
    const filtered = products.filter((prod) => {
      // Convert all product category names to lowercase for comparison
      const productCategories = prod.categories.map(cat => cat.name.trim().toLowerCase());
  
      console.log("Filtering for category:", selectedCategory);
      console.log("Product categories:", productCategories);
  
      // Check if the selected category exists in the product's categories
      const matchesCategory = selectedCategory ? productCategories.includes(selectedCategory) : true;
  
      const matchesPrice =
      prod.variants[0]?.variants[0]?.discountPrice <= newFilters.priceRange;

    return matchesCategory && matchesPrice;
    });
  
    console.log("Filtered Products:", filtered); // Debugging
    setFilteredProducts(filtered);
  };
  
  

  return (
    <div className="flex">
      {/* Sidebar (Sticky for better behavior) */}
      <div className="w-64  sticky top-0 h-screen ">
        <Sidebar onFilterChange={handleFilterChange} />
      </div>

      {/* Main Content */}
      <div className="mx-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 w-full">
        {filteredProducts.map((prod) => (
          <ProductCard key={prod._id} prod={prod} />
        ))}
      </div>
    </div>
  );
};

export default Products;
