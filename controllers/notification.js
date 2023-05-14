const Notification = require("../models/Notification");



// CREATE
const createNotification = async(req,resp)=>{
    // const newProduct = new Product(req.body); // when we want we add everthing which is present in body
    const newNotification = new Notification({
        message:req.body.message,
        logo:req.file.path,
        status:req.body.status
    });

try {
    let data = await newNotification.save();
    resp.status(201).json({
        success:true,
        message:"Add notification successfully",
        data
    });
    
} catch (error) {
    resp.status(500).json(error)
}
}

//UPDATE
const updateNotification =  async (req, resp) => {

    try {
        let data = await Notification.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false });
        resp.status(201).json({
            success:true,
            message:"Update  notification successfully",
            data
        });
    } catch (error) {
        resp.status(500).json(error);


    }
}

// Delete method
const deleteNotification = async (req, resp) => {
    try {
        let data = await Notification.findByIdAndDelete(req.params.id);
        resp.status(201).json({
            success:true,
            message:"delete Notification successfully",
            data
        });
    } catch (error) {
        resp.status(500).json(error)
    }
}

// get Product
const findNotification = async (req, resp) => {
    try {
        
        // for only one user find method
        const notification = await Notification.findById(req.params.id);
        resp.status(201).json(notification);// right method
    } catch (error) {
        resp.status(500).json(error)
    }
}

// get  All Products
const findAllNotification =  async (req, resp) => {
    

    try {
       
    const notifications = await Notification.find();
    resp.status(201).json(notifications);
    
    }catch (error) {
        resp.status(500).json(error)
    }
}

module.exports = {
    createNotification,
    updateNotification,
    deleteNotification,
    findNotification,
    findAllNotification
}