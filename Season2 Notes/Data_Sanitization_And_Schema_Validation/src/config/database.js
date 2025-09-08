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
        "mongodb+srv://Mork37:Database%40Password@learningmongodb.zsgjihs.mongodb.net/DevTinder"
    );//connection string

//important information
/*
"mongodb+srv://Mork37:Database%40Password@learningmongodb.zsgjihs.mongodb.net/"-> this is connection string
 it is used to connect with the cluster now because we are not added a information of database here.

 so for existing database you can the database name at the end of connection string.
 and to create a new database at first you can add any name at the end of the connection string.

 "mongodb+srv://Mork37:Database%40Password@learningmongodb.zsgjihs.mongodb.net/NameOfDatabase"
*/

};

//as we know that at calling of connectDB method it will return us a promise.

module.exports = connectDB;



