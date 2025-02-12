import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../utils/api';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!newPassword.trim()) {
            setMessage("Password cannot be empty.");
            return;
        }

        try {
            const { data } = await resetPassword(token, newPassword);
            setMessage(data.message);
            toast.success("Password has been reset.Login with new password.", {
                    position: "top-right",
                    autoClose: 3000, // Close after 3 seconds
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    useEffect(() => {
        let timer;
        if (message === "Password updated successfully") {
            timer = setTimeout(() => navigate("/login"), 3000);
        }
        return () => clearTimeout(timer);
    }, [message, navigate]);

    return (
        <div className='py-20 flex flex-col items-center'>
            <h1 className='text-4xl font-bold tracking-tight'>Reset Password</h1>
            <p className='bg-green-100 text-green-500 my-2 px-4 py-1 rounded-lg'>Set new Password</p>
            <form onSubmit={handleSubmit} className='flex mt-6 w-80 flex-col gap-4'>
                <input 
                    type="password"
                    name='password'
                    placeholder='Enter new password'
                    className='border px-4 py-1 rounded-lg border-zinc-300 outline-none'
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button className='bg-orange-400 hover:bg-orange-500 cursor-pointer text-white px-4 py-1 rounded-lg' type='submit'>
                    Reset Password
                </button>
            </form>
            <ToastContainer/>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default ResetPassword;
