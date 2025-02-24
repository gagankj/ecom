const Product = require("../models/products")
const cloudinary=require("../config/cloudinary");
const Variant=require("../models/variant")
const Category =require("../models/category")
// upload images to cloudinary


// get products
const getProducts=async(req,res)=>{
    try {
        const product = await Product.find()
          .populate("categories")
          .populate("variants");
        if (!product) return res.status(404).json({ message: "Product not found" });
    
        res.json(product);
    } catch(err){
        res.status(500).json(err)
    }
};


// get product details
const getProductDetails = async (req, res) => {
    try {
        const response = await Product.findById(req.params.id)
            .populate("categories")
            .populate("variants");

        if (!response) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(response);
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


//create product

const createProduct=async(req,res)=>{
    try{
        const{name,brand,description,categories}=req.body;
        
        // create product
        const newProduct=new Product({
            name,
            brand,
            description,
            categories,
        });
        const savedProduct=await newProduct.save();

        // update the selected categories to include product ids
        await Category.updateMany(
            {_id:{$in:categories}},
            {$push:{products:savedProduct._id}}
        );



        res.status(201).json({message:"Product created successfully",productId:savedProduct._id});
    } catch(error){
        res.status(500).json({error:error.message});

    }
}


// upload images
const uploadImages=async(req,res)=>{
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }

        const imageUrls = await Promise.all(
            req.files.map(async (file) => {
                const result = await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream(
                        { resource_type: "image" },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result.secure_url);
                        }
                    ).end(file.buffer);
                });
                return result;
            })
        );

        res.json({ imageUrls });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: "Image upload failed" });
    }

}


//create variant
const createVariant=async (req,res)=>{
    try{
        const newVariant=new Variant(req.body);
        await newVariant.save();

        await Product.findByIdAndUpdate(
            req.body.productId,
            {$push:{variants:newVariant._id}},
            {new:true}
        )
        res.json(newVariant);

    } catch(error){
        res.status(500).json({error:"Error saving variant."})
    }
}




module.exports={createProduct,
                createVariant,
                uploadImages,
                getProducts,
                getProductDetails}