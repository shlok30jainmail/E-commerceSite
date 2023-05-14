const NotificationArray = require("../models/NotificationArray");
const Notification = require("../models/Notification");
// making new route start ----------


const arr = async(req,resp)=>{
    try {
        let notification = await Notification.find({type:"Ordered"});
        console.log(notification);
                //    console.log(req,params._id);

    let data = await NotificationArray.findByIdAndUpdate({_id:req.params._id}, { $push:{notification}}, { new: true, useFindAndModify: false });
    resp.status(201).json({
            success:true,
            message:"Update UserId successfully",
            data
        });
        
    } catch (error) {
        
        resp.status(201).json(error);

        
    }
    
}




// end -------------


// CREATE
const createNotificationArray = async(req,resp)=>{
    // const newProduct = new Product(req.body); // when we want we add everthing which is present in body
    const newNotificationArray = new NotificationArray({
        userId:req.body.userId,
        notification:[]
    });

try {
    let data = await newNotificationArray.save();
    resp.status(201).json({
        success:true,
        message:"Create NotificationArray successfully",
        data
    });
    
} catch (error) {
    resp.status(500).json(error)
}
}

//UPDATE
const updateNotificationArray =  async (req, resp) => {

    try {
       let data = await NotificationArray.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false });
       resp.status(201).json({
        success:true,
        message:"Update NotificationArray successfully",
        data
    });
    } catch (error) {
        resp.status(500).json(error);


    }
}

// updated Product Id in User
// const updateUserIdnotification =  async (req, resp) => {

//     try {
//         let data = await NotificationArray.findByIdAndUpdate({_id:req.params._id}, { $push:{userId:req.body.userID}}, { new: true, useFindAndModify: false });
//         resp.status(201).json({
//             success:true,
//             message:"Update UserId successfully",
//             data
//         });
//     } catch (error) {
//         resp.status(500).json(error);


//     }
// }

// updated Product Id in notification
// const updateNotificationIdnotification =  async (req, resp) => {

//     try {
//         let data = await NotificationArray.findByIdAndUpdate({_id:req.params._id}, { $push:{notification:req.body.NotificationId}}, { new: true, useFindAndModify: false });
//         resp.status(201).json({
//             success:true,
//             message:"Update NotificationId successfully",
//             data
//         });
//     } catch (error) {
//         resp.status(500).json(error);


//     }
// }

// Delete method
const deleteNotificationArray = async (req, resp) => {
    try {
        let data = await NotificationArray.findByIdAndDelete(req.params.id);
        resp.status(201).json({
            success:true,
            message:"Delete NotificationArray successfully",
            data
        });
    } catch (error) {
        resp.status(500).json(error)
    }
}

// get Product
const findNotificationArray = async (req, resp) => {
    try {
        
        // for only one user find method
        const notificationArray = await NotificationArray.findById(req.params.id).populate('notification');
        resp.status(201).json(notificationArray);// right method
    } catch (error) {
        resp.status(500).json(error)
    }
}

// get  All notification
const findAllNotificationArray =  async (req, resp) => {
    

    try {
       
    const notificationsArray = await NotificationArray.find().populate('notification');
    resp.status(201).json(notificationsArray);
    
    }catch (error) {
        resp.status(500).json(error)
    }
}

module.exports = {
    createNotificationArray,
    updateNotificationArray,
    deleteNotificationArray,
    findNotificationArray,
    findAllNotificationArray,
    // updateNotificationIdnotification,
    // updateUserIdnotification,
    arr
}