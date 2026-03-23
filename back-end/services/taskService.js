import Task from "../models/taskmodel.js";

// create task
export const createTaskService = async (data) => {
     const task = await Task.create(data);
    if (!task) {
        throw new Error("TASK_CREATE_FAILED");
    }

    return task;
};

// get tasks
export const getTasksService = async (userid) => {
    const tasks = await Task.find({ userid });
  
    if (!tasks || tasks.length === 0) {
        throw new Error("NO_TASKS");
    }

    return tasks;
};
 

// delete task
export const deleteTaskService = async (userid, taskid) => {
    const result = await Task.findOneAndDelete({ userid, _id: taskid });

    if (!result) {
         throw  new  Error("TASK_DELETE_FAILED");
    }

    return true;
};

// update task
export  const updateTaskService = async (userid, taskid, updates) => {

    if  (Object.keys(updates).length === 0)  {
        throw new Error("NO_UPDATE_FIELDS");
    }

    const  task = await Task.findOneAndUpdate(
         { _id: taskid, userid },
         { $set: updates },
        { new: true }
    );

     if (!task) {
        throw new Error("TASK_NOT_FOUND");
    }

     return task;
};
export const searchTasksService = async (userid, query) => {

     if (!query || query.trim() === "") {
         throw new Error("EMPTY_SEARCH_QUERY");
    }

    const tasks = await Task.find({
        userid,
        $or: [
            { title: { $regex: query, $options: "i" } },        // case-insensitive
              { description: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
            
        ]

    });

     return tasks;
};