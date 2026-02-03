import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email,setEmail]=useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

    const navigate = useNavigate();

      const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://todo-list-backend.onrender.com/auth/signup",
        { name, password ,email }     

      );

      setSuccess("Signup successful! Redirecting to login...");



      setError("");

      
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);

    } catch(err){
      if         (err.response) {
        setError(err.response.data.message);
      }          else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <section className="min-h-screen py-10 flex justify-center">
      <div className="w-full max-w-md shadow-lg rounded-xl p-8">
        <h1 className="text-3xl text-blue-400 text-center">
          Signup
        </h1>
        <hr className="my-6" />

        {         error 
        && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        {success 
        &&
         (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <label>Name</label>
          
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border h-10 rounded-md px-2"
            type="text"
          />
          
          <label htmlFor="">email</label>
          
          <input required
             value={email}
            onChange={(e) => setEmail(e.target.value)}
             className="border h-10 rounded-md px-2" type="email" name="email" id="email" />

          <label>Password</label>
          <input
             required
            value={password}
             onChange={(e) => setPassword(e.target.value)}
            className="border h-10 rounded-md px-2"
             type="password"
          />

          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Signup
          </button>
                     </form>

                 <p className="mt-6 text-sm text-center">
          Already have an account?{" "}
           <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;
