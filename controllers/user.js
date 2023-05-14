const User = require("../models/User");

//UPDATE
const upadteUser = async (req, resp) => {

    try {
        let data = await User.findByIdAndUpdate(req.params.id, { $set: { username: req.body.username } }, { new: true, useFindAndModify: false });
        // resp.status(200).json(updatedUser);
        resp.status(201).json({
            success:true,
            message:"user Update successfully",
            data
        });

    } catch (error) {
        resp.status(500).json(error);


    }
}

// Delete method
const deleteUser = async (req, resp) => {
    try {
        let data = await User.findByIdAndDelete(req.params.id);
        // resp.status(200).json(deletedUser);
        resp.status(201).json({
            success:true,
            message:"user delete successfully",
            data
        });

    } catch (error) {
        resp.status(500).json(error)
    }
}


// GET USER
const findUser = async (req, resp) => {
    
      try{

        // for only one user find method
        const user = await User.findById(req.params.id);
        const{ppassword, ...others}= user._doc;
        resp.status(201).json(others);// right method
    } catch (error) {
        resp.status(500).json(error)
    }
}


// get  all USER
const findAllUser = async (req, resp) => {
    const query = req.query.new;
    try {
        // for finding all user
        const users = query? await User.find().sort({_id:-1}).limit(1) : await User.find();
        resp.status(201).json(users);


    } catch (error) {
        resp.status(500).json(error)
    }
}

//  Get user stats
const userstats = async (req, resp) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
    try {
        
       // use aggregation 
       let  data = await User.aggregate([
        {$match: {createdAt:{$gte:lastYear}}},
        {
            $project:{
                month:{$month:"$createdAt"},
            },
        },
        {
            $group:{
                _id:"$month",
                total:{$sum:1}
            }
        }

       ])
       resp.status(201).json({
        success:true,
        message:"user states successfully",
        data
    });
    } catch (error) {
        resp.status(500).json(error)
    }
}

module.exports = {
    upadteUser,
    deleteUser,
    findUser,
    findAllUser,
    userstats
}