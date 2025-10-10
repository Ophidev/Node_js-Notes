
# 🌟 Node.js Season 3 – Episode 6  
## 🕒 Scheduling Cron Jobs  

---

## 🧠 What Are Cron Jobs?

> 💡 **Cron Jobs** are scheduled tasks — things your code does automatically at a specific time or interval.

In Node.js, cron jobs let you:
- ⏰ **Run tasks automatically** at a fixed time (every minute, hour, or day).
- 📬 **Send emails** at a particular time (like New Year greetings 🎉).
- 👥 **Send reminders or notifications**, such as friend requests or daily updates.
- ⚙️ **Run scripts or cleanup tasks** on a server periodically.

Basically, if you ever thought “I wish my code did this every day at 8 AM” — that’s exactly what cron jobs are for.

---

## ⚙️ Installing & Setting Up

We use the **`node-cron`** package to schedule jobs easily in Node.js.

### 🧩 Step 1: Install
```bash
npm install node-cron
````

### 🧩 Step 2: Create a Utility File

Inside your project, make a new file in the `utils` folder:

```
utils/cronjob.js
```

---

## 💻 Example Code

Here’s a simple example to understand how scheduling works 👇

```js
const cron = require('node-cron');

cron.schedule("* * * * * *", () => {
    console.log("Hello World, " + new Date());
});
```

This prints a message every **second** 🕐

---

## 📅 Understanding the Cron Syntax

Each `*` in the cron pattern represents a **time unit** — and every one of them matters!

Let’s break it down clearly 👇

```
# ┌────────────── second (optional)
# │ ┌──────────── minute
# │ │ ┌────────── hour
# │ │ │ ┌──────── day of month
# │ │ │ │ ┌────── month
# │ │ │ │ │ ┌──── day of week
# │ │ │ │ │ │
# * * * * * *
```

### 🧩 Meaning of Each Position

| Symbol          | Field       | Example                   | Description                                  |
| :-------------- | :---------- | :------------------------ | :------------------------------------------- |
| `*`             | Every value | `* * * * * *`             | Runs every second/minute/hour/day/month/week |
| `*/5`           | Step value  | `*/5 * * * * *`           | Runs every 5 seconds                         |
| `0`             | Exact value | `0 8 * * *`               | Runs every day at 8:00 AM                    |
| `15 14 * * 1-5` | Range       | Runs 2:15 PM from Mon–Fri |                                              |

> ⚠️ **Note:**
> The **first star (seconds)** is optional — but all other stars must be filled properly.

---

## 🌐 Helpful Website

👉 Use **[Crontab Guru](https://crontab.guru)** — a fantastic website to visualize and test cron patterns.
It shows you in plain English when your job will run. Example:

> `0 8 * * *` → “At 08:00 AM every day”

---

## 🧭 Example: Real Use Case

Imagine you want to:

> Send emails to users every morning at 8 AM 🕗

Here’s how that looks in code 👇

```js
const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest");

// This job will run every day at 8 AM
cron.schedule("0 8 * * *", async () => {
  try {
    const yesterday = subDays(new Date(), 1);
    const start = startOfDay(yesterday);
    const end = endOfDay(yesterday);

    // Find all connection requests from yesterday
    const requests = await ConnectionRequestModel.find({
      createdAt: { $gte: start, $lte: end },
    });

    // Send emails to those users
    for (const request of requests) {
      await sendEmail(request.userEmail, "You have new friend requests!");
    }

    console.log("✅ Emails sent successfully at 8 AM!");
  } catch (error) {
    console.error("❌ Error sending emails:", error);
  }
});
```

✨ **Tip:**
To activate this cron job, make sure to **require this file** in your main app (e.g., `app.js`):

```js
require("./utils/cronjob");
```

---

## ⏱️ Time Handling Libraries

Working with dates manually can get messy! 🌀
So, developers use libraries to manage time and dates easily.

### 📦 Popular Libraries

| Library       | Description               | Note                                      |
| :------------ | :------------------------ | :---------------------------------------- |
| **Moment.js** | Powerful and feature-rich | ⚠️ Heavy and not actively recommended now |
| **Date-fns**  | Lightweight and modern    | ✅ Preferred for new projects              |

👉 **Date-fns** helps with:

* Getting **yesterday’s** date (`subDays`)
* Formatting dates
* Calculating durations or ranges (like start/end of day)

Example:

```js
const { subDays, startOfDay, endOfDay } = require("date-fns");

const yesterday = subDays(new Date(), 1);
console.log("Yesterday was:", yesterday);
```

---

## 📊 Visual Flow of Cron Jobs

```mermaid
flowchart TD
    A[🕐 Cron Scheduler] --> B[🧾 Cron Expression]
    B --> C[⚙️ Task Function (Your Code)]
    C --> D[📬 Send Email / Run Script / Log Data]
    D --> E[✅ Task Completed]
```

✨ **Remember:**
👉 Cron jobs are like **automatic reminders** for your computer — they run exactly when you tell them to.

---

## 🪄 Extra Tips & Mnemonics

💭 **Mnemonic for Cron Order:**

> “**Some Minutes Have Days, Months, Weeks**”
> (Seconds, Minutes, Hours, Day of Month, Month, Day of Week)

💡 **Pro Tip:**
When testing your cron jobs:

* Start with `"* * * * * *"` → runs every second, helps you debug fast.
* Once confirmed, switch to your actual timing (like `"0 8 * * *"`).

💡 **Logging tip:**
Always add `console.log()` inside your cron callback so you can see if it’s running properly.

---

## 🧾 Summary

| Concept            | Explanation                                     |
| :----------------- | :---------------------------------------------- |
| **Cron Job**       | Scheduled code that runs automatically          |
| **Package Used**   | `node-cron`                                     |
| **Syntax**         | `* * * * * *` (second → week)                   |
| **Optional Field** | Seconds                                         |
| **Helper Site**    | [Crontab Guru](https://crontab.guru)            |
| **Date Handling**  | `date-fns` (lightweight) or `moment.js` (heavy) |

---

## 📸 Image Placeholder Section

You can later add lecture screenshots here:
![Insert Image Here](image_placeholder.png)

---

> 🧡 **Final Thought:**
> Cron Jobs make your backend feel alive — it keeps working even when you’re not online! 🌙

---

```

---

