import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api.js";
function Signup() {

  const [name, setName] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

     setLoading(true);
          setError("");
    setSuccess("");

    try {
      const res = await api.post(
        "auth/signup",
        {
          name,
          email,
          password
        }
      );
 
      setSuccess("Signup  successful !  Redirecting to login...");
       setName("");
      setEmail("");
       setPassword("");

       setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);

    } catch (err) {
       if (err.response && err.response.data.message) {
      setError(err.response.data.message);
      }  else {
        setError("Server error. Please try again.");
      }
    }  finally {
    setLoading(false);
    }
  };

  return (
       <section className="min-h-screen flex justify-center items-center py-10">
      
      <div  className="w-full max-w-md shadow-lg rounded-xl p-8">
             <h1 className="text-3xl text-blue-500 text-center font-semibold">
                   {/* header */} Signup 
                    
                </h1>

        <hr  className="my-6" />

         {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
               {error}
          </div>
        )}
             {success && (
        <div  className="bg-green-100 text-green-700 p-2 mb-4 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            required
              value={name}
             onChange={(e) => setName(e.target.value)}
             className="border h-10 rounded-md px-2"
             type="text"
            placeholder="Enter your name"
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              className="border h-10 rounded-md px-2"
             type="email"
            placeholder="Enter your email"
          />
          <label htmlFor="password">Password</label>
          <input 
             id="password"
            required 
            value={password}
             onChange={(e) => setPassword(e.target.value)}
              className="border h-10 rounded-md px-2"
             type="password"
            placeholder="Enter password"
          />
   

          <button  
               disabled={loading}
           className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>



        <p className="mt-6 text-sm text-center">
          Already  have  an account? {" "}
        
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>

      </div >
    </section>
  );
}

export default Signup;