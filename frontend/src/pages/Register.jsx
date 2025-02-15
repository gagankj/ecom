import { useState, React } from "react";
import {toast,ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SERVER_API } from "../config";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import {login} from "../store/Slices/authSlice"
const Register = () => {

  const dispatch=useDispatch();
  
  const [formData, setFormData] = useState({
    name: "",
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
        `${SERVER_API}/api/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true }
      );

      
      toast.success("Registration Successful!", {
        position: "top-right",
        autoClose: 3000, // Close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      const user=response.data.user
      if(response.status===201){
        dispatch(login({user}));
      }
      console.log("Registration Success:", response.data);
      

      
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error) {
      console.error(error);
      
      toast.error(error.response?.data?.message || "Registration failed!", {
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
      <h1 className="text-4xl font-bold tracking-tight ">Create an Account</h1>
      <h1 className="text-zinc-600">Enter your details below</h1>

      <form
        onSubmit={handleSubmit}
        className="flex gap-4 w-96 px-10 py-4 rounded-lg flex-col items-center justify-center"
      >
        <input
          name="name"
          onChange={handleChange}
          required
          className="outline-none px-4 py-1 rounded-md bg-zinc-100 w-96"
          placeholder="Enter Name"
          type="text"
        />

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
          placeholder="Set Password"
          type="password"
        />

        <button
          type="submit"
          className="w-96 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-1 rounded-md"
        >
          Create Account
        </button>
      </form>

        <ToastContainer/>
      <h1>Already have an account?</h1>
      <NavLink className={"text-red-500"} to={"/login"}>
        Log in
      </NavLink>
    </div>
  );
};

export default Register;
