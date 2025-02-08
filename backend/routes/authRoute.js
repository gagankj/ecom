const express=require("express")
const router=express.Router()

const  {registerUser, loginUser, logoutUser, requestPasswordReset,resetPassword} =require ("../controllers/authController")


//when user register
router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.post("/forgot-password",requestPasswordReset);
router.post("reset-password/:token",resetPassword)

module.exports= router;




