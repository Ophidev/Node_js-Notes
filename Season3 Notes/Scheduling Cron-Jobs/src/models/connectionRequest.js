const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({

    fromUserId:{
        type: mongoose.Schema.Types.ObjectId, //different datatype not a string, mongoose does not save it as string
        ref : "User", //reference to the users collection help us to populate the data
        required: true,
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true,
    },
    status: {

        type : String,
        required: true,
        enum : {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`,
        }
    }

},{timestamps:true});


//below is the use of Schema.pre() method 
// "save" act as event listener that before saving the data into db run this function
//and remember use only the function created with the "function " keyword dont use the arrow functions.

connectionRequestSchema.pre("save", function (next) {

    const connectionRequest = this;
    console.log(connectionRequest);
    //check if the fromUserId is same as toUserId

    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
         //using equals() because the fromUserId & toUserId datatypes are different not the String one.

        throw new Error("You Cannot send request to yourself!!");
    }

    next(); //mendatory to call the next() otherwise not work
});


const ConnectionRequestModel = new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);


module.exports = ConnectionRequestModel;