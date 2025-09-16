const express = require("express");
const userAuth = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const user = require("../models/user");

const userRouter = express.Router();

//Now createing a GET/feed api to get all the user from the database by using the find() mongoose method
userRouter.get("/feed", async (req, res) => {
  try {
    const user = await User.find({}); //pass empty to get all the documents
    res.send(user); //user will be array of objects.
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

userRouter.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const user = await User.findByIdAndDelete(userId);
    //or
    //const user = await User.findByIdAndDelete({_id:userId});
    res.send("Successfully Delted a user!");
  } catch (err) {
    res.status(400).send("Problem in the Delte api!");
  }
});

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    //getting the necessary fields only
    const connectionRequests = await ConnectionRequestModel.find({

      //connectionRequests.toUserId == loggedInUser._id
      //connectionRequestes.status == "Interested"
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);//populate only the necessary feilds of data
  //}).populate("fromUserId",["firstName","lastName"]);

    res.json({
      message: "Data fetched Successfully!",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});


userRouter.get("/user/connections", userAuth, async (req, res) => {

  const loggedInUser = req.user;

  //populate/getting the only USER_SAFE_DATA Fields where fromUserId == loggedInUser && status == "accepted",
  // OR populate toUserId == loggedInUser && status == "accepted",

  const connectionRequests = await ConnectionRequestModel.find({
    $or : [
       {fromUserId : loggedInUser._id, status : "accepted"},
       {toUserId : loggedInUser._id, status : "accepted"}
      ],
  })
  .populate("fromUserId",USER_SAFE_DATA)
  .populate("toUserId", USER_SAFE_DATA);


  const data = connectionRequests.map((row) => {

       if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        //as we know we can't compare mongoose id directly so we convert them into Strings.

          return row.toUserId;
       }

       //else row.toUserId === loggedInUser._id
       return row.fromUserId;
  });

  res.json({ data });

});

module.exports = userRouter;  
