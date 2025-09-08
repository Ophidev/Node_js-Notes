
# 🌟 Lecture Notes: Node.js Season 2 – Episode 7  
## 🚀 Diving into APIs with Express & Mongoose  

Today’s lecture was all about **creating APIs** to interact with MongoDB using **Mongoose** and **Express.js**.  
We learned how to:  
- Add data to MongoDB (POST API)  
- Fetch data (GET APIs)  
- Delete and Update data (DELETE & PATCH APIs)  

---

## 📝 Key Concepts  

### 1️⃣ Sending Data to DB (POST `/signup`)  
- We use **Postman** to test APIs.  
  - Go to Postman → Select **Body → raw → JSON**  
  - Add a JSON object there (e.g., user details).  
- To read JSON data from the request body, we use the middleware:  

```js
app.use(express.json()); 
// 📌 This middleware parses JSON data coming in the body of requests
````

* Without this, `req.body` will be **undefined**.
* Then we create a **new User model** with that data and save it to MongoDB.

✅ Example:

```js
app.post("/signup", async (req, res) => {
  console.log(req.body); // Log incoming data
  
  const user = new User(req.body);
  try {
    await user.save(); // mongoose save() returns a Promise
    res.send("✅ Data successfully saved!");
  } catch (err) {
    res.status(400).send("❌ Error saving user: " + err.message);
  }
});
```

---

### 2️⃣ Fetching a User by Email (GET `/getuserbyemail`)

* To fetch data, we use Mongoose methods like `findOne()`.
* Even if two users exist with the same email, `findOne()` will return **only the first match**.

✅ Example:

```js
app.get("/getuserbyemail", async (req, res) => {
  try {
    const userEmail = req.body.emailId; // Get email from request body
    const user = await User.findOne({ emailId: userEmail }); // find first user with this email
    res.send(user);
  } catch (err) {
    res.status(400).send("❌ Error in fetching data");
  }
});
```

⚡ **Note:** For GET requests, usually we send data via **query params** (e.g., `/getuserbyemail?email=abc@gmail.com`) instead of request body. But here we used `req.body` for practice.

---

### 3️⃣ Fetch All Users (GET `/feed`)

* To get **all documents** in a collection, use:

```js
User.find({}); // passing empty {} fetches all docs
```

✅ Example:

```js
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users); // returns an array of user objects
  } catch (err) {
    res.status(400).send("❌ Something went wrong!");
  }
});
```

---

### 4️⃣ Delete a User (DELETE `/user`)

* To delete by **userId (MongoDB \_id)**, use:

```js
User.findByIdAndDelete(userId);
```

✅ Example:

```js
app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete(userId);
    res.send("🗑️ Successfully deleted a user!");
  } catch (err) {
    res.status(400).send("❌ Problem in the Delete API!");
  }
});
```

---

### 5️⃣ Update a User (PATCH `/user`)

* To update, use `findByIdAndUpdate()`.
* Options:

  * `{ returnDocument: "before" }` → returns old data
  * `{ returnDocument: "after" }` → returns new data

✅ Example:

```js
app.patch("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const newData = req.body;

    const user = await User.findByIdAndUpdate(userId, newData, { returnDocument: "before" });

    console.log(user); // logs old data before update
    res.send("✏️ Successfully updated data!");
  } catch (err) {
    res.status(400).send("❌ Error in updating data!");
  }
});
```

⚡ **Schema Restriction:**

* If you pass fields that are **not in schema**, MongoDB will **ignore them**.
* Example:

```json
{
  "userId": "68b7bfeb1878367e70c27313",
  "firstName": "Ayush",
  "newField": "ignored_field"
}
```

👉 Here, `newField` won’t be saved since it’s not defined in the schema.

---

## 💻 Final Combined Code

```js
const connectDB = require("./config/database");
const express = require("express");
const User = require("./models/user");

const app = express();

// ✅ Middleware to parse JSON data
app.use(express.json());

// ✨ POST /signup → Save user
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("✅ Data successfully saved!");
  } catch (err) {
    res.status(400).send("❌ Error saving the user: " + err.message);
  }
});

// ✨ GET /getuserbyemail → Fetch single user
app.get("/getuserbyemail", async (req, res) => {
  try {
    const userEmail = req.body.emailId; // Ideally should be query param
    const user = await User.findOne({ emailId: userEmail });
    res.send(user);
  } catch (err) {
    res.status(400).send("❌ Error in fetching data");
  }
});

// ✨ GET /feed → Fetch all users
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("❌ Something went wrong!");
  }
});

// ✨ DELETE /user → Delete by ID
app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    await User.findByIdAndDelete(userId);
    res.send("🗑️ Successfully deleted a user!");
  } catch (err) {
    res.status(400).send("❌ Problem in the Delete API!");
  }
});

// ✨ PATCH /user → Update by ID
app.patch("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const newData = req.body;

    const user = await User.findByIdAndUpdate(userId, newData, { returnDocument: "before" });

    console.log(user); // old data before update
    res.send("✏️ Successfully updated data!");
  } catch (err) {
    res.status(400).send("❌ Error in updating the data!");
  }
});

// ✅ Connect to DB & Start Server
connectDB()
  .then(() => {
    console.log("✅ Successfully connected to DB");
    app.listen("3737", () => {
      console.log("🚀 Server Started at port 3737");
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed!");
  });
```

---

## ✨ Quick Tips

* Always use **middleware** like `express.json()` to parse JSON.
* For **GET APIs**, prefer **query params** instead of body.
* `findOne()` → first matching doc
* `find()` → all matching docs
* `findByIdAndDelete()` → removes doc by `_id`
* `findByIdAndUpdate()` → updates doc by `_id`

---

## 🎯 Mnemonics to Remember

* **CRUD** = Create (POST), Read (GET), Update (PATCH), Delete (DELETE)
* Think of **mongoose model methods** as:

  * `findOne` → one doc
  * `find` → all docs
  * `findByIdAndDelete` → delete by ID
  * `findByIdAndUpdate` → update by ID

---

