const User=require("../models/user")

const getUsers=async(req,res)=>{
    try {
        const users=await User.find().sort({name:-1})
        res.json(users);
        
    } catch (error) {
        console.error(error);
        
    }

}

module.exports=getUsers