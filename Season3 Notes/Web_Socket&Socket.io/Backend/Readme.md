# DevTinder Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white&style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white&style=for-the-badge)
![bcrypt](https://img.shields.io/badge/bcrypt-00599C?logo=bcrypt&logoColor=white&style=for-the-badge)
![Validator](https://img.shields.io/badge/Validator-13.15.15-blue?style=for-the-badge)

## Overview

DevTinder is a backend API for a developer matchmaking platform. It provides authentication, user profiles, connection requests, and feed APIs.

## Folder Structure

```
DevTinder-Backend/
  ├── src/
  │   ├── app.js
  │   ├── config/
  │   │   └── database.js
  │   ├── middlewares/
  │   │   └── auth.js
  │   ├── models/
  │   │   ├── connectionRequest.js
  │   │   └── user.js
  │   ├── routes/
  │   │   ├── authRouter.js
  │   │   ├── profileRouter.js
  │   │   ├── requestRouter.js
  │   │   └── userRouter.js
  │   └── utils/
  │       └── validation.js
  ├── package.json
  └── Readme.md
```

## API Flow

```mermaid
flowchart TD
    A[User] -->|Signup/Login| B(AuthRouter)
    B -->|JWT Cookie| A
    A -->|Profile View/Edit| C(ProfileRouter)
    A -->|Send/Review Request| D(RequestRouter)
    A -->|Feed/Connections| E(UserRouter)
    C -->|Validate| F[Validation Utils]
    D -->|DB Ops| G[ConnectionRequest Model]
    E -->|DB Ops| H[User Model]
    B -->|DB Ops| H
    C -->|DB Ops| H
```

## Getting Started

1. Clone the repo  
   `git clone <repo-url>`
2. Install dependencies  
   `npm install`
3. Set up MongoDB connection in [`src/config/database.js`](DevTinder-Backend/src/config/database.js)
4. Start the server  
   `npm run dev`

## Main APIs

See [`src/ApiList.md`](DevTinder-Backend/src/ApiList.md) for full API documentation.

- **Auth:** `/signup`, `/login`, `/logout`
- **Profile:** `/profile/view`, `/profile/edit`, `/profile/password`
- **Connection Requests:** `/request/send/:status/:userId`, `/request/review/:status/:requestId`
- **User:** `/user/requests/received`, `/user/connections`, `/user/feed`

## License

ISC

---

Made with ❤️ by Aditya Bhatt