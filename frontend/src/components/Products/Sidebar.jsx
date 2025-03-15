import axios from "axios";
import React, { useState, useEffect } from "react";
import { SERVER_API } from "../../config";

const Sidebar = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState(50000); // Default max price

  // Fetch categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${SERVER_API}/api/category`);
        setCategories(response.data); // No need for .json()
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange({ category: e.target.value, priceRange });
  };

  // Handle price range change
  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    setPriceRange(newPrice);
    onFilterChange({ category: selectedCategory, priceRange: newPrice });
  };

  return (
    <div className="w-64  p-4 bg-zinc-100 text-zinc-700 h-screen">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-sm mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 bg-white border   border-gray-600 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <label className="block text-sm mb-2">Price Range: ₹0 - ₹{priceRange}</label>
        <input
          type="range"
          min="0"
          max="50000"
          step="1000"
          value={priceRange}
          onChange={handlePriceChange}
          className="w-full  accent-blue-500 cursor-pointer"
        />
      </div>

      {/* Apply Button */}
      
    </div>
  );
};

export default Sidebar;
