const adminMiddleware = (req,res,next) => {

     const adminToken = "@admin";
     const adminAuth = adminToken === "@admin";

     if(!adminAuth){

        res.status(401).send("!admin not recongnised");

     }
     else{

        next();
     }
};

const userMiddleware = (req,res,next) => {

     const userToken = "@user";
     const userAuth = userToken === "@user";

     if(!userAuth){

        res.status(401).send("!user not recongnised");

     }
     else{

        next();
     }
};
module.exports = {adminMiddleware,userMiddleware};