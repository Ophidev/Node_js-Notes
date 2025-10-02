const express = require("express");
const userAuth = require("../middlewares/auth");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();
const {validateEditProfileData} = require("../utils/validation");
const user = require("../models/user");



//let's create a profile get GET/profile api to validate the cookie

profileRouter.get("/profile/view", userAuth, async (req, res) => { //added userAuth middleware.
  try {

    const user = req.user; //getting user which is set by userAuth middleware.
    res.send(user);

  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
});

//let's create the POST/profile/edit api to update the profile of a user

profileRouter.patch('/profile/edit', userAuth, async (req, res) => { 

     try{
       if (!validateEditProfileData(req)) {
         throw new Error("!Invalid Edit Request!!!!");
       }

       const loggedInUser = req.user; //this is the older user which I am getting from the userAuth

       //let's update the old user data which is comming from the userAuth
       //  to new user data comming in the api's body

       console.log(loggedInUser);

       Object.keys(req.body).forEach(
         (key) => (loggedInUser[key] = req.body[key])
       );

       
      
       //simple logic -:
       /*
        object.keys(new_user_data_object_keyes).forEach_Loops_on_key_of_new_user_data((perticular_key) => (old_user_data[perticular_key] = new_user_data[perticular_key]));

       */

       await loggedInUser.save(); //save to database.

       res.json({
        message : `${loggedInUser.firstName},your profile update successfully`,
        data : loggedInUser
      });

       // The above syntax is called a template literal with interpolation in JavaScript.

       // Template literals are strings written with backticks (` instead of ' or ").

       // The ${...} part is called interpolation — it lets you embed variables or expressions directly into the string.
     }
     catch(err){
        
         res.status(401).send("Error : "+ err.message);
     }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {

    const loggedInUser = req.user;
    const passwordHash = loggedInUser.password;

    const isPasswordValid = await bcrypt.compare(
      req.body.oldPassword,
      passwordHash
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password!");
    }

    const newPasswordHash = await bcrypt.hash(req.body.newPassword,10);
    loggedInUser.password = newPasswordHash;
    await loggedInUser.save();


    res.send("password updated Successfully!");
  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;