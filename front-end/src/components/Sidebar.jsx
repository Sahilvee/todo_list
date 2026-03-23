import React from "react";
import { ListBulletIcon } from "@heroicons/react/24/outline";
import "tailwindcss";
import { Navigate,useNavigate  } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-60 bg-white border-r shadow-sm p-4">

      
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Dashboard
      </h2>

    
      <div className="flex flex-col gap-2">

        {/* Tasks Button (to navigate back to the task ) */}
        <button onClick={()=> navigate("/", { replace: true })}  className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
          <ListBulletIcon className="w-5 h-5" />
          <span>Tasks</span>
        </button>

      </div >

      
      <hr className="my-6" />


    </div>

  );

}

export default Sidebar;