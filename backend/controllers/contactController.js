const  nodemailer = require("nodemailer")
const Contact=require("../models/contact")

const  contactController=async(req,res)=>{
    try {
        const {name,email,message}=req.body;

        // save to DB
        const newContact=new Contact({name,email,message});
        await newContact.save();

        //send mail
        const transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASSWORD,
            },
        });

        let mailOptions={
            from:process.env.EMAIL_USER,
            replyTo:email,
            to:"jhanjigagan@gmail.com",
            subject:"New Contact Form Submission.",
            text:`Name: ${name}\nEmail: ${email}\nMessage: ${message}`,

        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({message:"Message sent & saved successfully!"})
        
    } catch (error) {
        res.status(500).json({message:"Error submitting contact form.",error})
        
    }

}

const getMessages=async(req,res)=>{
    try {
        const contacts=await Contact.find().sort({createdAt:-1});
        res.status(200).json(contacts);

        
    } catch (error) {
        res.status(500).json({message:"Error fetching contact messages",error})
        
    }


}

module.exports = {
    contactController,
    getMessages
}