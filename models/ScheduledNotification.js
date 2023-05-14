const  mongoose = require('mongoose')
const schema = new mongoose.Schema({
    time:{
        type:String
    },
    days:{
        type:[],
    },
    notification:{
        type:{},
    },
});

const ScheduledNotification = mongoose.model('scheduledNotification',schema);
module.exports = ScheduledNotification;