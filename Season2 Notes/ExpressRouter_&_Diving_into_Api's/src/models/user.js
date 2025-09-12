//Creation of the User Schema

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");


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

userSchema.methods.getJWT = async function () {

  const user = this;
  //Create a JWT Token
  const token = await jwt.sign({_id : user?._id}, "DEV@Tinder&3737");

  return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {

  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);
  //remeber never change the position of the argument of bcrypt.compare() function
  // awiat bcrypt.compare("user_Enterd_Password_onLogin","User_PasswordHash_save_in_DB")
  
  return isPasswordValid;

}
module.exports = mongoose.model("User", userSchema);
// or
/*
const ModelReference = mongoose.model("nameOfModel",nameOfSchema);
#remember the reference to the model always start with capital letter.
module.exports = ModelReference;
*/


