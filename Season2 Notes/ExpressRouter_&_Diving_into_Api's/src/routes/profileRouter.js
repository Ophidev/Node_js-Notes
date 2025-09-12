const express = require("express");
const userAuth = require("../middlewares/auth");

const profileRouter = express.Router();


//let's create a profile get GET/profile api to validate the cookie

profileRouter.get("/profile", userAuth, async (req, res) => { //added userAuth middleware.
  try {

    const user = req.user; //getting user which is set by userAuth middleware.
    res.send(user);

  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
});

module.exports = profileRouter;