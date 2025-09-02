
# 🌐 REST APIs (Representational State Transfer)

REST API is a **standard architectural style** for designing APIs (Application Programming Interfaces)  
that allow **communication between software systems** — for example, between **frontend** and **backend**.  

It helps in **separating concerns** (frontend ≠ backend) and makes applications more **scalable, reusable, and maintainable**.

---

## ✨ Key Understanding (Your Notes Polished)

✅ REST APIs:
- Stand for **Representational State Transfer**.  
- Are designed as **URLs (endpoints)** that clients can call.  
- Use **HTTP methods** (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) to define what kind of operation is requested.  
- Requests are **sent over the HTTP protocol**, which itself runs on **TCP sockets**.  
- When a request reaches the **backend**:
  1. The backend **checks the HTTP method** (GET, POST, PUT, etc.).
  2. Runs the **specific function/code** mapped to that endpoint.
  3. That code may talk to the **database** to fetch, insert, update, or delete data.
  4. A **response** is sent back to the client over HTTP (again on TCP sockets).

👉 So, **APIs don’t perform database operations directly** — they **instruct the backend**, and the backend performs the actual work.

---

## 🔑 REST API Flow (Mermaid Diagram)

```mermaid
sequenceDiagram
    participant Client as 🖥️ Client (Frontend)
    participant API as 🌐 REST API (HTTP Request)
    participant Backend as ⚙️ Backend Server
    participant DB as 🗄️ Database

    Client->>API: 📩 Sends HTTP Request (GET/POST/PUT/DELETE)
    API->>Backend: 🚦 Backend receives & identifies endpoint
    Backend->>DB: 📂 Perform DB operation (fetch/insert/update/delete)
    DB-->>Backend: 📤 Return result/data
    Backend-->>API: 📦 Send response (JSON)
    API-->>Client: ✅ Deliver result to user
````

---

## 🛠️ HTTP Methods in REST

Here are the main methods you’ll use in REST APIs:

| Method     | 🔥 Purpose                             | Example                                               |
| ---------- | -------------------------------------- | ----------------------------------------------------- |
| **GET**    | 📥 Fetch data from server/database     | `GET /users/1` → Get details of user 1                |
| **POST**   | ➕ Add new data                         | `POST /users` with JSON body → Create a user          |
| **PUT**    | 📝 Update entire data (replace)        | `PUT /users/1` with JSON body → Update full user info |
| **PATCH**  | ✂️ Update partial data (modify fields) | `PATCH /users/1` → Change only email of user 1        |
| **DELETE** | ❌ Remove data                          | `DELETE /users/1` → Delete user 1                     |

---

## 🌍 Example: Weather API

### Request:

```http
GET /weather?city=London HTTP/1.1
Host: api.weather.com
```

### Backend Action:

* Backend sees `GET /weather`.
* Fetches data from weather database/service.
* Prepares JSON response.

### Response:

```json
{
  "city": "London",
  "temperature": "18°C",
  "condition": "☁️ Cloudy"
}
```

---

## 🍕 Analogy (Easy to Remember!)

* **Client (You)** → The hungry customer
* **API (Waiter)** → The messenger who takes your order and brings food
* **Backend (Chef)** → The one who cooks according to the request
* **Database (Fridge)** → Where ingredients are stored

👉 The waiter (API) never cooks. He just carries your order & food back.

---

## 🎯 Key Points to Remember

* REST APIs are **contracts** (rules) for communication, not the transport itself.
* **Transport** = HTTP (built on TCP sockets).
* **Backend logic** = Executes the actual business logic.
* **Database** = Stores and returns the data.

✨ In short:
**Client → API (HTTP Request) → Backend → Database → Backend → API (HTTP Response) → Client** 🚀

---

