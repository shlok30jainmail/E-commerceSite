const express = require("express");
const router = express();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const user = require("../controllers/user");

//UPDATE
router.put("/userUpdate/:id", verifyToken, verifyTokenAndAuthorization, user.upadteUser );

// Delete method
router.delete("/userDelete/:id",verifyToken, verifyTokenAndAuthorization,user.deleteUser);


// GET USER
router.get("/find/:id", verifyTokenAndAdmin, user.findUser);


// get  all USER
router.get("/list", verifyTokenAndAdmin, user.findAllUser);

//  Get user stats
router.get("/stats", verifyTokenAndAdmin, user.userstats);

module.exports = router;