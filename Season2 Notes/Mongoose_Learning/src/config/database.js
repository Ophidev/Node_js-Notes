//Now in this lecture I am learning about the mongoose library
/*
 -> Which is very famous to use the mongoDB database in node.js
 -> because it makes it very ease to do so.
 -> And the documentation of the mongoose library is so good.

 /First lets start with the conection of the DB
 ->go to the mongoose website 
 -> install mongoose in your terminal
  -`npm install mongoose`

*/


const mongoose = require("mongoose");

const connectDB = async () => {

    await mongoose.connect(
        "mongodb+srv://Mork37:Database%40Password@learningmongodb.zsgjihs.mongodb.net/"
    );//connection string

};

//as we know that at calling of connectDB method it will return us a promise.

module.exports = connectDB;



