
# 🌟 Lecture Notes: Node.js Season 2 – Episode 6  
## 🗄️ Database, Schema & Model with Mongoose  

---

## 📝 What is Mongoose?  
- **Mongoose** is a popular library that makes it easy to use **MongoDB** inside a **Node.js** application.  
- Instead of writing complex MongoDB queries, Mongoose provides a **simpler, schema-based approach**.  
- It also handles things like **validation, middleware, relationships, and easy model creation**.  
- Docs are really good 👉 [Mongoose Documentation](https://mongoosejs.com/)  

✨ Remember:  
Mongoose acts as a **bridge** between our Node.js code and MongoDB database.  

---

## ⚙️ Installing Mongoose  
Run this command in your project terminal:  

```bash
npm install mongoose
````

---

## 🔗 Connecting to MongoDB with Mongoose

We create a `database.js` file inside `config/`.

```js
// config/database.js
//Now in this lecture I am learning about the mongoose library
/*
 -> Which is very famous to use the mongoDB database in node.js
 -> because it makes it very ease to do so.
 -> And the documentation of the mongoose library is so good.

 /First lets start with the conection of the DB
 ->go to the mongoose website 
 -> install mongoose in your terminal
  -`npm install mongoose`

*/


const mongoose = require("mongoose");

const connectDB = async () => {

    await mongoose.connect(
        "mongodb+srv://Mork37:Database%40Password@learningmongodb.zsgjihs.mongodb.net/DevTinder"
    );//connection string

//important information
/*
"mongodb+srv://Mork37:Database%40Password@learningmongodb.zsgjihs.mongodb.net/"-> this is connection string
 it is used to connect with the cluster now because we are not added a information of database here.

 so for existing database you can the database name at the end of connection string.
 and to create a new database at first you can add any name at the end of the connection string.

 "mongodb+srv://Mork37:Database%40Password@learningmongodb.zsgjihs.mongodb.net/NameOfDatabase"
*/

};

//as we know that at calling of connectDB method it will return us a promise.

module.exports = connectDB;

```

---

### ✅ Using DB Connection in `app.js`

```js
// app.js
const connectDB = require("./config/database");
const express = require("express");

const app = express();

/* 📌 Important:
   Always connect to DB before starting the Express server.
   Why? ⚠️
   If server starts first and users send requests while DB is not connected,
   the app will crash or misbehave.
*/

connectDB()
  .then(() => {
    console.log("✅ Successfully connected to DB");

    app.listen(3737, () => {
      console.log("🚀 Server started at port 3737");
    });
  })
  .catch((err) => {
    console.error("❌ Database cannot be connected!", err);
  });
```

✨ This is the **recommended way**:

1. First connect DB.
2. Then start Express server.

---

## 📊 Database Design Recap

* In **MongoDB**:

  * Database → contains **Collections**.
  * Collection → contains a group of **Documents**.
  * Document → individual records (like JSON objects).

📌 For our **DevTinder project**:

* We need a **User Collection** with details like:

  * First Name
  * Last Name
  * City
  * Phone Number
  * Email, Password, etc.

---

## 🧩 Schema & Model in Mongoose

👉 Before creating an actual MongoDB collection, we define its **Schema**.

* **Schema**: Structure that defines what fields a document will have.
* **Model**: A class created from the schema. It is used to create new documents inside the collection & intrect with the collection.

📖 Example: User Schema & Model

```js
// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { 
    type: String, // type of value
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: String, // can also be Number
  },
  gender: {
    type: String,
  }
});

// Create a Model from the Schema
// 'User' -> will create a collection named 'users' in MongoDB
module.exports = mongoose.model("User", userSchema);

/*
Syntax:
const ModelReference = mongoose.model("ModelName", schema);
const ModelReference = mongoose.model("ModelName", schemaName, collectionName);
- if not given collection name it will take automatically collection Name from the model name in the 
- lowercase and plural
- Always start model names with Capital letters ✅
*/
```

---

## 🛠️ Creating Documents with Model

Let’s implement the **Signup API** (POST `/signup`).
For now → use hardcoded data (later will use dynamic data from frontend).

```js
const express = require("express");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  // Create a new instance of User model
  const user = new User({
    firstName: "Aditya",
    lastName: "Bhatt",
    emailId: "Aditya@gmail.com",
    password: "Aditya@123",
  });

  try {
    // Save user to DB (returns a Promise)
    await user.save(); 
    //this save will save a document in our collection
    res.send("🎉 User successfully saved to DB!");
  } catch (err) {
    res.status(400).send("❌ Error saving the user: " + err.message);
  }
});
```

---

## 📊 Diagrams

### MongoDB Hierarchy

```mermaid
flowchart TD
   A[🗄️ MongoDB Database] --> B[📂 Collection: Users]
   B --> C1[📄 Document: User 1]
   B --> C2[📄 Document: User 2]
   B --> C3[📄 Document: User 3]
