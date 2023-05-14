const express = require("express");
const router = express();
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const notification = require("../controllers/notificationArray")



router.post("/save", notification.createNotificationArray );


//UPDATE
router.put("/update/:id",notification.updateNotificationArray)
// router.put("/updateNotificationId/:_id",notification.updateNotificationIdnotification)
// router.put("/updateUserId/:_id",notification.updateUserIdnotification)

router.put("/updates/:_id",notification.arr)




// Delete method
router.delete("/delete/:id",notification.deleteNotificationArray)

// get Product
router.get("/find/:id",notification.findNotificationArray)

// get  All Products
router.get("/list",notification.findAllNotificationArray)

module.exports = router;