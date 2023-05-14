const express = require("express");
const router = express();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const notification = require("../controllers/notification");

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
router.post("/save",upload.single('logo'), notification.createNotification );
// router.post("/save", notification.createNotification );



//UPDATE
router.put("/update/:id", notification.updateNotification)

// Delete method
router.delete("/delete/:id", notification.deleteNotification)

// get Product
router.get("/find/:id", notification.findNotification)

// get  All Products
router.get("/list", notification.findAllNotification)

module.exports = router;