```

👉 Think of DB like a **cupboard**, Collections like **folders**, and Documents like **files inside folders**.

---

### Mongoose Workflow

```mermaid
flowchart LR
   A[📄 Schema] --> B[🏗️ Model]
   B --> C[📝 Document]
   C --> D[(💾 MongoDB Collection)]
```

📝 Schema defines structure → Model acts as a class → Document is created → Saved inside MongoDB.

---

### Request → Express → Mongoose → MongoDB

```mermaid
sequenceDiagram
   participant U as 👤 User
   participant E as 🌐 Express API (/signup)
   participant M as 📦 Mongoose (Model)
   participant DB as 🗄️ MongoDB

   U->>E: POST /signup with data
   E->>M: Create new User instance
   M->>DB: Save() → Insert document
   DB-->>M: Acknowledgement ✅
   M-->>E: Promise resolved
   E-->>U: 🎉 Success response
```

👉 Flow Explained:

1. User sends **POST request** to `/signup`.
2. Express handles the route → passes data to **Mongoose Model**.
3. Mongoose creates a new **Document** instance.
4. `user.save()` sends it to **MongoDB**.
5. MongoDB confirms save → response goes back to user.

---

### ❌ Error Handling Flow (DB/Validation Failures)

```mermaid
sequenceDiagram
   participant U as 👤 User
   participant E as 🌐 Express API (/signup)
   participant M as 📦 Mongoose (Model)
   participant DB as 🗄️ MongoDB

   U->>E: POST /signup with data
   E->>M: Create new User instance
   M->>DB: Save() → Insert document
   DB-->>M: ❌ Error (e.g., Duplicate email, DB down)
   M-->>E: Promise rejected
   E-->>U: ⚠️ Error response (status 400/500)
```

🛑 Example Errors:

* **DB Not Connected** → `Database cannot be connected!`
* **Validation Error** → e.g., `emailId is required`
* **Duplicate Key** → e.g., `emailId already exists`

📌 Handling Strategy:

* Always wrap DB calls inside **try/catch**.
* Send proper **status codes**:

  * `400` → Bad Request (invalid data, validation errors).
  * `500` → Internal Server Error (DB issues).

---

## 💡 Tips & Tricks

* **Tip 1**: Always connect DB **before** starting server.
* **Tip 2**: Model names start with **Capital letters** (`User`, `Post`, etc.).
* **Tip 3**: By default, Mongoose will create a **plural collection name** (e.g., `User` → `users`).
* **Tip 4**: Every mongoose function returns a **Promise** → use `await` or `.then()`.
* **Tip 5**: For sensitive fields like **password**, always use hashing (e.g., `bcrypt`) before saving.
* **Tip 6**: Use **`.select("-password")`** when fetching users → hides password field in responses.

---

## 🎯 Summary

* Installed & connected **Mongoose**.
* Learned **Schema** & **Model** creation.
* Created a **Signup API** that saves data to DB.
* Understood **DB design** → DB → Collection → Document.
* Understood the **flow of data** from Request → Express → Mongoose → MongoDB.
* Learned **Error Handling Flow** for DB and validation failures.
* Used async/await for DB operations.

---





# How Mongoose Creates the `users` Collection

## 1. Defining a Model
```js
module.exports = mongoose.model("User", userSchema);
````

* `"User"` is the **model name** (singular).
* `userSchema` is the schema definition.

---

## 2. Automatic Pluralization

Mongoose automatically **pluralizes** the model name:

* `"User"` → `"users"` (lowercased + pluralized)
* Creates a MongoDB collection named **`users`**.

---

## 3. Why Does Mongoose Do This?

* MongoDB collections are usually plural (`users`, `products`, `orders`, etc.).
* Mongoose assumes the plural form to make life easier.

---

## 4. Controlling the Collection Name

If you want a fixed collection name, pass it as a third argument:

```js
module.exports = mongoose.model("User", userSchema, "myUsers");
```

➡️ This will always store data in **`myUsers`** collection.

---

## 5. Example Flow in Your Code

1. You create a `User` instance:

   ```js
   const user = new User({ firstName: "Aditya", ... });
   ```
2. Call `.save()`:

   * Mongoose maps `"User"` → `"users"` collection.
   * Inserts the document there.

---

✅ Even if you don’t mention `"users"`, Mongoose automatically creates and uses it.


