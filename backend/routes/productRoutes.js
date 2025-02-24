const express=require("express");
const {createProduct, createVariant,uploadImages, getProducts,getProductDetails}=require("../controllers/productController")
const upload=require("../middlewares/uploadMiddleware")
const router=express.Router();

router.post("/add-product",createProduct);
router.post("/add-variant",createVariant);
router.post("/upload",upload.array("images",10),uploadImages)
router.get("/",getProducts)
router.get("/:id",getProductDetails)

module.exports=router;