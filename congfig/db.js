const mongoose = require("mongoose");
require("dotenv").config();

const connection= async()=>{
  // await mongoose.connect(process.env.mongoDBUrl);

  // console.log("connection is done");
  try {
    const conn = await mongoose.connect(process.env.mongoDBUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = {
    connection 
}