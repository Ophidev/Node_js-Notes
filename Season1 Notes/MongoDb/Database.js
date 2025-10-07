const URI = "mongodb+srv://Mork37:uZQjkKFseiwebDyU@learningmongocluster.2q3e4tn.mongodb.net/";  

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

//connection URL 
const url = URI;
const client = new MongoClient(url);

const dbName = 'NamasteMongoDB';


async function main(){

    await client.connect();
    console.log("Successfully connected to server");

    const db = client.db(dbName);
    const collection = db.collection('User');//name of the collecton where I wnat to put the documents

    const oneDocument = {
        'FirstName':'Akash',
        'LastName':'bhatt',
        'City':'Dehradun'
    }


    //CRUD OPERATION IN MONGODB USING THE "mongodb driver".
    
    // const insertOne = await collection.insertOne(oneDocument); //create
    // console.log("inserOne => ", insertOne);

    // const updateResult = await collection.updateOne({'FirstName':'Akash'},{$set:{'LastName':'Bhatt'}});
    // console.log("updateResult => ", updateResult); //update

    const deleteResult = await collection.deleteOne({'FirstName':'Akash'});
    console.log("deleteResult => ", deleteResult); //delete

    const findResult = await collection.find({}).toArray(); //Read
    console.log("findResult => ", findResult);


    return 'done.';
}

main()
.then(console.log)
.catch(console.error)
.finally(()=>client.close());