import {
    createTaskService,
    getTasksService,
    deleteTaskService,
    updateTaskService,searchTasksService
} from "../services/taskService.js";

// CREATE TASK

export const createtasks = async (req, res) => {
    try {
        if ( !req.body  ) {
            return res.status(400).json({ message: "Body undefined" });
        }

         const { title, userid } = req.body;

     if (!title || !userid) {
            return res.status(400).json({ message: "All required fields needed" });
        }

        const task = await createTaskService(req.body);

        res.status(201).json({
             message: "Task created",
            task
        });

    } catch(error) {
        if(error.message === "TASK_CREATE_FAILED") {
            return res.status(400).json({ message: "Something  went  wrong" });
        }

        console.log(error);

        res.status(500).json({ message: "Server error" });
    }
};

// GET TASKS
export const gettasks = async (req, res) => {
    try {

        const { userid } = req.params;
      
        if (!userid) {
             return res.status(400).json({ message: "ID REQUIRED" });
        }

const tasks = await getTasksService(userid);

        res.status(200).json({ tasks });

    } catch (error) {
        if (error.message === "NO_TASKS") {
            return res.status(404).json({ message: "No tasks found" });
        }

          console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

// DELETE TASK
export const deletetask = async (req, res) => {
    try {

        const { userid, taskid } = req.params;

        if (!userid || !taskid) {
            return res.status(400).json({
                message: "userid or taskid missing"
            });
        }

        await deleteTaskService(userid, taskid);


        res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        if (error.message === "TASK_DELETE_FAILED") {
            return res.status(400).json({ message: "Something went wrong" });
        }

        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE TASK

export const updatetask = async (req, res) => {
    try {
        const { userid, taskid } = req.params;

        if (!userid || !taskid) {
            return res.status(400).json({
                message: "userid or taskid missing"
            });
        }

        const { title, description, status, duedate, category } = req.body;

           const updates = {};
         if (title) updates.title = title;
        if (description) updates.description = description;
         if (status !== undefined) updates.status = status;
         if (duedate) updates.duedate = duedate;
        if (category) updates.category = category;

         const task = await updateTaskService(userid, taskid, updates);

        res.status(200).json({
               message: "Task updated successfully",
             task
        });

    } catch (error) {

         if (error.message === "NO_UPDATE_FIELDS") {
             return res.status(400).json({ message: " No fields to update" });
        }

        if (error.message === "TASK_NOT_FOUND") {
            return res.status(404).json({ message: "Task not found" });
        }

               console.log(error);
        res.status(500).json({ message: " Server error " });
    }
};
export const searchTasks = async (req, res) => {
    try {
        const userid = req.user.id; // assuming auth middleware
        const { q } = req.query;
        
console.log(userid,q);
         const tasks = await searchTasksService(userid, q);

        res.status(200).json({
            success: true,
             tasks
        }); 

    } catch (error) {
        res.status(400).json({
            success: false,
             message: error.message
        });
    }
};