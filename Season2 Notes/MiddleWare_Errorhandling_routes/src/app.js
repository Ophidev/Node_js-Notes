//File hadling with the routes

const express = require('express');

const app = express();



app.get("/getUserData",(req,res)=>{

   try{
   throw new Error("error is throwed");
   res.send("!successfully data is get");
   }
   catch(err){

      res.status(401).send("!error in getUserData");
   }
});


app.use("/",(err,req,res,next)=>{
   //(err,req,res,next) => this should be in sequence otherwise
   //if( req,err,res,next) => req will behave as err and err as req 
   //this changing of order is applicable for all the other arguments.
   //so maintain the order.

   if(err){

      res.status(401).send("Error occours!");
   }
   else{

      next();
   }

});

app.listen("3737",()=>{

   console.log("Server started sussfully!");

});


//in the above code here I have handled the error using the try catch and app.use will not run.
// it is also a way to handle the error but you should also used try and cath also.
//because try catch can handle error for specefic function.