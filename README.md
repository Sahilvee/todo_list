# 📝 To-Do List Application (MERN Stack)

---

## 🌐 Deployment

* **Frontend (Netlify):**
  https://todolist0tutedude.netlify.app/

* **Backend (Render):**
  https://todo-list-hnig.onrender.com

---

## 🔑 Demo Credentials

* **Username:** Sahil
* **Password:** 123456

---

## 📌 Project Overview

This is a **full-stack To-Do List application** built using the MERN stack:

* **MongoDB**
* **Express.js**
* **React.js**
* **Node.js**

The application is divided into:

* **Part 1:** Backend API development
* **Part 2:** Frontend integration with React

### 🎯 Goal

To build a **scalable, structured, and fully functional** task management system with real-time UI updates and secure authentication.

---

## 🎯 Objectives

### Backend (Node.js + Express + MongoDB)

* Build RESTful APIs
* Follow **MVC architecture (Controller–Service–Routes)**
* Implement validation & error handling
* Test APIs using Postman

### Frontend (React)

* Integrate APIs with UI
* Perform full CRUD operations
* Handle loading & error states
* Deploy production-ready app

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* dotenv

### Frontend

* React.js
* Axios
* Tailwind CSS
* React Router

### Tools

* Postman
* Git & GitHub
* Netlify (Frontend)
* Render (Backend)

---

## 📂 Project Structure

### Backend

```
backend/
│── controllers/
│── services/
│── routes/
│── models/
│── middlewares/
│── config/
│── server.js
│── .env
```

### Frontend

```
frontend/
│── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
```

---

## 🔑 Environment Variables

Create a `.env` file in backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🚀 Setup Instructions

### Backend

```
cd backend
npm install
npm run dev
```

Server runs on:

```
http://localhost:5000
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🛡 Additional Features

* Protected routes (Frontend & Backend)
* JWT-based authentication
* Password hashing using bcrypt
* Custom 404 Not Found page
* Scalable role-based structure (extendable)

---

## 🎨 Frontend Features

* Dynamic task rendering
* Real-time updates
* Toast notifications
* Error handling
* Responsive UI
* Search functionality

---

## 🔗 API Documentation

### 🌐 Base URL

```
https://todo-list-hnig.onrender.com
```

---

## 🔐 Authentication APIs

### 1️⃣ Signup

**POST /auth/signup**

Register a new user

**Request**

```json
{
  "name": "Sahil",
  "email": "sahil@gmail.com",
  "password": "123456"
}
```

**Response**

```json
{
  "message": "User created successfully",
  "user": {
    "_id": "userId",
    "name": "Sahil",
    "email": "sahil@gmail.com"
  }
}
```

---

### 2️⃣ Login

**POST /auth/login**

Login user and receive token

**Request**

```json
{
  "email": "sahil@gmail.com",
  "password": "123456"
}
```

**Response**

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN",
  "userId": "userId"
}
```

---

## 🔒 Protected Routes

All routes below require:

```
Authorization: Bearer <token>
```

---

## 👤 User APIs

### 3️⃣ Get User Profile

**GET /users/:id**

**Response**

```json
{
  "user": {
    "_id": "userId",
    "name": "Sahil",
    "email": "sahil@gmail.com",
    "createdAt": "date"
  }
}
```

---

### 4️⃣ Update User (Name Only)

**PATCH /users/:id**

**Request**

```json
{
  "name": "New Name"
}
```

**Response**

```json
{
  "message": "User updated successfully",
  "user": {
    "_id": "userId",
    "name": "New Name"
  }
}
```

---

## ✅ Task APIs

### 5️⃣ Get All Tasks

**GET /tasks/:userid**

**Response**

```json
{
  "tasks": [
    {
      "_id": "taskId",
      "title": "Task 1",
      "description": "Desc",
      "category": "Work",
      "status": false,
      "duedate": "2026-03-20"
    }
  ]
}
```

---

### 6️⃣ Create Task

**POST /tasks**

**Request**

```json
{
  "title": "New Task",
  "description": "Task description",
  "category": "Study",
  "userid": "userId",
  "duedate": "2026-03-25",
  "status": false
}
```

---

### 7️⃣ Update Task

**PATCH /tasks/:userid/:taskid**

**Request**

```json
{
  "title": "Updated Task",
  "description": "Updated desc",
  "category": "Work",
  "status": true,
  "duedate": "2026-03-30"
}
```

---

### 8️⃣ Delete Task

**DELETE /tasks/:userid/:taskid**

**Response**

```json
{
  "message": "Task deleted successfully"
}
```

---

### 9️⃣ Toggle Task Status

(Handled via update API)

```json
{
  "status": true
}
```

---

### 🔍 🔟 Search Tasks

**GET /tasks/search?query=keyword**

Search by:

* Title
* Description
* Category

---

## ⚠️ Error Responses

```json
{
  "error": "Unauthorized"
}
```

```json
{
  "error": "Task not found"
}
```

---

## 🧪 Testing

* Use **Postman**
* Add header:

```
Authorization: Bearer <token>
```

---

## ⚠️ Challenges & Solutions

### 1️⃣ API–Frontend Integration

* **Problem:** Data not updating instantly
* **Solution:** Fixed state updates & useEffect dependencies

### 2️⃣ Infinite API Calls

* **Problem:** Wrong dependencies
* **Solution:** Optimized dependency arrays

### 3️⃣ Error Handling

* **Problem:** Unclear responses
* **Solution:** Centralized error handling

---

## 🚀 Future Improvements

* Advanced search & filters
* Role-based authorization
* Notifications
* CI/CD pipeline integration

---


