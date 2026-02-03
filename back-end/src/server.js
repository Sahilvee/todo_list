import dotenv from 'dotenv'

import dbconnection from '../config/db.connection.js';
dotenv.config();

import app from "./app.js"

const port=process.env.PORT;
dbconnection();

app.listen(port,()=>{
    console.log(`server is running in port ${port}`);
})