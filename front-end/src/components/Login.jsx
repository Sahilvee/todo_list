import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

       const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const res = await axios.post(
        "https://todo-list-hnig.onrender.com/auth/login",
        { name, password }
      );

       localStorage.setItem("token", res.data.token);
       localStorage.setItem("userId", res.data.userId);
      console.log("token:", res.data.token);
      console.log("userId:", res.data.userId);

      navigate("/", { replace: true });

    } catch (err) {

         if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
             <section className="min-h-screen flex justify-center items-center py-10">
      <div className="w-full max-w-md shadow-lg shadow-blue-500/40 rounded-xl p-10">
        <h1 className="text-3xl text-blue-500 text-center font-semibold">
          Login
        </h1>
        <hr className="my-6" />

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >

          <label htmlFor="name" className="text-lg text-blue-600">
            Name
          </label>
          <input
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border h-10 rounded-md px-2"
            type="text"
            placeholder="Enter your name"
          />

          <label htmlFor="password" className="text-lg text-blue-600">
            Password
          </label>

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
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-sm text-center">
                   Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 underline">
            Signup
           </Link>
        </p>

      </div>

    </section>
  );
}

export default Login;