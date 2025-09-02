const connectDB = require("./config/database");
const express = require("express");

const app = express();

/*Remember always give priority to connection of DB
  before the starting of Express server
  because see if in your apk the server start first
  and user is start requsting for services and your DB is not connected
  this is not good for your apk.
*/

connectDB()
.then(() => {

   console.log("sucessfully connected to DB");

   app.listen("3737",()=>{
      console.log("!Server Started at port number 3737");
   })
})
.catch((err)=>{

   console.error("Database cannot be connected!");
})

//The above code is the good way to connect to database
//first db conection then express server startrted.