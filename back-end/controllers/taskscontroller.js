import Task from "../models/taskmodel.js";
//create task
export const createtasks= async(req,res)=>{
     try {
      if(!req.body){
          return  res.status(400).json({message:"Body undefined"});
      }
       const {title,description,status,category,userid,duedate}=req.body;
       if(!title||!userid){
       return res.status(400).json({message:"All required field needed"});
       }

      const task= await Task.create({title:title,description:description,status:status,duedate:duedate,userid:userid,category:category});
   
      if(!task){
          return  res.status(400).json({message:"something went wrong"});
      }
      console.log(task)
       res.status(201).json({task,message:"Task created "})
     } catch (error) {
      console.log(error);
      res.status(500).json({message:"Server error.."});
     }
}

//get task
export const gettasks=async(req,res)=>{
    try {
        

const{userid}=req.params;
if(!userid){
    return res.status(400).json({message:"ID REQUIRED"});
}
const task= await Task.find({userid:userid});
if(task.length===0){
 return  res.status(404).json({message:"no task found"});
}
res.status(200).json({task})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error"});
    }


}
//delete task

export const deletetask= async(req,res)=>{
   
    try{
   const {userid,taskid}=req.params;

   if(!userid||!taskid){
    return res.status(400).json({message:"bad request userid or taskid is not there "});
   }
   const reply= await Task.findOneAndDelete({userid:userid,_id:taskid});
   if(!reply){
    res.status(400).json({message:"something went wrong"});

   }
   res.status(200).json({message:"task deleted successfuly"});

    }catch(error){
console.log(error);
res.status(500).json({message:"server  error"});

    }
}

//update task
export const updatetask = async (req, res) => {
  try {
    const { userid, taskid } = req.params;

    if (!userid || !taskid) {
      return res.status(400).json({ message: "userid or taskid missing" });
    }

   
    const updates = {};
    const { title, description, status, duedate, category } = req.body;

     if (title) updates.title = title;
     if (description) updates.description = description;
    if (status !== undefined) updates.status = status;
    if (duedate) updates.duedate = duedate;
    if (category) updates.category = category;

       if (Object.keys(updates).length === 0) { return res.status(400).json({ message: "No fields to update" });
    }

      const task = await Task.findOneAndUpdate(
       { _id: taskid, userid: userid },
      { $set: updates },
      { new: true } //return the new updated task
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
 console.log(task)
    res.status(200).json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
     console.log(error);
     res.status(500).json({ message: "Server error" });
  }
};
