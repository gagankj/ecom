const express=require("express");
const multer=require("multer");
const cloudinary=require("../config/cloudinary")
const Carousel=require("../models/Carousel")

const router=express.Router();
const upload=multer({storage:multer.memoryStorage()});

//fetch all carousels
router.get("/",async(req,res)=>{
    try{
        const carousels=await Carousel.find();
        res.status(200).json(carousels);
    } catch(error){
        res.status(500).json({message:"Server error."})
    }
});

//add a new carousel

router.post("/add",upload.single("image"),async(req,res)=>{
    try{
        const{
            heading,
            subheading,
            title,
            buttonText,
            buttonLink,
            bgColor,
            headingColor,
            subheadingColor,
            titleColor,
            buttonBgColor,
            buttonTextColor,
        }=req.body;

        // upload image to cloudinary
        const result=await new Promise((resolve,reject)=>{
            const stream=cloudinary.uploader.upload_stream(
                {folder:"carousels"},
                (error,uploadedImage)=>{
                    if(error) reject(error);
                    else resolve(uploadedImage);
                }
            );
            stream.end(req.file.buffer);
        });

        // save carousel data to MongoDB
        const newCarousel=new Carousel({
            heading,
            subheading,
            title,
            buttonText,
            buttonLink,
            imageUrl:result.secure_url,
            bgColor,
            headingColor,
            subheadingColor,
            titleColor,
            buttonBgColor,
            buttonTextColor,

        });

        await newCarousel.save();
        res.status(201).json({message:"Carousel added successfully!"});


    } catch(error){
        res.status(500).json({message:"Server error."})
    }

});

// delete a carousel
router.delete("/:id",async (req,res)=>{
    try{
        await Carousel.findByIdAndDelete(req.params.id);
        res.json({message:"Carousel deleted"});
    } catch(err){
        res.status(500).json({message:err.message});
    }
});



module.exports=router;