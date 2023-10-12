const mongoose = require("mongoose");
require("dotenv").config();

// const connection = mongoose.connect(process.env.mongoDBUrl);

// Replace these with your actual MongoDB Atlas credentials and connection string
// const username = "port";
// const password = "Mail123456789";
// const dbName = "paint";

// const dbURI = `mongodb+srv://${username}:${password}@cluster-name.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// const connection = mongoose.connect(dbURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// module.exports = { connection };
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