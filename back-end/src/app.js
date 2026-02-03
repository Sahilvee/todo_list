import express from 'express'
import cors from 'cors'
import authroutes from '../routes/auth.js' 
import userroutes from '../routes/users.js'
import tasksroutes from '../routes/tasks.js'

const app=express();

app.use(express.json()); 
app.use(cors());
app.use("/auth",authroutes);
app.use("/users",userroutes);
app.use("/tasks",tasksroutes);



export default app;