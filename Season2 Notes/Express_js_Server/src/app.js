const express = require("express"); //"express comming from the node modules"

const app = express(); //app is the instance of Express() function
// Creates an instance of Express (your application object)


//Order of routes matter in app.use method.
//adding the request handlers with the routes and then response to it accordingly

app.use("/route1", (req, res) => { //First check /route1
  res.send("you are on route1");
});

app.use("/route2", (req, res) => { //then chekc /route2
  res.send("you are on route2");
});

app.use("/", (req, res) => { //if / then print just it or /anything  just send this response
  res.send("Hello from the server!");
});


app.listen(3737, () => {
  // Starts the server and listens on port 3737
  console.log("Server is successfully listning on port number 3737");
});
