const express = require("express");
const userAuth = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequestModel = require("../models/connectionRequest");

const requestRouter = express.Router();

// below api will be for status : ignored & interested
requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      //in this api only 2 status are allowed i.e "ignored" & "interested"

      const allowedStatus = ["ignored","interested"];

      if (!allowedStatus.includes(status)) {
        return res.status(404).json({ message: "Invalid Status!!!" });
      }

      //let's check that toUserId present in DB or not?
      
      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res.status(404).send("Invalid User!!");
      }

      //now checking weather that a person who recived the request is not sending the request to the same user.
      // basically checking weather the connection request exist or not

      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      //$or is a Mongodb query where I am using the or operation
      // basically checking fromUserId,toUserId presents or fromUserId:toUserId,toUserId:fromUserId presents

      if (existingConnectionRequest) {
        return res.status(404).send("Connection Request already Exists!!");
      }

      //Now before saving let also write logic for one more corner case ie. -:
      //IF a person sending connection request to itself
      //for that we will use the pre middleware or method given my the mongoose
      //which help us to write logic in it before the saving data in the database
      //for that go to the connectionRequest.js file where the connectionRequest Schema is created.

      //now creating the instance of the connectionRequestModel

      const connectionRequestInstance = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequestInstance.save();

      res.json({
        message:
          req.user.firstName +
          " send " +
          status +
          " status to : " +
          toUser.firstName,
        data: data,
      });
    } catch (err) {
      res.status(400).send("ERROR : " + err.message);
    }
  }
);

// below api will be for status : accepted & rejected
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      //Aditya => Ayush
      //logedInUser = toUserId
      //status = interested
      //req Id should be valid

      //getting the loggedInUser,status & requestId

      const loggedInUser = req.user; //provided by the userAuth
      const { status, requestId } = req.params;

      //in req.params allowed status should be [accepted || rejected]

      const allowedStatus = ["accepted", "rejected"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).send("!invalid status");
      }
     
      //now checking weather the connection_request is valid or not
      // means in the connectionRequests collection the document is valid with the below applied conditions

      const connectionRequest = await ConnectionRequestModel.findOne({

        //_id == requestID
        //toUserId == loggedInUser._id,
        //status == interested
        _id : requestId,
        toUserId : loggedInUser._id,
        status : "interested",

      });

      if(!connectionRequest){

        return res
                .status(400)
                .json({ message: "Connection request not found" });
      }

      //update the connectionRequest document status to current status accepted || rejected
    
       connectionRequest.status = status;

        
     // save to the DB
       const data = await connectionRequest.save();

       res.json({
         message: "connection Request " + status,
       
       });


    } catch (error) {
      res.status(401).send("ERROR : " + error.message);
    }
  }
);
module.exports = requestRouter;
