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





const  Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;