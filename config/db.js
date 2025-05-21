const { log } = require("console");
const mongoose = require("mongoose");
const connectDB = async () => {
    try{
       await mongoose.connect(process.env.MONGODB_URI)
       console.log("mongodb connected sucessfully")
    } catch (err) {
 console.log(err,"connection failed");
    }
}
module.exports = connectDB;