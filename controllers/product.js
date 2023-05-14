const Product = require("../models/Product");



// CREATE
const createProduct = async(req,resp)=>{
    // const newProduct = new Product(req.body); // when we want we add everthing which is present in body
    const newProduct = new Product({
        title:req.body.title,
        desc:req.body.desc,
        image:req.file.path,
        categories:req.body.categories,
        price:req.body.price
    });

try {
    let data = await newProduct.save();
    resp.status(201).json({
        success:true,
        message:" create product successfully",
        data
    });
    
} catch (error) {
    resp.status(500).json(error)
}
}

//UPDATE
const updateProduct =  async (req, resp) => {

    try {
        let data = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false });
        resp.status(201).json({
            success:true,
            message:"product Update successfully",
            data
        });
    } catch (error) {
        resp.status(500).json(error);


    }
}

// Delete method
const deleteProduct = async (req, resp) => {
    try {
        let data = await Product.findByIdAndDelete(req.params.id);
        resp.status(201).json({
            success:true,
            message:"delete product successfully",
            data
        });
    } catch (error) {
        resp.status(500).json(error)
    }
}

// get Product
const findProduct = async (req, resp) => {
    try {
        
        // for only one user find method
        let data = await Product.findById(req.params.id);
        resp.status(201).json({
            success:true,
            message:"find product successfully",
            data
        });    } catch (error) {
        resp.status(500).json(error)
    }
}

// get  All Products
const findAllProduct =  async (req, resp) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;

    try {
        let products;
        // for finding a product
  if(qNew){
    products = await Product.find().sort({createdAt:-1}).limit(5);
  }else if(qCategory){
    products = await Product.find({
        categories:{
            $in: [qCategory],
        },
    });
  }else{
    products = await Product.find();
  }

        resp.status(201).json(products);
    
    } catch (error) {
        resp.status(500).json(error)
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    findProduct,
    findAllProduct
}