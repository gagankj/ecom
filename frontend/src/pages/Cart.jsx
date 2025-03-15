import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../store/Slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login"); // Redirect to login if not logged in
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
        <div className="flex justify-between">
          <div className="w-1/2">
          <h1>Products</h1>
          {cartItems.map((item,index)=>(
            <h1 key={index}>{item.name}</h1>
          ))}
          
          </div>
          <div className="">
          {/* <h1>Products</h1> */}
          <h1>Price</h1>
          {cartItems.map((item,index)=>(
            <h1 key={index}>{item.name}</h1>
          ))}
          
          </div>
          <div className="">
          {/* <h1>Products</h1> */}
          <h1>Quantity</h1>
          {cartItems.map((item,index)=>(
            <h1 key={index}>{item.name}</h1>
          ))}
          
          </div>
          <div className="">
          {/* <h1>Products</h1> */}
          <h1>SubTotal</h1>
          {cartItems.map((item,index)=>(
            <h1 key={index}>{item.name}</h1>
          ))}
          
          </div>

        </div>

        
          </>
      )}

      {cartItems.length > 0 && (
        <button
          onClick={handleCheckout}
          className="mt-4 bg-zinc-800 text-zinc-200 px-4 py-2 rounded hover:bg-zinc-900"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
};

export default Cart;
