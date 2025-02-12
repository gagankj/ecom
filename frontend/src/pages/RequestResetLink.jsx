import { useState, React } from "react";
import {forgotPassword} from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestResetLink = () => {
  const [email, setEmail] = useState("");
  const [message,setMessage]=useState("");

  const  resetpassword=async(e)=>{
    e.preventDefault();
    try{

      const {data} = await forgotPassword(email);
      setMessage(data.message);
      toast.success("Link has been sent.Check your Email", {
              position: "top-right",
              autoClose: 3000, // Close after 3 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });

    } catch(error){
      setMessage(error.response?.data?.messsage || "Something went wrong");
    }
      
    
  }

  return (
    <div className="flex flex-col justify-center items-center py-20">
      <h1 className="text-4xl font-bold tracking-tight ">Reset Your Password</h1>
      <h1 className="text-zinc-600">Enter your email below</h1>

      <form onSubmit={resetpassword}
        
        className="flex gap-4 w-96 px-10 py-4 rounded-lg flex-col items-center justify-center"
      >
        
        <input
          onChange={(e)=>{setEmail(e.target.value)}}
          name="email"
          required
          value={email}
          className="outline-none px-4 py-1 rounded-md bg-zinc-100 w-96"
          placeholder="Enter Email"
          type="email"
        />

        

        <button
          type="submit"
          className="w-96 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-1 rounded-md"
        >
          Send Reset Link
        </button>
      </form>
      
    <ToastContainer/>
    </div>
  );
};

export default RequestResetLink;
