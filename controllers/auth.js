
const User = require("../models/User")
const jwt = require("jsonwebtoken");
const secretKey = "secretKey";




// register auth
// exports.registerAuth = async (req, resp) => {
    const registerAuth = async (req, resp) => {

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password


    });
    try {
        const data = await newUser.save();
        // console.log(savedUser);
        resp.status(201).json({
            success:true,
            message:"user registration successfully",
            data
        });

    } catch (error) {
        resp.status(501).json({
            success:false,
            // message:"user registration failed ",
            error
        });

        console.log(error.message);
    }
}

// login Auth

const loginAuth = async (req,resp)=>{
    try {
        const user = await User.findOne({username:req.body.username});
        const password = user.password;
        const username = user.username;
        !user && resp.status(401).json("Wrong credentials");
        password !== req.body.password && resp.status(401).json("Wrong credentials password");


        // Jwt token -
        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,
        },secretKey,{expiresIn:"3d"});

        // resp.status(201).json(user);
        // extra add 
        const{ppassword, ...others}= user._doc;
        // resp.status(201).json(others,accessToken);// wrong method ....yeese condition me object banaye
        resp.status(201).json({...others,accessToken});// right method

        
    } catch (error) {
        resp.status(500).json(error);

        console.log(error.message);
        
    }
}

module.exports = {
    registerAuth,
    loginAuth
}