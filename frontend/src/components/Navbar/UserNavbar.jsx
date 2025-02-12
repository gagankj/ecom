import React, { useState, useEffect, useRef } from 'react';
import logo from "../../assets/logo.jpg";
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../store/Slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import { FaSearch, FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

const UserNavbar = () => {
    const [settings, setSettings] = useState(false);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log(isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Reference for detecting outside clicks

    async function handleLogout() {
        try {
            await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
            dispatch(logout());
            navigate("/login");
            setSettings(false);
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
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSettings(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className='w-screen flex items-center justify-center text-zinc-600 h-10 '>
                <h1>Summer Sale for Gaming Console Accessories and Free Express Delivery - <span className='text-green-500 font-bold'>OFF 50%!</span></h1>
            </div>

            <div className='w-screen flex justify-around items-center text-white text-xl bg-black h-20 border-b-1 border-zinc-300'>
                <NavLink to={"/home"} className='w-32 '>
                    <img src={logo} alt="Logo" />
                </NavLink>
                <div className='flex w-1/3 justify-between'>
                    <NavLink to="/home">Home</NavLink>
                    <NavLink to="/products">Products</NavLink>
                    <NavLink to="/categories">Categories</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='bg-white text-zinc-700 flex items-center px-4 py-1 rounded-lg'>
                        <input className='outline-none text-lg' placeholder='Search for items' type="text" />
                        <button>
                            <FaSearch />
                        </button>
                    </div>
                    {isAuthenticated ? (
                        <div className='flex gap-4 items-center'>
                            <NavLink to="/wishlist"><FaRegHeart /></NavLink>
                            <NavLink to="/cart"><BsCart3 /></NavLink>
                            <div className="relative mt-1" ref={dropdownRef}>
                                <button className='cursor-pointer' onClick={() => setSettings(!settings)}><IoSettingsOutline /></button>
                                {settings && (
                                    <div className="absolute  w-40 right-0 border border-zinc-300 top-10 bg-white text-sm text-zinc-800 rounded-lg shadow-lg">
                                        <ul className="py-2 flex flex-col  px-2">
                                            <NavLink to="/account" className="px-2 py-2 hover:underline cursor-pointer">Account</NavLink>
                                            <NavLink to="/orders" className="px-2 py-2 hover:underline cursor-pointer">Orders</NavLink>
                                            <button onClick={handleLogout} className=" py-2 mt-6 bg-red-500 rounded-lg text-white  hover:underline cursor-pointer">Logout</button>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <NavLink className="bg-white mr-4 text-black px-4 py-1 rounded-lg" to="/login">Login</NavLink>
                            <NavLink className="bg-blue-500 px-4 py-1 rounded-lg" to="/register">Register</NavLink>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserNavbar;
