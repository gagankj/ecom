const express=require("express")
const category=require("../models/category");
const router=express.Router();

router.post("/add",async(req,res)=>{
    const {name,description}=req.body;
    const existingCategory=await category.findOne({name});
    if(existingCategory){
        return res.status(400).json({message:"Category already exists."});
    }
    
    // create a new category instance
    const newCategory=new category({
        name,
        description,
    })
    try{

        await newCategory.save();
        res.status(201).json({message:"Category addded sucessfully."});

        
    } catch(error){
        res.status(500).json({error:error.message})
    }
})


router.get("/",async(req,res)=>{
    try{
        const categories=await category.find();
        res.status(200).json(categories);

    } catch(error){
        res.status(500).json({message:"error fetching categories",error:error.message});

    }
})


router.delete("/delete/:id",async(req,res)=>{
    try {
        const categoryId=req.params.id;
        const cat=await category.findByIdAndDelete(categoryId);
        if(!cat){
            return res.status(404).json({message:"category not found"})

        }

        res.status(200).json({message:"Category deleted successfully"});
        
    } catch (error) {
        res.status(500).json({message:"Error deleting category",error});
        
    }
})

module.exports=router;