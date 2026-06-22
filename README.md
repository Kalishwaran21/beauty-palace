# 💄 LaraStyles – MERN Stack Beauty Parlor Website

A full-featured premium beauty parlor web application built with the **MERN Stack** (MongoDB, Express, React, Node.js).

---

## 🚀 How to Run

### Step 1 – Start the Backend (Express Server)
Open a terminal in the root project folder and run:
```bash
node server/server.js
```
> The backend runs at **http://localhost:5000**

### Step 2 – Start the Frontend (React + Vite)
Open another terminal in the `/client` folder and run:
```bash
cd client
npm run dev
```
> The frontend runs at **http://localhost:5173**

---

## 🔑 Admin Access

To access the Admin Dashboard, first register an account then manually set `role: "admin"` in MongoDB, OR use this pre-seeded admin:
- **Email:** `admin@larastyles.com`  
- **Password:** `admin123`

> To create admin manually: In MongoDB Compass, find the user and change `role` field to `"admin"`.

---

## 🌱 Seed Services Data

After logging in as Admin, go to the **Admin Dashboard** and click **"🌱 Seed Services"** to populate the database with 8 default services.

---

## 📁 Project Structure

```
beauty-parlor-site/
├── server/               ← Express + Node.js backend
│   ├── models/           ← Mongoose schemas
│   ├── routes/           ← API routes
│   ├── middleware/       ← JWT auth middleware
│   └── server.js         ← Entry point
├── client/               ← React + Vite frontend
│   └── src/
│       ├── pages/        ← All page components
│       ├── components/   ← Navbar, Footer
│       ├── context/      ← AuthContext
│       └── api/          ← Axios instance
├── .env                  ← Environment variables
└── package.json
```

---

## ✨ Features

- 🏠 **Home** – Hero, stats, about, gallery, testimonials
- 💇 **Services** – Live services from database with category filter
- 🖼️ **Gallery** – Masonry-style photo grid
- 📅 **Booking** – Time slot picker with live price summary
- 👤 **Auth** – Register/Login with JWT
- 📋 **My Appointments** – Cancel/view user bookings
- 🛡️ **Admin Dashboard** – Stats, manage bookings, create/edit services

---

## ⚙️ Environment Variables

Edit `.env` file:
```
MONGO_URI=mongodb://localhost:27017/beauty_parlor
JWT_SECRET=your_secret_key
PORT=5000
```
