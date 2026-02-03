import mongoose from 'mongoose'

 async function  dbconnection(){
     try {
      const URL=process.env.MONGO_URI;

   const con=  await mongoose.connect(URL);
   console.log("connected to mongodb");
 } catch (error) {
    console.error("MongoDB connection failed:  ", error.message);
    process.exit(1);
 }
  

}
export default dbconnection;