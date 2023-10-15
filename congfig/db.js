const mongoose = require("mongoose");
require("dotenv").config();

const connection= async()=>{
  try {
    await mongoose.connect(process.env.mongoDBUrl);

    console.log("connection is done");
  
  } catch (error) {
    console.log(error.message)
  }
 
}
module.exports = {
    connection 
}