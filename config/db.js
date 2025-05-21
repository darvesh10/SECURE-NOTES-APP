const { log } = require("console");
const mongoose = require("mongoose");
const connectDB = async () => {
    try{
       await mongoose.connect(process.env.MONGODB_URI)
       console.log("")

    }
}