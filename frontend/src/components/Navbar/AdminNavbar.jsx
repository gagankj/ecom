import React, { useState, useEffect, useRef } from 'react';
import logo from "../../assets/logo.jpg";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../store/Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
const AdminNavbar = () => {
    
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log(isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
     // Reference for detecting outside clicks

    async function handleLogout() {
        try {
            await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
            dispatch(logout());
            navigate("/login");
            toast.success("Logout successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } catch (error) {
            console.log(error);
        }
    }

    // Close dropdown when clicking outside
    

        

    return (
        <>
            

            <div className='w-52 absolute flex flex-col  items-center text-zinc-400 text-xl bg-zinc-900 h-screen border-b-1 border-zinc-300'>
                <NavLink to={"/home"} className='w-32 '>
                    <img src={logo} alt="Logo" />
                </NavLink>
                    <h1 className='font-bold text-5xl text-center mt-4'>ADMIN PANEL</h1>
                <div className='flex flex-col  mt-4 gap-2 justify-between'>
                    <NavLink className={"hover:underline"} to="/admin-dashboard">Dashboard</NavLink>
                    <NavLink className={"hover:underline"} to="/admin-products">Manage Products</NavLink>
                    <NavLink className={"hover:underline"} to="/admin-categories">Manage Categories</NavLink>
                    <NavLink className={"hover:underline"} to="/admin-orders">Manage Orders</NavLink>
                    <NavLink className={"hover:underline"} to="/admin-users">Manage Users</NavLink>
                    <NavLink to="/admin-messages" className=" hover:underline cursor-pointer">Messages</NavLink>
                    <NavLink to="/account" className=" hover:underline cursor-pointer"> <CgProfile className="inline" /> Account</NavLink>
                    <button onClick={handleLogout} className=" py-1 w-20 mt-6 bg-red-500 rounded-lg text-white cursor-pointer">Logout</button>
                </div>
                
            </div>
        </>
    );
};

export default AdminNavbar;
