const connectDB = require("./config/database");
const express = require("express");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./middlewares/auth");

const app = express();

app.use(express.json()); 
app.use(cookieParser()); 

app.delete("/user", async (req, res) => {
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

//now Creating a PATCH/user api to update a user by Id
//by using the method Model.findUserByIdAndUpdate().

app.patch("/user/:userId", async (req, res) => {
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

app.get("/getuserbyemail", async (req, res) => {
  try {
    const userEmail = req.body.emailId;

    const user = await User.findOne({ emailId: userEmail });

    res.send(user);
  } catch (err) {
    res.status(400).send("Error in fetching data");
  }
});

//Now createing a GET/feed api to get all the user from the database by using the find() mongoose method
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({}); //pass empty to get all the documents
    res.send(user); //user will be array of objects.
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

app.post("/signup", async (req, res) => {

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

app.post("/login", async (req,res) => {

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

//let's create a profile get GET/profile api to validate the cookie

app.get("/profile", userAuth, async (req, res) => { //added userAuth middleware.
  try {

    const user = req.user; //getting user which is set by userAuth middleware.
    res.send(user);

  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
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
