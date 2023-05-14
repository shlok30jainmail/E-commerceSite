const express = require("express");
const router = express();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const product = require("../controllers/product");

const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../Image'));
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name)
    }
})
const upload = multer({storage:storage});

// CREATE
// router.post("/save", verifyTokenAndAdmin, product.createProduct );
router.post("/save",upload.single('image'), verifyTokenAndAdmin, product.createProduct );


//UPDATE
router.put("/update/:id", verifyTokenAndAdmin, product.updateProduct)

// Delete method
router.delete("/delete/:id", verifyTokenAndAdmin, product.deleteProduct)

// get Product
router.get("/find/:id", product.findProduct)

// get  All Products
router.get("/list", product.findAllProduct)

module.exports = router;