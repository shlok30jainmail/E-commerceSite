const mongoose = require('mongoose')
const { Schema } = mongoose

const itemSchema = Schema({
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },],
    quantity: {
        type: Number,
        default: 1
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    }
})

const orderSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [itemSchema],
//     items: [
//         {
//         type: Schema.Types.ObjectId,
//         ref: 'Item'
//     },
// ],

    address: {
        type:String
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Ordered', 'Out For Delivery', 'Delivered', 'Returned', 'Cancelled']
    },
    couponCode: String,
    orderDetails: {
        type:String
    },
    // reason: [String],
    transactionId: String
},
    { timestamps: true });

    const Item = mongoose.model("Item",itemSchema);
    const Order = mongoose.model("Order",orderSchema);

    module.exports = {
        Item,
        Order
    }

