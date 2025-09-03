//Creation of the User Schema

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstName:{ //name of First field
        type:String, //type of value going to store here
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
    },
    password:{
        type:String,
    },
    age:{
        type:String,
    },
    gender:{
        type:String,
    }
});

module.exports = mongoose.model("User",userSchema);
// or 
/*
const ModelReference = mongoose.model("nameOfModel",nameOfSchema);
#remember the reference to the model always start with capital letter.
module.exports = ModelReference;
*/