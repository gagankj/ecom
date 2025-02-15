const express=require("express")
const router=express.Router()
const {contactController,getMessages} =require("../controllers/contactController")

router.post("/contact",contactController)
router.get("/contacts",getMessages)

module.exports=router;