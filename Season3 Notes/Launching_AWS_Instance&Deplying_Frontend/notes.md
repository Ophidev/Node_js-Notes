
# 🌟 Node.js Session 3 - Episode 1

## 🖥️ Topic: Launching AWS Instance & Deploying DevTinder-Frontend

---

## 📝 Key Points

### 1️⃣ Signup & Setup on AWS ☁️

> 💡 **Remember:** Always use your own AWS account & region for practice.

* **Signup on AWS** ✅

* **Launch an EC2 Instance** 🖥️

  * OS: **Ubuntu**
  * Download your `.pem` key securely

* **Set proper permissions for your key** 🔑

```bash
chmod 400 devTinder-secret.pem   # Makes the key secure
```

> ⚠️ *Tip:* If permissions are too open, SSH will fail.

* **Connect via SSH**

```bash
ssh -i "devTinder-secret.pem" ubuntu@ec2-43-204-96-49.ap-south-1.compute.amazonaws.com
```

> 💡 *Mnemonic:* Think of `.pem` file as your **magic key 🗝️** to enter your AWS server.

---

### 2️⃣ Install Node.js 🔥

* **Install Node.js version 16.17.0**

```bash
nvm install 16.17.0
nvm use 16.17.0
node -v   # Check version
```

> ✅ *Explanation:* Node.js allows your server to run JavaScript apps.
> ⚡ *Quick Tip:* Using `nvm` keeps your Node versions clean and easy to switch.

---

### 3️⃣ Clone Your Project 📂

* **Git clone your repository**

```bash
git clone <your-repo-link>
cd DevTinder-Frontend
```

> 💡 *Tip:* Public repo = easy clone; Private repo = set up SSH keys.

---

### 4️⃣ Frontend Setup 🎨

1. **Install dependencies**

```bash
npm install   # Installs all packages
```

2. **Build the frontend**

```bash
npm run build  # Creates production-ready dist/ folder
```

> ✅ *Explanation:* `dist/` is optimized code ready for deployment.

---

### 5️⃣ Install & Configure Nginx 🌐

1. **Update package lists**

```bash
sudo apt update
```

2. **Install Nginx**

```bash
sudo apt install nginx
```

3. **Start and enable Nginx**

```bash
sudo systemctl start nginx
sudo systemctl enable nginx  # Auto-start on reboot
```

4. **Deploy frontend files**

```bash
sudo cp -r dist/* /var/www/html/
```

> 💡 *Reminder:* `/var/www/html/` is Nginx’s default web root.

5. **Enable HTTP Port 80**

* Open **Inbound rules** in AWS Security Group → allow **HTTP (80)**

---

### 6️⃣ Deployment Flow Diagram 🚀

```mermaid
flowchart TD
    A[👨‍💻 Local Dev Machine] --> B[💾 GitHub Repository]
    B --> C[🌐 EC2 Instance]
    C --> D[📦 Build Frontend (dist/)]
    D --> E[🟢 Nginx (/var/www/html)]
    E --> F[🌍 Browser Access via Port 80]

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#9ff,stroke:#333,stroke-width:2px
    style C fill:#ff9,stroke:#333,stroke-width:2px
    style D fill:#f96,stroke:#333,stroke-width:2px
    style E fill:#6f6,stroke:#333,stroke-width:2px
    style F fill:#6cf,stroke:#333,stroke-width:2px

    click B "https://github.com" "Open GitHub"
```

✨ Extra Tip: Think **pipeline = code → EC2 → browser**.

---

### 7️⃣ Fun Tips & Tricks 🧩

* **SSH Troubleshooting**

  * `Permission denied (publickey)` → check `.pem` file permissions
* **Node.js Management**

  * `nvm` makes switching versions easy
* **Nginx Tips**

  * After copying files, reload Nginx:

```bash
sudo systemctl reload nginx
```

---

### 8️⃣ Screenshots / Images 📸

* AWS Instance setup:
  ![Insert Image Here](aws_instance_placeholder.png)

* Nginx deployment / SCP command:
  ![Insert Image Here](nginx_scp_placeholder.png)

---

### 9️⃣ Quick Cheat Sheet ⚡

| Step                | Command                                      | Note                     |
| ------------------- | -------------------------------------------- | ------------------------ |
| SSH Key Permissions | `chmod 400 devTinder-secret.pem`             | Secure your key          |
| Connect SSH         | `ssh -i "devTinder-secret.pem" ubuntu@<EC2>` | Magic key to server      |
| Node Install        | `nvm install 16.17.0`                        | Version control          |
| Build Frontend      | `npm run build`                              | Output → `dist/`         |
| Deploy              | `sudo cp -r dist/* /var/www/html/`           | Nginx serves these files |
| Enable Nginx        | `sudo systemctl enable nginx`                | Auto start on reboot     |

---

### 10️⃣ Key Takeaways 🏆

* AWS EC2 = your **cloud server playground** 🌤️
* Node.js + npm = **your app’s engine** 🔧
* Nginx = **serves your website to the world** 🌍
* `dist/` folder = **production-ready frontend code** ✅

> 💡 *Mnemonic to remember the workflow:*
> **Code → Build → Deploy → Serve → Browser 🌐**

---


