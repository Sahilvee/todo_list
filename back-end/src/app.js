import express from 'express'
import cors from 'cors'
import authroutes from '../routes/auth.js' 
import userroutes from '../routes/users.js'
import tasksroutes from '../routes/tasks.js'
import { protect } from "../middleware/authMiddleware.js";

const app=express();

app.use(express.json()); 
app.use(cors());
app.use("/auth",authroutes);
app.use("/users",protect,userroutes);
app.use("/tasks",protect,tasksroutes);
app.get("/", (req, res) => {
     res.send("Backend API is running! ");
});

export default app;