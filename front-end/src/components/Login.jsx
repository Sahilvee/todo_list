import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Links ,useNavigate} from 'react-router-dom'
import 'tailwindcss'
function Login() {
     const [name,setname]=useState("");
     const [password,setpassword]=useState("");
     const [error,seterror]=useState("");

      const navigate=useNavigate();
     
            const handlelogin= async (e) => {
              e.preventDefault();
               try {
    const res = await  axios.post("http://localhost:5000/auth/login",{name,password});
    localStorage.setItem("token", res.data.token);
     localStorage.setItem("userId", res.data.userId);
    console.log("token :",localStorage.getItem("token"));
      console.log("userid :",localStorage.getItem("userId"));
    navigate("/",{replace :true})
     
     } catch (error) {
     if (error.response) seterror(error.response.data.message);
      else seterror("Something went wrong");
      }
        
      }
 

  return ( 

    <>
        <section className='min-h-screen   py-10 px-150 flex'>
            <div className='flex-1 shadow-lg shadow-blue-500/40 rounded-xl  flex flex-col  items-center p-20'> <h1 className='text-3xl text-blue-400'> Login form</h1>
            <hr className='w-full my-10' />
            
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
        )}
            <form className='flex mt-20 w-full  flex-1 flex-col justify-start  gap-4' onSubmit={handlelogin}>
               <label  className='text-3xl text-blue-500 font-light text-shadow-blue-200' htmlFor="Name">Name</label>
               <input required onChange={(e)=>{setname(e.target.value)}} className="border-2 border-blue-100   h-10 rounded-md" type="text" name="Name" id="Name" />
               <label className='text-3xl text-blue-500 font-light text-shadow-blue-200' htmlFor='password'> password</label>
               <input required onChange={(e)=>{setpassword(e.target.value)}} className="border-2  border-blue-100 h-10 rounded-md" type="password" name="password" id="password" />
               <button type='submit'   className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
            </form>
            <p className="mt-6 text-sm">
          Don’t have an account?{" "}
          <Link to="/signup" className= "text-blue-600 underline">
            Signup
          </Link>
        </p>
            </div>
        </section>
    </>
  )
}

export default Login