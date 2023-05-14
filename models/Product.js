const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{ 
        type:String,
        required:true,
        unique:true
    },
    desc:{ 
        type:String,
        required:true
     
    },
    // image:{ 
    //     type:String,
    //     required:true
    // },
    image:[{ 
        type:String,
        required:true
    }],
    categories:{ 
        type:Array
    },
    price:{ 
        type:Number,
        required:true
    }
    
},
{timestamps: true}
)

const ProductModel = mongoose.model("Product",ProductSchema);
module.exports = ProductModel;