const express=require("express")
const router=express.Router()
const {contactController,getMessages,deleteMessages} =require("../controllers/contactController")

router.post("/contact",contactController)
router.get("/contacts",getMessages)
router.delete("/contacts/:id",deleteMessages)
module.exports=router;