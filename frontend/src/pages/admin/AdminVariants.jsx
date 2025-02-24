import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../../config";

const AdminVariants = () => {
    const sizes = ["5", "6", "7", "8", "9", "10", "11", "12", "13", "14"];
    const [products, setProducts] = useState([]);
    const [variantForm, setVariantForm] = useState({
        productId: "",
        variants: [
            {
                color: "",
                size: "",
                price: Number(""),
                discountPrice: Number(""),
                stock: Number(""),
                sku: "",
                images: []
            }
        ]
    });
    console.log(variantForm)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${SERVER_API}/api/product/`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const addVariant = () => {
        setVariantForm({
            ...variantForm,
            variants: [
                ...variantForm.variants,
                {
                    color: "",
                    size: "",
                    price: Number(""),
                    discountPrice: Number(""),
                    stock: Number(""),
                    sku: "",
                    images: []
                }
            ]
        });
    };

    const removeVariant = (index) => {
        const updatedVariants = [...variantForm.variants];
        updatedVariants.splice(index, 1);
        setVariantForm({ ...variantForm, variants: updatedVariants });
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedVariants = [...variantForm.variants];
        updatedVariants[index][name] = value;
        setVariantForm({ ...variantForm, variants: updatedVariants });
    };

    const handleImageUpload = async (e, index) => {
        const files = e.target.files;
        const formData = new FormData();
        for (let file of files) {
            formData.append("images", file);
        }

        try {
            const response = await axios.post(`${SERVER_API}/api/product/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log(response.data.imageUrls)

            if (response.data.imageUrls && response.data.imageUrls.length > 0) {
                const updatedVariants = [...variantForm.variants];
                updatedVariants[index].images = response.data.imageUrls;
                setVariantForm({ ...variantForm, variants: updatedVariants });
            }
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${SERVER_API}/api/product/add-variant`, variantForm);
            console.log("Variant saved successfully:", response.data);
        } catch (error) {
            console.error("Error saving variant:", error);
        }
    };

    return (
        <div className="ml-52 p-6">
            <h1 className="text-2xl font-bold tracking-tight text-blue-700 bg-blue-100 px-4 py-1">
                Add Variants of Products
            </h1>
            <div className="bg-zinc-50 px-6 flex flex-col py-4">
                <form className="flex flex-col w-1/3" onSubmit={handleSubmit}>
                    <select
                        className="mx-4 border-2 rounded-md w-96 border-zinc-500 py-1 px-2 my-4"
                        onChange={(e) => setVariantForm({ ...variantForm, productId: e.target.value })}
                    >
                        <option value="">Select Product</option>
                        {products.map((product) => (
                            <option key={product._id} value={product._id}>
                                {product.name} ({product.brand})  ({product._id})
                            </option>
                        ))}
                    </select>

                    {variantForm.variants.map((variant, index) => (
                        <div key={index} className="flex bg-zinc-100 my-2 w-96 rounded-md flex-col border-zinc-300 p-4 border">
                            <input type="text" name="color" className="my-2 border-zinc-400 border py-1 px-2" placeholder="Color"
                                value={variant.color} onChange={(e) => handleChange(e, index)} />

                            <select name="size" className="border border-zinc-400 px-1 py-1 my-2" value={variant.size} onChange={(e) => handleChange(e, index)}>
                                {sizes.map((size, i) => <option key={i} value={size}>{size}</option>)}
                            </select>

                            <input type="text" name="sku" className="border my-2 border-zinc-400 px-2 py-1" placeholder="SKU" 
                                value={variant.sku} onChange={(e) => handleChange(e, index)} />

                            <input type="number" name="price" className="border my-2 border-zinc-400 px-2 py-1" placeholder="Price" 
                                value={variant.price} onChange={(e) => handleChange(e, index)} />

                            <input type="number" name="discountPrice" className="border my-2 border-zinc-400 px-2 py-1" placeholder="Discount Price" 
                                value={variant.discountPrice} onChange={(e) => handleChange(e, index)} />

                            <input type="number" name="stock" className="border my-2 border-zinc-400 px-2 py-1" placeholder="Stock" 
                                value={variant.stock} onChange={(e) => handleChange(e, index)} />

                            <input type="file" multiple className="border my-2 border-zinc-400 px-2 py-1" onChange={(e) => handleImageUpload(e, index)} />

                            <button type="button" onClick={() => removeVariant(index)} className="bg-red-100 w-20 text-red-600 text-center rounded-sm my-2 cursor-pointer hover:bg-red-200">
                                Remove
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={addVariant} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md my-4">
                        + Add Variant
                    </button>

                    <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md my-4">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminVariants;
