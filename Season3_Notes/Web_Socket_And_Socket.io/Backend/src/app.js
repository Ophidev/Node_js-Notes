const connectDB = require("./config/database");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const initializeSocket = require("./utils/socket.js");

require('dotenv').config();

require("./utils/cronjob");

const http = require("http");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("../src/routes/authRouter");
const userRouter = require("../src/routes/userRouter");
const profileRouter = require("../src/routes/profileRouter");
const requestRouter = require("../src/routes/requestRouter");

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


 const server = http.createServer(app);//creating server using http method 
 //and passing express server into it so it's work

 initializeSocket(server); //passing server to method to attach the socket with the http server

connectDB()
  .then(() => {
    console.log("sucessfully connected to DB");

    server.listen("3737", () => { //using server.listen over here so, it's work.
      console.log("!Server Started at port number 3737");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!");
  });
