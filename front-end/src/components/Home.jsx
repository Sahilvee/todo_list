import React, { useEffect, useState } from "react";
import api from "../api/api.js";
import {
  TrashIcon,
  PencilSquareIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import "tailwindcss";
import { useOutletContext } from "react-router-dom";


function Home() {
  
   const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

   const [editTask, setEditTask] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
   const [editDueDate, setEditDueDate] = useState("");
   const [editStatus, setEditStatus] = useState(false);
   const [editCategory, setEditCategory] = useState("");

  const [viewTask, setViewTask] = useState(null);

  const [toastMsg, setToastMsg] = useState("");
const [showToast, setShowToast] = useState(false);

 const { search } = useOutletContext();

const triggerToast = (msg) => {
   setToastMsg(msg);
  setShowToast(true);

  setTimeout(() => {
    setShowToast(false);
  }, 2000);
};

  const userId = localStorage.getItem("userId");


  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await api.get(`tasks/${userId}`);
  
        setTasks(res.data.tasks || []);
      } catch (err) {
        setError(err.message);
      }
    }

    if (userId) fetchTasks();
  }, [userId]);

 
  const addTask = async () => {
     if (!title.trim()) return;

    try {   

      const res = await api.post("tasks", {
        title,
      description,category,userid: userId,duedate: dueDate,
        status: false,
      });

      setTasks([res.data.task, ...tasks]);
      triggerToast("Task Added  ✅");

      
      setTitle("");
       setDescription("");
       setCategory("");
       setDueDate("");
    } catch (err) {
      setError("Failed to add task");
    }
  };

  
  const updateTask = async  () => {
    try { 
       const res = await api.patch(
          `tasks/${userId}/${editTask._id}`,
        {
           title: editTitle,
           description: editDescription,
           duedate: editDueDate,
           status: editStatus,
           category: editCategory,
        }
      );

      setTasks (
        tasks.map((task) =>
           task._id === editTask._id ? res.data.task : task
        )
      );
triggerToast("Task Updated ✏️");
       setEditTask(null);
    }  catch  (err) {
      setError("Failed to update task");
    }
  };

  
  const toggleStatus = async (taskId, status) => {
    try  {
      await api.patch(`tasks/${userId}/${taskId}`, {
        status: !status,
      });

    setTasks(
        tasks.map((task) =>
          task._id === taskId
            ? { ...task, status: !status }
            : task
        )
      );
       triggerToast("Status Updated ✔");
    } catch ( err) {
      setError("Failed to update status");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`tasks/${userId}/${taskId}`);
       setTasks(tasks.filter((task) => task._id !== taskId));
      triggerToast("Task Deleted 🗑");
    } catch (err) {
       setError("Failed to delete task");
    }
  };
    const filteredTasks = tasks.filter((task) =>
     task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description?.toLowerCase().includes(search.toLowerCase()) ||
     task.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
   <div className="bg-white h-[90vh] flex flex-col">
{showToast && (
  <div className="fixed top-5 right-1/2 z-50 animate-fadeIn">
    <div  className="flex items-center gap-4 bg-white border border-gray-200 shadow-lg rounded-lg px-4 py-3 ">

      
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-lg">
        ✓
      </div>


      <p  className="text-sm text-gray-700 font-medium">
        {toastMsg}
      </p >

    </div>
  </div >
)}
    
<div className= "bg-white  shadow-sm  py-4 px-2 ">

  {/* COLLAPSED VIEW */}
{!showForm && (
  <div
    onClick={( ) =>  setShowForm(true)}
    className="flex  items-center  justify-between border  rounded px-4 py-3 bg-gray-50 hover:bg-gray-100 cursor-pointer transition"
  >
    <span  className="text-gray-500">Add  a  new task...</span>
    <span className="text-blue-500  font-semibold">+ Add</span>
  </div>
)}

  {/* EXPANDED  FORM  */}
  {showForm  && (
    <div  className="space-y-4">

      <h2   className="text-lg font-semibold text-gray-800">
        Add New Task
      </h2>

      {/* Title   */}
      <input 
        type="text"
         value={title}
         placeholder="Title"
         onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
      />

      {/* Description */}
      <textarea   
           value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
      />

      
      <div className="flex gap-3 flex-wrap">

        {/*  Category  Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Category</option>
          <option value="Study">Study</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>

        {/* Due Date */}
        <input 
           type="date"
           value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/*  Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowForm(false)}
          className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>

        <button   
          onClick={() => {
             addTask();
            setShowForm(false);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

    </div>
  )}

</div>

   {/* ERROR */}
           {error && (
      <div  className="bg-red-100 text-red-700 p-2 m-4 rounded">
            {error}
        </div>
      )}

      {/* TASK LIST   */}
    <div className=" p-5 space-y-4 max-h-[80vh] overflow-y-auto">
        {tasks.length === 0 && (
    <p className="text-center text-gray-400 text-lg">
      No tasks yet 🚀
     </p>
  )}

  {filteredTasks.map((task) => (

    <div
      key={task._id}
      onClick={() => setViewTask(task)}
       className="flex justify-between items-start bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200 cursor-pointer"
    >
      
     

      <div className="flex gap-4 items-start">

        {/* STATUS  */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleStatus(task._id, task.status);
          }}
          className={`mt-1 transition ${
            task.status
              ? "text-green-500 hover:text-green-600"
              : "text-gray-300 hover:text-green-500"
          }`}
        >
          <CheckCircleIcon className="w-6 h-6" />
        </button>

        {/*  TASK  */}
        <div>
          {/*  Title */}
          <p 

            className={`text-lg font-semibold ${
               task.status
                ? "line-through text-gray-400"
                : "text-gray-800"
            }`}
          >
            {task.title}
          </p>

          {/* Description */}
          { task.description   &&  (
            <p className="text-sm text-gray-500 mt-1">
              {task.description}
            </p>
          )}

          {/*  Category + Date */}
          <div className="flex gap-3 mt-2 flex-wrap">
            
            {task.category && (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                {task.category}
              </span>
            )}

           {  task.duedate && (
  <span 

    className={`text-xs ${
        new Date(task.duedate) < new Date() && !task.status
        ? "text-red-500 font-semibold"
        : "text-gray-400"
    }`}
  >
    📅 {task.duedate}
               {new Date(task.duedate) < new Date() && !task.status && " (Overdue)"}
  </span>
)}

            {/* Status  Badge */}
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                task.status
                   ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {task.status ? "Completed" : "Pending"}
            </span >
          </div>
        </div>
      </div>

     
      <div  className="flex gap-2">

        {/* EDIT */}
        <button
          onClick={( e ) =>  {
             e.stopPropagation();
             setEditTask(task);
            setEditTitle(task.title || "");
            setEditDescription(task.description || "");
            setEditDueDate(task.duedate || "");
            setEditStatus(task.status || false);
            setEditCategory(task.category || "");
          }}
          className="p-2 rounded-full hover:bg-blue-100 text-blue-500 transition"
        >
          < PencilSquareIcon className="w-5 h-5" />
        </button>

        {   /* DELETE */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task._id);
          }}
                className="p-2 rounded-full hover:bg-red-100 text-red-500 transition"
        >
           <  TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  ))}
