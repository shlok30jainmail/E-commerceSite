const express = require("express");
const router = express();
const auth = require("../controllers/auth");


// rgister route
router.post("/register", auth.registerAuth );


//  LOGIN route
router.post("/login",auth.loginAuth )




module.exports = router;
