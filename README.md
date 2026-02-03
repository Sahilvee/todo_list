                        📝 To-Do List Application (MERN Stack)
                                 🌐 Deployment

Backend: Hosted on Render

Frontend: Hosted on Netlify

🔗 Live App:
👉 netlify front-end [todolist0tutedude.netlify.app](https://todolist0tutedude.netlify.app/)

 👉render back-end  [([https://todo-list-hnig.onrender.com](https://todo-list-hnig.onrender.com/))


          📌 Project Overview

This project is a full-stack To-Do List application built using Node.js, Express.js, MongoDB, and React.
It is divided into two parts:

Part 1: Backend API implementation
Part 2: Frontend integration with React

The goal is to build a scalable, well-structured, and fully functional To-Do app with proper API integration and UI updates.

🎯 Objectives


Part 1: Backend (Node.js + Express + MongoDB)
Build RESTful APIs for a To-Do List application
Follow MVC (Controller–Service–Routes) architecture
Handle errors and validations properly
Test APIs using Postman

Part 2: Frontend (React)
Integrate backend APIs with React frontend
Perform CRUD operations on tasks
Update UI dynamically based on API responses
Handle loading states and errors
Deploy frontend and backend

🛠 Tech Stack
Backend
Node.js
Express.js
MongoDB
Mongoose
JWT (Authentication)
dotenv
Frontend
React.js
Axios
Tailwind CSS
React Router
Tools
Postman (API testing)
Git & GitHub

Netlify (Frontend Deployment)
Render (Backend Deployment)

📂 Project Structure
Backend
backend/
│── controllers/
│── services/
│── routes/
│── models/
│── middlewares/
│── config/
│── server.js
│── .env

Frontend
frontend/
│── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx

🔑 Environment Variables

Create a .env file in the backend root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

🚀 Backend Setup & Run
#  Navigate to backend
cd  backend

#  Install dependencies
npm install

#   Run server
npm run dev


Server will start on:
http://localhost:5000

🚀     Frontend Setup & Run
# Navigate to frontend
cd   frontend

# Install dependencies
npm  install

#  Start React  app
npm  run dev


Frontend  runs on:

http://localhost:5173

🔗  API Features Implemented

Get  all  tasks
Create  a new task
Update  task details
Delete  a task
Update  task status
Search  tasks (not yet )
User  authentication
User  profile API

🧪 API Testing

All APIs were tested using Postman:

Correct status codes
Error handling
Validation checks
Authentication flow

🎨 Frontend Features

Dynamic task rendering
Real-time UI updates
Loading indicators
Error handling
Responsive desig
User-friendly interface



⚠️ Challenges Faced & Solutions
1️⃣ API–Frontend Integration

Problem: Data was not updating  instantly
Solution: Used proper state management and dependency handling in useEffect

2️⃣ Infinite API Calls

Problem: useEffect dependency mistakes
Solution: Removed unnecessary dependencies and followed React best practices

3️⃣ Error Handling

Problem: Unclear error responses
Solution: Implemented centralized error handling in backend and frontend

