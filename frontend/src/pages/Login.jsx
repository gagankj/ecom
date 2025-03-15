import { useState, React, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import {login} from "../store/Slices/authSlice"
import { SERVER_API } from "../config";
import { setCart } from "../store/Slices/cartSlice";

const Login = () => {

  const dispatch=useDispatch();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${SERVER_API}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      const user=response.data.user
      if(response.status===201){
        dispatch(login({user}));
      
      }

      
      toast.success("Login Successful!", {
        position: "top-right",
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      console.log("Login Success:", response.data);
      
      setTimeout(()=>{
          if(user.role==="admin"){
            navigate("/admin-dashboard")
          } else {
            navigate("/");
          } 
        },2000)


        } 

    catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Login failed!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  
  
  
  return (
    <div className="flex flex-col justify-center items-center py-20">
      <h1 className="text-4xl font-bold tracking-tight ">Login to CAV</h1>
      <h1 className="text-zinc-600">Enter your details below</h1>

      <form
        onSubmit={handleSubmit}
        className="flex gap-4 w-96 px-10 py-4 rounded-lg flex-col items-center justify-center"
      >
        

        <input
          name="email"
          onChange={handleChange}
          required
          className="outline-none px-4 py-1 rounded-md bg-zinc-100 w-96"
          placeholder="Enter Email"
          type="email"
        />

        <input
          name="password"
          onChange={handleChange}
          required
          className="outline-none px-4 py-1 rounded-md bg-zinc-100 w-96"
          placeholder="Password"
          type="password"
        />

        <button
          type="submit"
          className="w-96 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-1 rounded-md"
        >
          Login
        </button>
      </form>
      
      <NavLink className={"text-red-500"} to="/request-reset-link">Forgot Password?</NavLink>

      <ToastContainer /> {/* Keep ToastContainer for global toasts */}
      <div className="flex gap-4 mt-4">

      <h1 >Don&apos;t have an account?</h1>
      <NavLink className={"text-red-500"} to={"/register"}>
        Register
      </NavLink>
      </div>
    </div>
  );
};

export default Login;
