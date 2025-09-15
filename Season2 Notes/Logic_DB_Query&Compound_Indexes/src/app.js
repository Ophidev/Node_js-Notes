const connectDB = require("./config/database");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json()); 
app.use(cookieParser()); 

const authRouter = require("../src/routes/authRouter");
const userRouter = require("../src/routes/userRouter");
const profileRouter = require("../src/routes/profileRouter");


app.use('/',authRouter);
app.use('/',userRouter);
app.use('/',profileRouter);

//so, suppose now if I call GET/profile api then our Express will first run 
// app.use(express.json()) & app.use(cookieParser());
//then app.use('/',authRouter) then app.use('/'userRouter) then 
// then app.use('/',profileRouter) -> and here Express will get /profile and then send response.

//same for the other the above steps will be repeated 
//after one response express will not go through another route it will finsed their only.

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
