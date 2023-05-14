const { Item, Order } = require("../models/Order");
const { verifyAndAdmin } = require("../routes/verifyToken");
const User = require("../models/User")
const Notification = require("../models/Notification")
const NotificationArray = require("../models/NotificationArray")



// CREATE
const createItem = async (req, resp) => {
    // const newProduct = new Product(req.body); // when we want we add everthing which is present in body
    const newItem = new Item({
        product: [],
        quantity: req.body.qunatity,
        color: req.body.color,
        size: req.body.size
    });

    try {
        let data = await newItem.save();
        resp.status(201).json({
            success: true,
            message: "add item successfully",
            data
        });

    } catch (error) {
        resp.status(500).json(error)
    }
}

//UPDATE
const updateItem = async (req, resp) => {

    try {
        let data = await Item.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false });
        resp.status(201).json({
            success: true,
            message: "update item successfully",
            data
        });
    } catch (error) {
        resp.status(500).json(error);


    }
}
// updated Product Id in Item
const updateItemId = async (req, resp) => {

    try {
        let data = await Item.findByIdAndUpdate({ _id: req.params._id }, { $push: { product: req.body.productId } }, { new: true, useFindAndModify: false });
        resp.status(201).json({
            success: true,
            message: " Update product Id  successfully",
            data
        });
    } catch (error) {
        resp.status(500).json(error);


    }
}
// Delete method
const deleteItem = async (req, resp) => {
    try {
        let data = await Item.findByIdAndDelete(req.params.id);
        resp.status(201).json({
            success: true,
            message: "delete item successfully",
            data
        });
    } catch (error) {
        resp.status(500).json(error)
    }
}

// get Product
const findItem = async (req, resp) => {
    try {

        // for only one user find method
        const item = await Item.findById(req.params.id).populate('product');
        resp.status(201).json(item);// right method
    } catch (error) {
        resp.status(500).json(error)
    }
}

// get  All Products
const findAllItem = async (req, resp) => {

    try {

        const items = await Item.find().populate('product');
        resp.status(201).json(items);

    }


    catch (error) {
        resp.status(500).json(error)
    }
}

// Order Start Controllers


// CREATE
const createOrder = async (req, resp) => {
    // const newProduct = new Product(req.body); // when we want we add everthing which is present in body
    const newOrder = new Order({
        user: req.body.user,
        items: [],
        address: req.body.address,
        status: req.body.status,
        couponCode: req.body.couponCode,
        orderDetails: req.body.orderDetails,
        transactionId: req.body.transactionId


    });

    try {
        let data = await newOrder.save();
        resp.status(201).json({
            success: true,
            message: "Add Order successfully",
            data
        });

    } catch (error) {
        resp.status(500).json(error)
    }
}

//UPDATE
const updateOrder = async (req, resp) => {

    try {
        let data = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false });
        resp.status(201).json({
            success: true,
            message: "Update order successfully",
            data
        });
    } catch (error) {
        resp.status(500).json(error);


    }
}
// updated User Id in Order
const updateOrderUserId = async (req, resp) => {

    try {
        let data = await Order.findByIdAndUpdate({ _id: req.params._id }, { $push: { user: req.body.userId } }, { new: true, useFindAndModify: false });
        resp.status(201).json({
            success: true,
            message: "Update userId successfully",
            data
        });
    } catch (error) {
        resp.status(500).json(error);


    }
}

// updated item Id in Order
const updateOrderItemId = async (req, resp) => {

    try {
        let data = await Order.findByIdAndUpdate({ _id: req.params._id }, { $push: { items: req.body.itemId } }, { new: true, useFindAndModify: false });
        resp.status(201).json({
            success: true,
            message: "Update ItemId successfully",
            data
        });
    } catch (error) {
        resp.status(500).json(error);


    }
}
// Delete method
const deleteOrder = async (req, resp) => {
    try {
        let data = await Order.findByIdAndDelete(req.params.id);
        resp.status(201).json({
            success: true,
            message: "delete Order successfully",
            data
        });
    } catch (error) {
        resp.status(500).json(error)
    }
}

// get Product
const findOrder = async (req, resp) => {
    try {

        // for only one user find method
        const order = await Order.findById(req.params.id).populate('user items');
        resp.status(201).json(order);// right method
    } catch (error) {
        resp.status(500).json(error)
    }
}

// get  All Products
const findAllOrder = async (req, resp) => {

    try {

        const orders = await Order.find().populate('user items');
        resp.status(201).json(orders);

    }


    catch (error) {
        resp.status(500).json(error)
    }
}



// new making ---------------

const orderStatusUpdate = async (req, resp) => {
    // let find = await Order.findById(req.body._id);
    try {
        let data = await Order.findByIdAndUpdate({ _id: req.params._id }, { $set: { status: req.body.status } }, { new: true, useFindAndModify: false });
        let user = data.user;
        let username = await User.findById(user);
        let Admin = await User.findOne({isAdmin:true});
        let mainUser = username.username;
        // console.log()
        // let admin = await Order.find();

        // let AdminMain = {
        //     id: Admin._id
        // }

        // notification
         var notificationMsg = await Notification.findOne({status:req.body.status});
              

        
        if (username.isAdmin) {
            let notification = await Notification.find({status:req.body.status});
            notificationMsg = await Notification.updateOne({status:req.body.status}, { $set: { message: `${mainUser} Hi Sir your Id is ${user} Status is updated . Now Your Status is ${data.status}` } }, { new: true, useFindAndModify: false });
            let note = await NotificationArray.updateOne({userId:data.user}, { $push:{notification:notification}}, { new: true, useFindAndModify: false });
            // let note = await NotificationArray.find({userId:data.user});

            console.log(notification);

            // resp.status(201).json({
            //         success:true,
            //         message:"Update UserId successfully",
            //         note
            //     });

        } else {
            // console.log(`${mainUser} Hi Sir your Id is ${user} Status is updated . Now Your Status is ${data.status}`);
            
             notificationMsg = await Notification.updateOne({status:req.body.status}, { $set: { message:`${mainUser} Hi Sir your Id is ${user} Status is updated . Now Your Status is ${data.status}`} }, { new: true, useFindAndModify: false });
             notification = await Notification.find({status:req.body.status});

             note = await NotificationArray.updateOne({userId:data.user}, { $push:{notification:notification}}, { new: true, useFindAndModify: false });
            // console.log(notification);

        }


        if(orderStatusUpdate){
            if(Admin){
                // console.log(Admin);
                console.log();
                
             notificationMsg = await Notification.updateOne({status:req.body.status}, { $set: { message:`Hello Admin  This user ${mainUser} Which Id is ${user} Status is updated . Now Its Status is ${data.status}`} }, { new: true, useFindAndModify: false });
             notification = await Notification.find({status:req.body.status});
                note = await NotificationArray.updateOne({userId:Admin._id}, { $push:{notification:notification}}, { new: true, useFindAndModify: false });
                console.log(note);
    
            }
        }
        resp.status(201).json("successfully");
        
    } catch (error) {
        console.log(error);
    }

}


// end new making -------------
module.exports = {
    // item
    createItem,
    updateItem,
    deleteItem,
    findItem,
    findAllItem,
    updateItemId,
    // Order
    createOrder,
    updateOrder,
    deleteOrder,
    findOrder,
    findAllOrder,
    updateOrderUserId,
    updateOrderItemId,
    orderStatusUpdate
}