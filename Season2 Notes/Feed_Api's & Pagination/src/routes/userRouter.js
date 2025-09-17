const express = require("express");
const userAuth = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();



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



//Now createing a GET/feed api to get all the user from the database by using the find() mongoose method
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    
    const loggedInUser = req.user;

    //now let's write the logic of the pagination
    const page = parseInt(req.query.page) || 1; //bydefault 1 if query not send 
    let limit = parseInt(req.query.limit) || 10; //bydefault 10 if query not send in the /feed route

    limit = limit > 50 ? 50 : limit; //if a client/user set limit more then 50 keep it 50 other wise the normal limit
                                     //because this can cost your DB, hang your DB if you have 1 lakh users and client want all at the time.

    const skip = (page-1)*limit; //formula to get the skip value so put in the skip() method

    // first get all the connectionRequests collection documents data where
    // fromUserId == loggedInUser._id or toUserId == loggedInUser._id

    const connectionRequests =  await ConnectionRequestModel.find({

      $or : [{fromUserId: loggedInUser._id},{toUserId: loggedInUser._id}],

    }).select("fromUserId toUserId"); // selector() method is just used to get specefic fields 


    //now after getting all the requestConnections collection documents of the loggedInUser

    const hideUsersFromFeed  = new Set(); //creation of Set dataStructure which will not allow duplicate data


    //adding all the connectionRequests data in the set so it will eliminate the duplicate id's
    connectionRequests.forEach((req) => {

        hideUsersFromFeed.add(req.fromUserId.toString()); //converting id's into string because their datatypes is moongose.types.object_id of
        hideUsersFromFeed.add(req.toUserId.toString());
    })


    //now fetching the users from DB-: 
    //1st conditon => which are not in hideUsersFromFeed set (users collection documents id's not in hideUsersFromFeed);
    //2st condition => the loggedInUser document data should not their (users collection document id not equals to loggedInUser._id);
    // 1st condition and 2nd condition will get us the feed users.

    const feedUsers = await User.find({

       $and: [
          {_id : {$nin : Array.from(hideUsersFromFeed)} },//$in is a array comparision operator so convertion set to array
          {_id : {$ne : loggedInUser._id} },
       ]
    })
    .select(USER_SAFE_DATA)
    .skip(skip)
    .limit(limit);

  
    res.send(feedUsers);
    
  } catch (err) {
    res.status(400).send(" ERROR : "+ err.message);
  }
});

module.exports = userRouter;  
