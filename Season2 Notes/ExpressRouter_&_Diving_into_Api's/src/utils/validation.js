const validator = require("validator");

const validateSignUpData = (req) => {

    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){

        throw Error("Name is not Valid!");
    }
    else if(!validator.isEmail(emailId)){

        throw Error ("Email is not Valid!");
    }
    else if(!validator.isStrongPassword(password)){

        throw Error ("Please Enter a Strong password!");
    }

};

const validateEditProfileData = (req) => {

     const  allowedEditFields = ["firstName","lastName","photoUrl","about","skills"];
     const isEditAllowed = Object.keys(req.body).every((field)=>  allowedEditFields.includes(field));

     return isEditAllowed;
}

module.exports = {validateSignUpData,validateEditProfileData};