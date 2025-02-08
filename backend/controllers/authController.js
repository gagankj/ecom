const { FRONTEND_URL } = require("../config");
const bcrypt =require("bcryptjs") 
const User =require("../models/user") 
const nodemailer =require("nodemailer")
const generateToken=require("../utils/generateToken");
const crypto=require("crypto");

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD,
    },
})

//register user
const registerUser = async(req,res)=>{
    
    const {name,email,password}=req.body;

    try {

        // check if the user already exists
        const existingUser=await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User with this email already exists!"});
        }

        //create a new user
        const newUser=new User({
            name,
            email,
            password,
        })

        await newUser.save();

        const token=generateToken(newUser._id);

        res.cookie("authToken",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV==="production",
            sameSite:"Strict",
            maxAge:3600000,
        })

        res.status(201).json({
            message:"user registered successfully",
        })


        
    } catch (error) {
        res.status(500).json({
            message:"Error during registration",
            error:error.message,
        })
        
    }

}
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1️⃣ Find the user by email
        const user = await User.findOne({ email });

        // 2️⃣ Check if user exists before accessing `user.password`
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }

        // 3️⃣ Compare entered password with stored hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid Credentials." });
        }

        // 4️⃣ Generate a token
        const token = generateToken(user._id);

        // 5️⃣ Set cookie
        res.cookie("authToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 3600000,
        });

        res.status(201).json({
            message: "User logged in successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: "Error during login",
            error: error.message,
        });
    }
};


const logoutUser=async(req,res)=>{

    res.clearCookie("authToken", 
        { 
        httpOnly: true, 
        secure: process.env.NODE_ENV==="production", 
        sameSite: "Strict" 
        });
    res.json({ message: "Logged out successfully" });
}

const requestPasswordReset=async(req,res)=>{
    try{
        const {email}=req.body;
        console.log(email);
        const user= await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        // Generate a reset token and hashed token using crypto
        const resetToken=crypto.randomBytes(32).toString("hex");
        const hashedToken=crypto.createHash("sha256").update(resetToken).digest("hex");
        
        // Store hashed token and set expiration(10minutes)
        user.resetPasswordToken=hashedToken;
        user.resetPasswordExpires=Date.now() + 10 *60*1000; // 10 minutes

        await user.save();

        const resetLink=`${FRONTEND_URL}/reset-password/${resetToken}`
        console.log(resetLink);

        // send email with reset link
        await transporter.sendMail({
            from:process.env.EMAIL_USER,
            to:email,
            subject: "Password Reset Link",
            html:`<p>Click <a href="${resetLink}">here</a> to reset your password. It will expire in 10 mins.</p>`,
        });
        res.json({message:"Reset password link sent to your email."})
    }

    catch(err){
        res.status(500).json({message:"Server error",err})
        
    }

}

const resetPassword=async(req,res)=>{
    try{
        const {resetToken}=req.params;
        const {newPassword}=req.body;

        const decoded=jwt.verify(resetToken)

    }

    catch(err){
        console.log(err);
    }
}





module.exports={
    registerUser,
    loginUser,
    logoutUser,
    requestPasswordReset,
    resetPassword
    
}



