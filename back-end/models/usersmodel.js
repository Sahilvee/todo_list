import mongoose from "mongoose";
const userscheme = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,lowercase:true},
    password:{type:String,minlength:5,required:true}
},{timestamps:true}
);

const User= mongoose.model("User",userscheme);
export default User;