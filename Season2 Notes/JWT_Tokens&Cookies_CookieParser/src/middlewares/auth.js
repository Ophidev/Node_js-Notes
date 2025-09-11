const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next) => {

   try{
      
      //get the token from the cookie
      const {token} = req.cookies
      if(!token){
         throw new Error("token envalid !!!!");
      }

      //validate the token

      const decodeObj = await jwt.verify(token,"DEV@Tinder&3737",{expiresIn: "1d"});//expires in 1day

      const {_id} = decodeObj;

      const user = await User.findById(_id); //getting user from database with id

      if(!user){
         throw new Error("User not found!");
      }

      req.user = user; //attach the user we get from database to the req.user

      next(); //now call the route handler.
   

   }
   catch(err){

      res.status(400).send("ERROR : "+ err.message);
   }
  
};


module.exports = userAuth;