</div>
                    {/* EDIT MODAL */}
     {editTask && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
     
     <div className="bg-white  rounded-2xl shadow-lg p-6">


      {/* Title */} 
      <h2 className="text-xl font-semibold mb-5 text-gray-800">
        Edit Task
      </h2>

      {/* Title Input */}
      <div  className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
                    Title
        </label>
        <input
           type="text"
          value={editTitle}
           onChange={(e) => setEditTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Description */}
      <div className="mb-4">
         <label className="block text-sm font-medium text-gray-600 mb-1">
          Description
       </label>
         <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          rows={3}
          className="w-full border px-3 py-2 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>


      {/* Category */}
      <div className="mb-4">
        <label className="block text-sm font-medium  text-gray-600 mb-1">
           Category
        </label>
       
          <select
          value={editCategory}
  onChange={(e) => setEditCategory(e.target.value)}
             
          className="border px-3  py-2 rounded-lg focus:ring-2  focus:ring-blue-400"
        >
           <option value="">Select Category</option>
           <option value="Study">Study</option>
           <option value="Work">Work</option>
           <option value="Personal">Personal</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Due Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

        {/* Status */}
     <div className="mb-5 flex items-center gap-2">
         <input
          type="checkbox"
          checked={editStatus}
          onChange={(e) => setEditStatus(e.target.checked)}
          className="w-4 h-4"
        />
         <label className="text-sm text-gray-700">
                    Mark as Completed
        </label>
      </div>

    {/* Buttons */}
       <div className="flex justify-end gap-3">
           <button
          onClick={() => setEditTask(null)}
          className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>


      <button
          onClick={updateTask}
          className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
           Save Changes
             </button>
      </div>

    </div>
  </div>
)} 


    </div>

  );
}


export default Home;