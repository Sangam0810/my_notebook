const mongoose = require("mongoose");
require('dotenv').config()

const mongodb = process.env.MONGODB_URL

const connectDB = ()=>{
    mongoose.connect(mongodb)
.then((result)=>{
    console.log("database connect");
}).catch((err)=>{
      console.log("connection error ", err);
})
}

module.exports = connectDB