
---

# 📚 Namaste Node.js – Episode 12: Databases

---

## 🗄️ What is a Database?

A **Database** is an **electronic organized collection of data** stored in a structured way using a **Database Management System (DBMS)**.

```mermaid
graph TD
A[Database 🗄️] --> B[DBMS ⚙️]
B --> C[Users 👩‍💻]
B --> D[Applications 📱]
B --> E[Data Storage 💾]
```

---

## ⚙️ What is DBMS?

A **Database Management System (DBMS)** is software that:

* Interacts with the **user** and the **database**
* Provides tools to **store, modify, retrieve, and manage** data
* Ensures data consistency, security, and availability

---

## 🏛️ Types of Databases
![Types of Databases](notesImages/image1.png)


```mermaid
mindmap
  root((Databases))
    RDBMS
      MySQL
      PostgreSQL
    NoSQL
      Document DB
      Key-Value DB
      Graph DB
      Wide Column DB
      Multi-Model DB
    In-Memory
      Redis
    Distributed SQL
      CockroachDB
    Time Series
      InfluxDB
    Object-Oriented
      db4o
    Graph DB
      Neo4j
    Hierarchical
      IBM IMS
    Network
      IDMS
    Cloud
      Amazon RDS
```

---

## 🧑‍🏫 RDBMS (Relational Databases)
![RDBMS](notesImages/image2.png)

* 💡 **E.F. Codd** gave **Codd's 12 Rules (0–12)** → defines if a database is truly relational
* ✅ Examples: **MySQL, PostgreSQL**
* 🧑‍💻 **Michael Widenius** → Creator of MySQL

  * MySQL → Acquired by Sun Microsystems → Later acquired by Oracle
* 📜 **SQL (Structured Query Language)** → Used to query relational databases

```mermaid
graph LR
EF[E.F. Codd 💡] --> Rules[Codd's 12 Rules]
Rules --> RDBMS[Relational DB]
RDBMS --> MySQL
RDBMS --> PostgreSQL
MySQL --> Sun[Sun Microsystems]
Sun --> Oracle
```

---

## 🌐 NoSQL (Not Only SQL)
![NoSQL](notesImages/image3.png)


🔹 **Types of NoSQL Databases**:

* 📄 Document DB (MongoDB)
* 🔑 Key-Value DB (Redis)
* 🌐 Graph DB (Neo4j)
* 📊 Wide Column DB (Cassandra, HBase)
* 🔀 Multi-Model DB

### 🟢 MongoDB Highlights

* 🚀 Released in **2009** (same time as Node.js – they work great together 💚)
* 🏢 Created by **10gen** → later renamed **MongoDB Inc.**
* 🏗️ Name comes from **Humongous** (Huge, Gigantic)
* ⚡ Features:

  * Flexible (schema-less)
  * Stores data as **Documents (JSON-like)**
  * Perfectly fits with **JavaScript/Node.js**
  * Improves developer productivity
* 🔧 Built with **C++, JavaScript, Python, Java**

```mermaid
graph TD
A[NoSQL 🌐] --> B[Document DB 📄]
A --> C[Key-Value 🔑]
A --> D[Graph 🌐]
A --> E[Wide Column 📊]
A --> F[Multi-Model 🔀]
B --> MongoDB[(MongoDB)]
MongoDB --> NodeJS[Node.js 💚]
MongoDB --> Atlas[MongoDB Atlas ☁️]
```

---

## 🔄 RDBMS vs NoSQL

### 📊 Structure Comparison
![RDBMS vs NoSQL](notesImages/image4.png)



---

### 🆚 Feature Comparison
![Comparison](notesImages/image5.png)


| Feature        | **RDBMS (MySQL)** 🏛️                | **NoSQL (MongoDB)** 🌐                      |
| -------------- | ------------------------------------ | ------------------------------------------- |
| Storage        | Tables, Rows, Columns                | Collections, Documents, Fields              |
| Data Type      | Structured                           | Semi/Unstructured                           |
| Schema         | Fixed                                | Flexible                                    |
| Query Language | SQL                                  | MQL (Mongo Query Language)                  |
| Scaling        | Hard (vertical scaling)              | Easy (horizontal scaling)                   |
| Relationships  | Foreign Keys + Joins                 | Nested / Embedded                           |
| Use Case       | Banking, ERP, Transaction-heavy apps | Big Data, Real-time analytics, Social media |

---

## ☁️ MongoDB in Node.js

You can use MongoDB in **two ways**:

1. **Local Setup** → Download and run MongoDB on your system
2. **Cloud Setup** → Use **MongoDB Atlas** (cloud-hosted, free tier available 🎉)

```mermaid
flowchart TD
A[Node.js App 💻] --> B[MongoDB Driver]
B --> C[Local MongoDB 🖥️]
B --> D[MongoDB Atlas ☁️]
```

---

## 📝 Summary

