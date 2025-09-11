//Creation of the User Schema

const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      //name of First field
      type: String, //type of value going to store here
      required: true, //this is a Schema type that this field must be their other wise data will be not stored in the database.
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true, //this field should be not duplicate
      trim: true,
      lowercase: true, //we store the email in lowercase even typed in any case.
      validate(value){
        if(!validator.isEmail(value)){

          throw new Error("Email is not valid!"+value);
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){

            throw new Error ("Enter a Strong password!" + value);
        }
      }
    },
    age: {
      type: Number,
      min: 18, //minum age should be 18
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male","female","other"].includes(value)) {
          throw new Error("Gender is not Valid!");
        }
      },
    },

    photoUrl: {
      type: String,
      default:
        "https://www.shutterstock.com/image-vector/vector-design-avatar-dummy-sign-600nw-1290556063.jpg",
      //this will set default value
      validate(value){

        if(!validator.isURL(value)){

          throw new Error("Invalid photo URL! : "+value);
        }
      }
    },

    about: {
      type: String,
      default: "This is a default About of user...",
    },

    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
// or
/*
const ModelReference = mongoose.model("nameOfModel",nameOfSchema);
#remember the reference to the model always start with capital letter.
module.exports = ModelReference;
*/
