const connectDB = require("./config/database");
const express = require("express");
const User = require("./models/user");

const app = express();

  app.use(express.json());//this use middleware will called for all the api call because not specified a route.
  //express.json is a middleware(method) used to read the josn format data passed into api body.


//now Creating a DELETE/user api to delete user by id go to mongoose documentation inside the models to find method to delte user by id.

//now by uisng the Model.findByIdAndDelete() method of mongoose library.

app.delete('/user', async (req,res) => {
   
    try{

       const userId = req.body.userId;
       const user = await User.findByIdAndDelete(userId);
       //or
       //const user = await User.findByIdAndDelete({_id:userId});
       res.send("Successfully Delted a user!");
      

    }
    catch(err){

      res.status(400).send("Problem in the Delte api!");
    }
});


//now Creating a PATCH/user api to update a user by Id 
//by using the method Model.findUserByIdAndUpdate().

app.patch('/user', async (req,res) =>{

    try{
      const userId = req.body.userId;
      const newData = req.body;

      const user = await User.findByIdAndUpdate(userId,newData,{returnDocument:'before'});

      console.log(user);

      res.send("Successfully updated a data");
    }
    catch(err){

      res.status(400).send("Error in updating the data!");
    }
})

//About updating a field
/*
newData = {
    "userId":"68b7bfeb1878367e70c27313",
    "firstName": "Ayush",
    "lastName": "Bhatt",
    "emailId": "Ayush@gmail.com",
    "password": "Ayush@1234",
    "newField": "j;asdfladjfl;adjsfjasdf"
}

see their is userId and newField which are not being added in the Schema (userSchema)
so our mongodb will ignore them and just update those field which are present in the Schema
defined by the user.

const user = await User.findByIdAndUpdate(userId,newData,{returnDocument:'before'});
-now about the options-> options provides are some other functionality in the mongoose method or middlewares.
-for example here the option is -> {returnDocument:'before/after'} ->:
 - it takes input as string and just values before or after 
 - it helps us to get the data which is being updated or new data
 - example if 'before' as value then old data which is going to be updated 
 - and 'after' as a value gives new data. 
*/





//Creting a GET/userbyemail api to get the user by email and I have stored 2 user with the same email usng findOne() method of mongoose
//we fetch the data by using the User model
//so in the documentation of mongoose go inside the api section then select models to get their methods.

app.get("/getuserbyemail", async (req,res) => {

 try{
   const userEmail = req.body.emailId;

   const user = await User.findOne({emailId:userEmail})
   
   res.send(user);

   }
   catch(err){
     res.status(400).send("Error in fetching data");
   }
});


//Now createing a GET/feed api to get all the user from the database by using the find() mongoose method
app.get('/feed', async (req,res) => {

    try{
      const user = await User.find({}); //pass empty to get all the documents
      res.send(user); //user will be array of objects.
    }
    catch(err){
      res.status(400).send("Something went wrong!");
    }
});

app.post("/signup", async (req, res) => {

  const user = new User(req.body);
  try {
    await user.save(); //this will return an promise (in general all the mongoose function return promises)
    res.send("Data successfully send!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
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

