import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">

      <h1 className="text-[120px] font-extrabold text-gray-300 select-none">
        404
      </h1>

      <div className="text-6xl -mt-10 mb-4 animate-bounce">
        🚧
      </div>
       
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center">
        Oops!  Page  not found   

      </h2>

     
      <p className="text-gray-500 mt-2 text-center max-w-md">
         The page you’re  looking for  doesn’t exist or  has been moved.
      </p >

      {/* Button to navigate to login  */}
      <div   className="flex gap-4 mt-6">
    
        <Link
           to="/login"
          className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
           Login
        </Link>
      </ div>

      <div  className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-30 blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-28 h-28 bg-purple-200 rounded-full opacity-30 blur-xl"></div>

    </div>
  );
}

export default NotFound;