const jwt = require("jsonwebtoken");
const secretKey = "secretKey";



const verifyToken = (req,resp,next)=>{
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,secretKey, (err,user)=>{
           if(err) resp.status(403).json("Token is not valid!");
        //    console.log(user);
           req.user = user;
           next()

        })
    }else{
        return resp.status(401).json("You are not authenticated");
    }
}

// verify this autherization for any profil updation
const verifyTokenAndAuthorization = (req,resp,next)=>{
    
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            resp.status(403).json("You are not allowed to do that");
        }
};


const verifyTokenAndAdmin = (req,resp,next)=>{
    verifyToken(req,resp,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            resp.status(403).json("You are not allowed to do that");
        }
    });
   
};

const verifyAndAdmin = (req,resp,next)=>{
    // verifyToken(req,resp,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            resp.status(403).json("You are not allowed to do that");
        }
    }
   
// };
module.exports = {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin, verifyAndAdmin};