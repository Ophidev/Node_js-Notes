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

}

module.exports = {validateSignUpData};