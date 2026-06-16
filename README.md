# 🗂 MEAN Task Manager — B9IS130

A full-stack Task Manager built with the MEAN stack:
- **M**ongoDB — database (stores tasks)
- **E**xpress — REST API backend
- **A**ngular — frontend UI
- **N**ode.js — runs the server

---

## ⚡ QUICK START — Run Locally

### STEP 1 — Install Node.js (if you don't have it)
Download from: https://nodejs.org  
Choose the **LTS** version. After installing, check it works:
```bash
node -v
npm -v
```

---

### STEP 2 — Set Up MongoDB (choose ONE option)

#### Option A: MongoDB Atlas (Cloud — easier, recommended)
1. Go to https://www.mongodb.com/cloud/atlas and create a free account
2. Create a **free M0 cluster**
3. Under "Database Access" → Add a user with a password
4. Under "Network Access" → Add IP → Allow access from anywhere (0.0.0.0/0)
5. Click "Connect" → "Drivers" → Copy your connection string
   It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`

#### Option B: Local MongoDB
1. Download from: https://www.mongodb.com/try/download/community
2. Install and it runs automatically on `mongodb://localhost:27017`

---

### STEP 3 — Configure the Backend

Open `backend/.env` and update the MongoDB URI:

```
# If using Atlas:
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority

# If using local MongoDB:
MONGODB_URI=mongodb://localhost:27017/taskmanager

PORT=3000
```

⚠️ Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your actual Atlas credentials!

---

### STEP 4 — Start the Backend (Express + MongoDB)

Open a terminal:
```bash
# Go into the backend folder
cd mean-task-manager/backend

# Install dependencies
npm install

# Start the server
npm start
```

You should see:
```
✅ MongoDB connected successfully
✅ Express server running on http://localhost:3000
```

Test it works — open your browser and go to:
```
http://localhost:3000/api/health
```
You should see: `{ "status": "ok", "mongodb": "connected" }`

---

### STEP 5 — Start the Frontend (Angular)

Open a **NEW terminal** (keep backend running!):
```bash
# Install Angular CLI globally (only need to do this once)
npm install -g @angular/cli

# Go into the frontend folder
cd mean-task-manager/frontend

# Install dependencies
npm install

# Start Angular dev server
npm start
```

You should see:
```
✔ Compiled successfully.
Local:   http://localhost:4200/
```

---

### STEP 6 — Open the App

Open your browser and go to: **http://localhost:4200**

You should see the MEAN Task Manager app!
- Add tasks → they save to MongoDB
- Toggle complete → updates in MongoDB
- Delete tasks → removes from MongoDB

---

## 📁 Project Structure

```
mean-task-manager/
├── backend/
│   ├── models/
│   │   └── Task.js          ← MongoDB schema (Mongoose)
│   ├── routes/
│   │   └── tasks.js         ← Express API routes
│   ├── server.js            ← Entry point, connects to MongoDB
│   ├── package.json
│   └── .env                 ← ⚠️ Your MongoDB URI goes here
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── task-form/   ← Add task form
│   │   │   │   └── task-list/   ← Display & manage tasks
│   │   │   ├── services/
│   │   │   │   └── task.service.ts  ← Calls Express API
│   │   │   ├── app.component.ts
│   │   │   └── app.module.ts
│   │   ├── environments/
│   │   │   └── environment.ts   ← API URL config
│   │   ├── index.html
│   │   └── main.ts
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get single task |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

---

## 🚀 Push to GitHub

```bash
cd mean-task-manager
git init
git add .
git commit -m "Initial MEAN Stack Task Manager"
git remote add origin https://github.com/YOUR_USERNAME/mean-task-manager-app.git
git push -u origin main
```

---

## ❓ Troubleshooting

| Problem | Fix |
|---------|-----|
| `MongoDB connection error` | Check your URI in `.env` — make sure username/password are correct |
| `Cannot connect to backend` | Make sure backend is running on port 3000 |
| `ng: command not found` | Run `npm install -g @angular/cli` first |
| Atlas connection refused | Go to Network Access in Atlas and allow 0.0.0.0/0 |
