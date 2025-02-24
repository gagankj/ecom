import { useState } from "react";
import { NavLink } from "react-router-dom";

const ProductCard = ({ prod }) => {
  const [imageIndex, setImageIndex] = useState(0);

  // Extract price values
  const originalPrice = prod.variants[0]?.variants[0]?.price || 0;
  const discountPrice = prod.variants[0]?.variants[0]?.discountPrice || 0;

  // Calculate discount percentage
  const discountPercent =
    originalPrice > 0 ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100) : 0;

  return (
    <div className="w-80 p-4  relative">
      <NavLink to={`/product/${prod._id}`} className="relative block">
        {/* Product Image */}
        <img
          onMouseEnter={() => setImageIndex(1)}
          onMouseLeave={() => setImageIndex(0)}
          src={prod.variants[0]?.variants[0]?.images[imageIndex]}
          alt={prod.name}
          className="  rounded-md"
        />

        {/* Ratings Badge (Bottom Left) */}
        {prod.ratings > 0 ?(

          <div className="absolute bottom-2 left-2 bg-zinc-100  text-xs px-2 py-1 rounded-full flex  items-center gap-1">
          ⭐ {prod.ratings || 0} 
        </div>
        ):(
          <></>
        )}
      </NavLink>

      <h1 className="font-bold mt-4">{prod.brand}</h1>
      <h1>{prod.name}</h1>

      {/* Price & Discount Section */}
      <div className="flex items-center gap-2 mt-2">
        <h1 className="text-xl font-bold ">&#x20B9; {discountPrice}</h1>
        <h1 className="text-sm text-gray-500 line-through">&#x20B9; {originalPrice}</h1>
        {discountPercent > 0 && (
          <span className=" text-green-500 font-bold text-xs px-2 py-1 rounded">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-between items-center mt-4">
        <button className="bg-black text-white px-4 py-2 rounded-md w-1/2">
          Add to Cart
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded-md w-1/2">
          Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
