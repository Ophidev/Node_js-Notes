const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");

const validateSignUpData = (req) => {

    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){

        throw new Error("Name is not Valid!");
    }
    if(!emailId || !validator.isEmail(emailId)){

        throw new Error ("Email is not Valid!");
    }
    if(!password || !validator.isStrongPassword(password)){

        throw new Error ("Please Enter a Strong password!");
    }

};

const validateEditProfileData = (req) => {

     const  allowedEditFields = ["firstName","lastName","photoUrl","about","age","gender","skills"];
     const isEditAllowed = Object.keys(req.body).every((field)=>  allowedEditFields.includes(field));

     return isEditAllowed;
}

module.exports = {validateSignUpData,validateEditProfileData};