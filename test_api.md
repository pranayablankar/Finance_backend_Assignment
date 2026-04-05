# Finance API - Postman Tester Guide
# All APIs tested using Postman. JWT-based authentication and role-based access control implemented.

## Setup

**Base URL:** `http://localhost:5000/api`
**deployed URL:**  https://finance-backend-api-n3ir.onrender.com

**Before testing:**
1. Start MongoDB: `brew services start mongodb-community` (macOS)
2. Start server: `npm run dev`
3. Seed data: `npm run seed`

**Auth Header (add to all protected routes):**
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## Step 1 — Health Check (No Auth)
**Base URL:** `http://localhost:5000/api/health`
**Base url:** `https://finance-backend-api-n3ir.onrender.com/api/health`

**GET** `/health`

Expected: `200 OK`
```json
{
  "status": "Backend is running"
}
```

---

## Step 2 — Authentication

### Register
**POST** `/auth/register`
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "role": "analyst"
}
```

### Login ⬅ Copy the token from here
**POST** `/auth/login`
```json
{
  "email": "analyst@example.com",
  "password": "password123"
}
```
Response gives you `token` — paste it in your Authorization header.

**Admin login:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

### Get Current User
**GET** `/auth/me`
> Requires: Auth header

---

## Step 3 — Financial Records

### Create Record
**POST** `/records`
> Requires: Auth (Analyst or Admin)
```json
{
  "amount": 5000,
  "type": "income",
  "category": "salary",
  "date": "2026-04-01T00:00:00Z",
  "note": "Monthly salary"
}
```
Save the `_id` from response for update/delete.

**Valid types:** `income` | `expense`

**Valid categories:**
- Income: `salary`, `freelance`, `investment`, `bonus`
- Expense: `food`, `transportation`, `utilities`, `entertainment`, `healthcare`, `education`, `other`

### Get All Records
**GET** `/records`
> Requires: Auth

**With filters:**
```
GET /records?type=income&category=salary&startDate=2026-01-01&endDate=2026-12-31&limit=20&skip=0
```

### Get Single Record
**GET** `/records/RECORD_ID_HERE`
> Requires: Auth

### Update Record
**PUT** `/records/RECORD_ID_HERE`
> Requires: Auth (Analyst or Admin)
```json
{
  "amount": 5500,
  "note": "Salary with bonus"
}
```

### Delete Record
**DELETE** `/records/RECORD_ID_HERE`
> Requires: Auth (Analyst or Admin)

---

## Step 4 — Dashboard

All dashboard endpoints require Auth header.

### Summary
**GET** `/dashboard/summary`

Response:
```json
{
  "totalIncome": 50000,
  "totalExpense": 15000,
  "netBalance": 35000,
  "recordCount": 25
}
```

### Monthly Trend
**GET** `/dashboard/trend?months=6`

### Recent Activity
**GET** `/dashboard/activity?limit=10`

### Full Dashboard (all in one)
**GET** `/dashboard/full`

---

## Step 5 — Users (Admin Token Only)

Login as admin first: `admin@example.com / password123`

### Get All Users
**GET** `/users`

### Get User by ID
**GET** `/users/USER_ID_HERE`

### Update User
**PUT** `/users/USER_ID_HERE`
```json
{
  "name": "New Name",
  "role": "analyst",
  "isActive": true
}
```

---

## Test Accounts (after npm run seed)

| Role    | Email                  | Password    | Can do                        |
|---------|------------------------|-------------|-------------------------------|
| Viewer  | viewer@example.com     | password123 | Read own records only         |
| Analyst | analyst@example.com    | password123 | Create/edit/delete own records|
| Admin   | admin@example.com      | password123 | Full access + user management |

---

## All 16 Endpoints Checklist

```
[ ] GET  /health
[ ] POST /auth/register
[ ] POST /auth/login
[ ] GET  /auth/me
[ ] POST /records
[ ] GET  /records
[ ] GET  /records/:id
[ ] PUT  /records/:id
[ ] DEL  /records/:id
[ ] GET  /dashboard/summary
[ ] GET  /dashboard/trend
[ ] GET  /dashboard/activity
[ ] GET  /dashboard/full
[ ] GET  /users          (admin)
[ ] GET  /users/:id      (admin)
[ ] PUT  /users/:id      (admin)
```

---

## Common Errors

| Error | Fix |
|-------|-----|
| `404` on all routes | MongoDB not running |
| `401 Unauthorized` | Missing or expired token — login again |
| `403 Forbidden` | Wrong role (e.g. viewer trying to create) |
| `MongooseServerSelectionError` | Start MongoDB first |
