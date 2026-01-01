# ✅ To-Do Pro – Full Stack Task Management App

To-Do Pro is a **full-stack task management application** built using **React (Frontend)** and **Flask + MySQL (Backend)**.  
It supports **user authentication**, **task CRUD operations**, and a **clean dashboard UI**, making it suitable for real-world use and portfolio showcasing.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT-based authentication
- Secure password hashing

### 📝 Task Management
- Add new tasks
- Edit task title (inline)
- Mark tasks as completed / pending
- Delete tasks
- Tasks are user-specific (multi-user support)

### 📊 Dashboard
- Total tasks count
- Completed tasks count
- Pending tasks count
- Search tasks by title
- Filter tasks (All / Completed / Pending)

### 🎨 UI / UX
- Clean and responsive dashboard
- Small action buttons (Edit ✏️ / Delete 🗑️)
- Proper spacing and readable inputs
- Production-style layout

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- CSS (custom styling)

### Backend
- Python Flask
- MySQL
- JWT (JSON Web Tokens)
- Flask-CORS
- Werkzeug (password hashing)

---

## 📂 Project Structure

To-Do-Pro/
│
├── backend/
│ ├── app.py
│ ├── auth.py
│ ├── db.py
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Navbar.js
│ │ │ ├── Login.js
│ │ │ ├── Register.js
│ │ │ └── Dashboard.js
│ │ ├── styles/
│ │ │ └── Todo.css
│ │ ├── api.js
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
└── README.md

pgsql
Copy code

---

## ⚙️ Backend Setup (Flask + MySQL)

### 1️⃣ Create MySQL Database

```sql
CREATE DATABASE todo_pro;

USE todo_pro;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  completed BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
2️⃣ Install Backend Dependencies
bash
Copy code
cd backend
pip install -r requirements.txt
3️⃣ Run Backend Server
bash
Copy code
python app.py
Backend will run at:

cpp
Copy code
http://127.0.0.1:5000
💻 Frontend Setup (React)
1️⃣ Install Dependencies
bash
Copy code
cd frontend
npm install
2️⃣ Start React App
bash
Copy code
npm start
Frontend will run at:

arduino
Copy code
http://localhost:3000
🔐 API Authentication
JWT token is returned on successful login

Token is stored in localStorage

Axios interceptor automatically attaches token to API requests

📌 How to Use
Register a new account

Login with registered credentials

Add tasks from the dashboard

Edit tasks by clicking ✏️

Delete tasks using 🗑️

Use filters and search for better task management

🌍 Deployment (Optional)
Frontend: Vercel / Netlify

Backend: Render / Railway

Database: Railway MySQL / PlanetScale

👨‍💻 Author
Vivek Chaudhary
Final Year B.Tech (CSE)
Full Stack Developer (React | Node | Flask | MySQL)

