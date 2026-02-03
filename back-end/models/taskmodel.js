import mongoose from 'mongoose';

const taskscheme= new  mongoose.Schema(
    {
        title:{type:String,required:true,trim:true},
        description:{type:String,trim:true},
        status:{type:Boolean,default:false},
        category:{type:String,trim:true},
        duedate:{type:Date}
        ,
        userid:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        }

    },{timestamps:true}
)
 const Task= mongoose.model("Task",taskscheme);
 export default Task;