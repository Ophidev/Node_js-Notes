const express = require("express");

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


//now Creating a PATCH/user api to update a user by Id
//by using the method Model.findUserByIdAndUpdate().

userRouter.patch("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const newData = req.body;
    
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];

    const isUpdateAllowed = Object?.keys(newData).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw Error("Update is not allowed");
    }
    if (newData?.skills.length > 10){
      throw Error("Skills cant be more then 10");
    }
    const user = await User.findByIdAndUpdate(userId, newData, {
      returnDocument: "before",
      runValidators: true,
    });

    console.log(user);

    res.send("Successfully updated a data");
  } catch (err) {
    res.status(400).send("Update failed:" + err.message);
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



userRouter.get("/getuserbyemail", async (req, res) => {
  try {
    const userEmail = req.body.emailId;

    const user = await User.findOne({ emailId: userEmail });

    res.send(user);
  } catch (err) {
    res.status(400).send("Error in fetching data");
  }
});

module.exports = userRouter;