const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({

    fromUserId:{
        type: String,
        required: true,
    },
    toUserId:{
        type:String,
        required: true,
    },
    status: {

        type : String,
        required: true,
        enum : {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`,
        }
    }

},{timestamps:true});

const ConnectionRequestModel = new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);

module.exports = ConnectionRequestModel;