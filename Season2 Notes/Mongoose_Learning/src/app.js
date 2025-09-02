const connectDB = require("./config/database");
const express = require("express");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    //creating a new instance of User model to store data
    firstName: "Aditya",
    lastName: "Bhatt",
    emailId: "Aditya@gmail.com",
    password: "Aditya@123",
  });
  try {
    await user.save(); //this will return an promise (in general all the mongoose function return promises)
    res.send("Data successfully send!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

/*Remember always give priority to connection of DB
  before the starting of Express server
  because see if in your apk the server start first
  and user is start requsting for services and your DB is not connected
  this is not good for your apk.
*/

connectDB()
  .then(() => {
    console.log("sucessfully connected to DB");

    app.listen("3737", () => {
      console.log("!Server Started at port number 3737");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!");
  });

//The above code is the good way to connect to database
//first db conection then express server startrted.
