const express = require("express");

const app = express();

//To create get api's we use app.get method
//similar for put,post,patch and delete
//app.use is for general for each get,put and post.

app.get("/user",(req,res)=>{

   console.log(req.query);//to get the request query from the route
   res.send({Name:"Aditya",id:1});
})

app.get("/user/:userId/:name/:passwrod",(req,res)=>{

     console.log(req.params);
     //help us to get the params from the routes
     res.send("params send sucessfully over the routes");
})

// app.get("/user",(req,res)=>{

//    res.send({Name:"Aditya",id:1});
// })

app.use("/",(req,res)=>{

    res.send("Namste Express Server🙏");
});





app.listen("3737",()=>{

   console.log("Server successfully created!");
})