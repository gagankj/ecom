import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../store/Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { SERVER_API } from '../../config';

const AdminNavbar = () => {
    
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log(isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await axios.post(`${SERVER_API}/api/auth/logout`, {}, { withCredentials: true });
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

    

        

    return (
        <>
            

            <div className='w-52 fixed flex flex-col  items-center text-zinc-400 text-xl bg-zinc-900 h-screen '>
                
                    <NavLink to="/admin-dashboard" className='font-bold text-5xl bg-gradient-to-tl from-zinc-700 tracking-tight to-zinc-300 text-transparent bg-clip-text text-center mt-4'>ADMIN PANEL</NavLink>
                <div className='flex flex-col  mt-4 gap-2 justify-between h-screen items-center p-10'>
                    <div className='flex w-52 justify-center px-4 gap-2 flex-col'>

                    <NavLink className={"hover:underline"} to="/admin-dashboard">Dashboard</NavLink>
                    <h1 className=''>---------------------------</h1>
                    <NavLink className={"hover:underline"} to="/admin-categories"> Categories</NavLink>
                    <NavLink className={"hover:underline"} to="/admin-products"> Products</NavLink>
                    <NavLink className={"hover:underline"} to="/admin-products-variants">Variants</NavLink>
                    <h1 className=''>---------------------------</h1>
                    <NavLink className={"hover:underline"} to="/admin-orders"> Orders</NavLink>
                    <NavLink className={"hover:underline"} to="/admin-users"> Users</NavLink>
                    <NavLink className={"hover:underline"} to="/admin-carousel">Home Carousels</NavLink>
                    <NavLink to="/admin-messages" className=" hover:underline cursor-pointer">Messages</NavLink>
                    </div>
                    <div className='flex flex-col gap-3 w-52 px-6'>

                    <NavLink to="/account" className=" flex text-blue-500 hover:text-blue-600 items-center gap-2 cursor-pointer"> <CgProfile className="inline" /> Account</NavLink>
                    <button onClick={handleLogout} className=" py-1   w-24  text-red-500 hover:text-red-600 cursor-pointer">Logout </button>
                    </div>
                </div>
                
            </div>
        </>
    );
};

export default AdminNavbar;
