const User=require("../models/user")

const getUsers=async(req,res)=>{
    try {
        const users=await User.find().sort({name:-1})
        res.json(users);
        
    } catch (error) {
        console.error(error);
        
    }

}

const deleteUser=async(req,res)=>{
    try {
        
        await User.findOneAndDelete(req.params.id);
        res.json({message:"user deleted"})
    } catch (error) {
        res.json({message:error.message})
    }
}

module.exports={
    getUsers,
    deleteUser}