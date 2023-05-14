const express = require("express");
const router = express();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Item = require("../controllers/order");

router.post("/save", Item.createItem );


//UPDATE
router.put("/update/:id",Item.updateItem)
router.put("/updateId/:_id",Item.updateItemId)


// Delete method
router.delete("/delete/:id",Item.deleteItem)

// get Product
router.get("/find/:id",Item.findItem)

// get  All Products
router.get("/list", Item.findAllItem)




// Order controller Routes start-----------------------


router.post("/saveOrder", Item.createOrder );


//UPDATE
router.put("/updateOrder/:id",Item.updateOrder)
router.put("/updateItemId/:_id",Item.updateOrderItemId)
router.put("/updateUserId/:_id",Item.updateOrderUserId)
router.put("/updateStatus/:_id",Item.orderStatusUpdate)



// Delete method
router.delete("/deleteOrder/:id",Item.deleteOrder)

// get Product
router.get("/findOrder/:id",Item.findOrder)

// get  All Products
router.get("/listOrder", Item.findAllOrder)

module.exports = router;