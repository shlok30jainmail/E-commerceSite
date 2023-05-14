const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    message:{
        type:String
    },
    logo:{
        type:String,
    },
    status:{
        type:String,
        default: 'Pending',
        enum: ['Pending', 'Ordered', 'Out For Delivery', 'Delivered', 'Returned', 'Cancelled']
    },
})


const notificationArrSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref: 'User'
    },
//     notification:[
//         {
//         type:mongoose.Types.ObjectId,
//         ref:'Notification'
//     },
// ],
notification:[notificationSchema],
   
})

const  NotificationArr = mongoose.model("NotificationArray", notificationArrSchema);

module.exports= NotificationArr;