const connectDB = require("./config/database");
const express = require("express");
const User = require("./models/user");

const app = express();

  app.use(express.json());//this use middleware will called for all the api call because not specified a route.
  //express.json is a middleware(method) used to read the josn format data passed into api body.

app.post("/signup", async (req, res) => {


  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save(); //this will return an promise (in general all the mongoose function return promises)
    res.send("Data successfully send!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});


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

