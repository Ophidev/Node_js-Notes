const express = require("express");
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");


const authRouter = express.Router(); //creation of router

//authRouter.user(),get(),post(),patch()... == app.user(),get(),post(),patch()...

authRouter.post("/signup", async (req, res) => {

  //always first validate the data 
  
  validateSignUpData(req);

  const {firstName, lastName, emailId, password} = req.body;

  //second do Encryption of password then store in DB

  const passwordHash = await bcrypt.hash(password,10);

  const user = new User({
    firstName,
    lastName,
    emailId,
    password: passwordHash
  });

  try {
    await user.save(); //this will return an promise (in general all the mongoose function return promises)
    res.send("Data successfully send!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});


authRouter.post("/login", async (req,res) => {

   try{

    // get the email and password from the user who is trying to login
     const {emailId, password} = req.body;

     //now let me check weather the email is present in DB or not

     const user = await User.findOne({emailId:emailId});//basically getting a user from a enterd email

     if(!user){//if user not found!

        throw new Error("Invalid credential!");
     }

     //now compare the passwords

    const isPasswordValid = user.validatePassword(password);//calling Schema.methods
     if(isPasswordValid){

      const token = await user.getJWT(); //calling Schema handler method.

       //Create create cookie and send the JWT token into it

       res.cookie("token",token,{
        expires : new Date(Date.now() + 8 + 3600000),//cookie will expires in 8 hours
      });
       
        res.send("Login Sucessfull!!");
     }
     else{
       
       throw new Error("Invalid credentials!");
     }


   }
   catch(err){

      res.status(400).send("ERROR: "+ err.message);
   }
});


authRouter.post('/logout',async (req,res) => {

     res
     .cookie("token",null,{
      expires: new Date(Date.now()),
     })
     .send("Logout successfully!");
});

module.exports = authRouter;