# 💰 Finance Backend API

Backend system for managing financial records with role-based access control and dashboard analytics.



---

## 🚀 Quick Start

1. `npm install`
2. Create `.env` with `MONGO_URI=your_mongodb_connection_string` (see Notes)
3. `npm run seed` (optional test data)
4. `npm run dev`
# .env  example
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-dashboard
JWT_SECRET=your_secret_key_
NODE_ENV=development
API: http://localhost:5000/api

## 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB
* JWT Authentication

---

## 🌐 Base URL

```
http://localhost:5000/api
```

---

## 🔐 Authentication

Add header for protected routes:

```
Authorization: Bearer YOUR_TOKEN
```

---

## 📌 Main APIs

### 🔹 Auth

* POST `/auth/register`
* POST `/auth/login`
* GET `/auth/me`

---

### 🔹 Records

* POST `/records` (Analyst/Admin)
* GET `/records`
* GET `/records/:id`
* PUT `/records/:id` (Analyst/Admin)
* DELETE `/records/:id` (Analyst/Admin)

---

### 🔹 Dashboard

* GET `/dashboard/summary`
* GET `/dashboard/trend`
* GET `/dashboard/activity`
* GET `/dashboard/full`

---

### 🔹 Users (Admin Only)

* GET `/users`
* GET `/users/:id`
* PUT `/users/:id`

---

## 📊 Sample Request

### Create Record

```json
{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2026-04-01",
  "note": "Monthly salary"
}
```

---

## 🔐 Roles

| Role    | Access             |
| ------- | ------------------ |
| Viewer  | Read only          |
| Analyst | Manage own records |
| Admin   | Full access        |

---

## ⚙️ Run Locally

```
npm install
npm run seed
npm run dev
```

---

## 🧪 Test Accounts

```
viewer@example.com / password123
analyst@example.com / password123
admin@example.com / password123
```

---

## 📌 Notes

* JWT-based authentication
* Role-based access control
* MongoDB used for storage
* All APIs tested using Postman

---
