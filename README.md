# 📦 Inventory Management System (MERN Stack)

This is a full-stack inventory management web application where users can register, log in, and manage products (CRUD operations) with image upload support.

---

## 🚀 Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React, Redux Toolkit, Vite, TailwindCSS |
| Backend | Node.js, Express.js, JWT Authentication |
| Database | MongoDB (Compass / Atlas) |

---

## ✨ Features

- User Authentication (Register + Login)
- Add, Edit, Delete Products
- Product Thumbnail Upload
- Protected Routes & Secure APIs
- Single command start (Frontend + Backend together)

---

## 📁 Project Structure

InventoryManagment-Fullstack/
├── Backend/
├── Frontend/
├── Database_Export/
│ ├── users.json
│ └── products.json
├── .env (included in backend)
├── README.md
└── DemoCredentials.txt


---

## ⚙️ Installation & Run :-

### 1️⃣ Install Dependencies

cd backend && npm install
cd ../frontend && npm install

2️⃣ Environment Variables
(Already included inside backend folder – nothing to create)

Backend .env:

3️⃣ Start Full Project :-
  
npm run dev      (This command will start both backend & frontend together)

Database Export :-
Database_Export/
 ├─ products.json
 └─ users.json

To import:

MongoDB Compass → Select DB → Import JSON → choose file

#Demo Credentials are also available in RootFolder