* **Database** → Organized data storage
* **DBMS** → Software to manage databases
* **RDBMS** → Uses tables, SQL, structured data
* **NoSQL** → Flexible, JSON-like, scalable
* **MongoDB** → Popular NoSQL DB, great with Node.js

---

✨ Stickers & Emojis Legend:

* 🏛️ = Traditional / Structured
* 🌐 = NoSQL / Modern
* 📊 = Data representation
* 🚀 = Performance / New tech
* 💡 = Key Concept
* ☁️ = Cloud

---












# 📚 Namaste Node.js – Episode 13: MongoDB with Node.js

---

## 🌐 Getting Started with MongoDB

1. 🔑 **Sign in** to the [MongoDB Website](https://www.mongodb.com/)
   ![MongoDB Website](file-bcfcdf9f-9084-45f0-a5de-285e5ee4efcf.png)

2. ☁️ **Create a Cluster** on MongoDB Atlas
   ![Creating Cluster](file-61ee3fc3-a199-4aed-9bb1-8c31476e700a.png)

3. 🔗 **Get the Connection String** for Compass
   ![Connection String](file-6e6a86f0-5bcd-4ac5-8f88-94d102bc3fd3.png)

4. 💻 **Install Tools**:

   * MongoDB Compass (GUI) 🖥️
   * MongoDB Shell (CLI) ⌨️

---

## 🏗️ Creating Your First Database

👉 Open **MongoDB Compass** and:

* Create a **Database**
* Inside it → create a **Collection**
* Insert your **first Document** 📄

![Compass Create DB](file-3b6bf313-994b-4c41-b4d2-defa78d0fb8b.png)

```json
{
  "name": "Akshay",
  "course": "Node.js",
  "episode": 13
}
```

---

## 🔌 Connecting MongoDB with Node.js

1. 📦 Install MongoDB Driver

```bash
npm install mongodb
```

👉 [MongoDB Driver Reference (NPM)](https://www.npmjs.com/package/mongodb)

2. 📑 Use the **official documentation** to set up connection

```js
// index.js
const { MongoClient } = require("mongodb");

const uri = "your-mongodb-connection-string-here";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("namasteNode");
    const collection = db.collection("students");

    // Insert a document
    await collection.insertOne({ name: "Akshay", episode: 13 });

    // Fetch documents
    const result = await collection.findOne({ name: "Akshay" });
    console.log("Fetched Document:", result);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```

---

## ⚡ CRUD Operations with MongoDB Driver

![CRUD Screenshot](file-9e77d3bf-5374-4b08-8646-af574e42fe55.png)

```mermaid
graph TD
A[CRUD Operations] --> B[Create ➕ InsertOne/InsertMany]
A --> C[Read 👀 Find/FindOne]
A --> D[Update ✏️ UpdateOne/UpdateMany]
A --> E[Delete ❌ DeleteOne/DeleteMany]
```

* **Create** → `insertOne()` / `insertMany()`
* **Read** → `findOne()` / `find()`
* **Update** → `updateOne()` / `updateMany()`
* **Delete** → `deleteOne()` / `deleteMany()`

---

## 🧑‍💻 Today’s Learning

✔️ Learned to use the **MongoDB driver** in Node.js
✔️ Performed **CRUD operations**
✔️ Understood the difference between **Compass GUI** and **Code-based connection**
✔️ Next step → Explore **Mongoose ODM library** 🦆

---

## 📖 MongoDB vs Mongoose

![MongoDB vs Mongoose](file-e22fab9b-aa47-42a5-8895-459b42d088a6.png)

```mermaid
graph LR
A[MongoDB Driver] --> B[Low Level Control 🎛️]
A --> C[Direct Queries to DB]
A --> D[More Boilerplate Code]

E[Mongoose Library] --> F[ODM: Object Data Modeling 🧩]
E --> G[Schema Validation ✅]
E --> H[Less Code, More Abstraction 🚀]

A -.-> E
```

| Feature        | **MongoDB Driver**                | **Mongoose**                 |
| -------------- | --------------------------------- | ---------------------------- |
| Level          | Low-level API                     | High-level ODM               |
| Schema         | Flexible                          | Schema enforced              |
| Learning Curve | Easier to start                   | Slightly more concepts       |
| Use Case       | Small scripts, direct DB handling | Scalable apps, strict models |

---

## 📝 Summary

* Signed into **MongoDB Atlas** & created cluster
* Connected using **Compass** & **MongoDB Shell**
* Installed & used the **MongoDB Driver** (`npm install mongodb`)
* Performed **CRUD operations**
* Next: Learn **Mongoose** for schema-based modeling

---

✨ Stickers & Emojis Legend:

* ☁️ = Cloud
* 📦 = Package
* 🧑‍💻 = Developer tasks
* 📄 = Document
* ⚡ = Fast operation
* 🧩 = Abstraction/Schema

---

