import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TrashIcon,
  PencilSquareIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import "tailwindcss";

function Home() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

const [editTask, setEditTask] = useState(null);

const [editTitle, setEditTitle] = useState("");
const [editDescription, setEditDescription] = useState("");
const [editDueDate, setEditDueDate] = useState("");
const [editStatus, setEditStatus] = useState(false);
const [editCategory, setEditCategory] = useState("");



const [viewTask, setViewTask] = useState(null);

  const userId = localStorage.getItem("userId");

  /*fetch tasks*/
  useEffect(() => {
    async function fetchTasks() {
       try {
        const res = await axios.get(
           `https://todo-list-hnig.onrender.com/tasks/${userId}`
        );
     
       setTasks(res.data.task || []);
      } catch (err) {
        setError("Failed to load tasks");
      }
    }

              if (userId) fetchTasks();
  },  [userId]);

  /*        add task */
   const addTask = async () => {
                  if (!title.trim()) return;

    try {
      const res = await axios.post("https://todo-list-hnig.onrender.com/tasks", {
          title,
         userid: userId,
        duedate: dueDate,
      });

       setTasks([res.data.task, ...tasks]);
       setTitle("");
      setDueDate("");
    } catch (err) {
       setError("Failed to add task");
    }
  };
const updateTask = async () => {
  try {
    const res = await axios.patch(
      `https://todo-list-hnig.onrender.com/${userId}/${editTask._id}`,
      {
        title: editTitle,
        description: editDescription,
        duedate: editDueDate,
        status: editStatus,
        category: editCategory,
      }
    );

    setTasks(
      tasks.map((task) =>
        task._id === editTask._id ? res.data.task : task
      )
    );

    setEditTask(null); // close modal
  } catch (err) {
    setError("Failed to update task");
  }
};



  /* toggle*/
  const toggleStatus = async (taskId, status) => {
 try {
      await axios.patch(`https://todo-list-hnig.onrender.com/tasks/${userId}/${taskId}`, {
        status: !status,
      });

      setTasks(
         tasks.map((task) =>
           task._id === taskId
              ? { ...task, status: !status }
            : task
        )
      );
    } catch (err) {
      setError("Failed to update status");
    }
  };

             //delete
  const  deleteTask = async (taskId) => {
    try {
        console.log(`userid:${userId}`,`taskid${taskId}`)
    await axios.delete(`https://todo-list-hnig.onrender.com/tasks/${userId}/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  return (
    <div className="bg-white h-[90vh]">
    <div className="border p-5 flex gap-3">
            <input
          type="text"
          value={title}
                    placeholder="Enter task..."
             onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
        />

           <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
            className="border px-3 py-2 rounded"
        /><button
          onClick={addTask}
             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Task
        </button>
      </div>

           {/* error show here */}
      {error && (
             <div className="bg-red-100 text-red-700 p-2 m-4 rounded">
          {error}
           </div>
      )}

      {/* task list */}
      <div className="p-5 h-[80vh] overflow-auto space-y-3">
            {tasks.length === 0 && (
          <p className="text-gray-400 text-center">No tasks yet</p>
        )}
        {console.log(tasks)}

                   {tasks.map((task) => (
          <div  onClick={() => setViewTask(task)}
            key={task._id}
            className="flex justify-between items-start border p-4 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
          
                      <div className="flex gap-3"> <button 
                           onClick={(e) =>{e.stopPropagation(); toggleStatus(task._id, task.status)}}
                className={`mt-1 ${
                          task.status
                    ? "text-green-600"
                    : "text-gray-400 hover:text-green-600"
                }`}
              >
                        <CheckCircleIcon className="w-6 h-6" />
              </button>

              <div>
                <p
                  className={`font-medium ${
                    task.status
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.title}
                </p>

                {task.duedate && (
                           <p className="text-sm text-gray-500">
                    Due: {task.duedate}
                  </p>
                )}
   <span
                           className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                    task.status
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status ? "Completed" : "Pending"}
                </span>
              </div>
          </div>

         
            <div className="flex gap-3">
          <button
  onClick={(e) => {
    e.stopPropagation();
    setEditTask(task);
    setEditTitle(task.title || "");
    setEditDescription(task.description || "");
    setEditDueDate(task.duedate || "");
    setEditStatus(task.status || false);
    setEditCategory(task.category || "");
  }}
  title="Edit Task"
  className="p-2 rounded-full hover:bg-blue-100 text-blue-600"
>
  <PencilSquareIcon className="w-5 h-5" />
</button>



              <button
                onClick={(e) =>{e.stopPropagation(); deleteTask(task._id)}}
                title="Delete"
                className="p-2 rounded-full hover:bg-red-100 text-red-600"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {editTask && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6  shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

      {/* Title */}
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        placeholder="Title"
        className="w-full border px-3 py-2 rounded mb-3"
      />

      {/* Description */}
      <textarea
        value={editDescription}
        onChange={(e) => setEditDescription(e.target.value)}
        placeholder="Description"
        rows={3}
        className="w-full border px-3 py-2 rounded mb-3"
      />

      {/* Category */}
      <input
        type="text"
        value={editCategory}
        onChange={(e) => setEditCategory(e.target.value)}
        placeholder="Category"
        className="w-full border px-3 py-2 rounded mb-3"
      />

      {/* Due Date */}
      <input
        type="date"
        value={editDueDate}
        onChange={(e) => setEditDueDate(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-3"
      />

      {/* Status */}
      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={editStatus}
          onChange={(e) => setEditStatus(e.target.checked)}
        />
        Mark as completed
      </label>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setEditTask(null)}
          className="px-4 py-2 rounded border"
        >
          Cancel
        </button>
        <button
          onClick={updateTask}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
{viewTask && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Task Details</h2>

      <div className="space-y-2 text-sm">
        <p>
          <span className="font-medium">Title:</span>{" "}
          {viewTask.title}
        </p>

        {viewTask.description && (
          <p>
            <span className="font-medium">Description:</span>{" "}
            {viewTask.description}
          </p>
        )}

        {viewTask.category && (
          <p>
            <span className="font-medium">Category:</span>{" "}
            {viewTask.category}
          </p>
        )}

        {viewTask.duedate && (
          <p>
            <span className="font-medium">Due Date:</span>{" "}
            {viewTask.duedate}
          </p>
        )}

        <p>
          <span className="font-medium">Status:</span>{" "}
          <span
            className={`px-2 py-0.5 rounded text-xs ${
              viewTask.status
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {viewTask.status ? "Completed" : "Pending"}
          </span>
        </p>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => setViewTask(null)}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


    </div>
    
    
  );
}

export default Home;
