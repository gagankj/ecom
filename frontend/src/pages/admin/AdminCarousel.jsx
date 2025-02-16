import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../../config";

const Admin = () => {
    const [carousels, setCarousels] = useState([]);
    const [formData, setFormData] = useState({
        heading: "",
        subheading: "",
        title: "",
        buttonText: "",
        buttonLink: "",
        bgColor: "#ffffff",
        headingColor: "#000000",
        subheadingColor: "#000000",
        titleColor: "#000000",
        buttonBgColor: "#ff0000",
        buttonTextColor: "#ffffff",
        image: null,
    });

    // Fetch all carousels
    useEffect(() => {
        axios.get(`${SERVER_API}/api/carousel`).then((res) => setCarousels(res.data));
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Submit the new carousel
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => data.append(key, formData[key]));

        await axios.post(`${SERVER_API}/api/carousel/add`, data);
        alert("Carousel Added!");
        window.location.reload();
    };

    // Delete a carousel
    const handleDelete = async (id) => {
        await axios.delete(`${SERVER_API}/api/carousel/${id}`);
        alert("Carousel Deleted!");
        window.location.reload();
    };

    return (
        <div className="p-10 ml-52">
            <h1 className="text-3xl font-bold mb-5">Manage Carousels</h1>

            {/* Form to Add New Carousel */}
            <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" name="heading" placeholder="Heading" className="border border-zinc-300 rounded-lg w-1/2 p-2 block" onChange={handleChange} required />
                <input type="text" name="subheading" placeholder="Subheading" className="border border-zinc-300 rounded-lg w-1/2 p-2 block" onChange={handleChange} required />
                <input type="text" name="title" placeholder="Title" className="border border-zinc-300 rounded-lg w-1/2 p-2 block" onChange={handleChange} required />
                <input type="text" name="buttonText" placeholder="Button Text" className="border border-zinc-300 rounded-lg w-1/2 p-2 block" onChange={handleChange} required />
                <input type="text" name="buttonLink" placeholder="Button Link" className="border border-zinc-300 rounded-lg w-1/2 p-2 block" onChange={handleChange} required />
                
                {/* Color Pickers */}
                <div className="flex gap-10 items-center space-x-4">
                    <div>
                        <label>Background Color</label>
                        <input type="color" name="bgColor" className=" ml-2 rounded-sm h-10 p-1 w-10" onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Heading Color</label>
                        <input type="color" name="headingColor" className=" ml-2 rounded-sm h-10 p-1 w-10" onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Subheading Color</label>
                        <input type="color" name="subheadingColor" className=" ml-2  rounded-sm h-10 p-1 w-10" onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Title Color</label>
                        <input type="color" name="titleColor" className=" ml-2  rounded-sm h-10 p-1 w-10" onChange={handleChange} required />
                    </div>
                </div>

                {/* Button Styling */}
                <div className="flex space-x-4">
                    <div>
                        <label>Button Background Color</label>
                        <input type="color" name="buttonBgColor" className=" ml-2  rounded-sm h-10 p-1 w-10" onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Button Text Color</label>
                        <input type="color" name="buttonTextColor" className=" ml-2  rounded-sm h-10 p-1 w-10" onChange={handleChange} required />
                    </div>
                </div>

                <input type="file"  name="image" className="border p-2 w-1/3 border-zinc-300 rounded-lg block" onChange={handleChange} required />

                <button type="submit" className="bg-blue-500 hover:bg-blue-600 rounded-md cursor-pointer text-white px-4 py-2">Add Carousel</button>
            </form>

            {/* List of Carousels */}
            <h2 className="text-3xl py-4 font-bold mt-10">Existing Carousels</h2>
            {carousels.map((carousel) => (
                <div key={carousel._id} className="p-4 border w-1/2 mb-6 rounded-md border-zinc-300 flex flex-col justify-between">
                    <span>{carousel.heading}</span>
                    <span>{carousel.subheading}</span>
                    <span>{carousel.title}</span>
                    <span className="text-zinc-400">{carousel.createdAt}</span>
                    <button onClick={() => handleDelete(carousel._id)} className="bg-red-500 mt-2 text-white w-24 px-4 py-1 rounded-md ">Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Admin;
