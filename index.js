const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Notification-Satya");
app.use(express.json());
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const notificationRoute = require("./routes/notification");
const notificationArrayRoute = require("./routes/notificationArray");






app.use("/api",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/products",productRoute);
app.use("/api/orders",orderRoute);
app.use("/api/notification",notificationRoute);
app.use("/api/notificationArray",notificationArrayRoute);











app.listen(3100, ()=>{
    console.log("Sever is running at 3100");
});