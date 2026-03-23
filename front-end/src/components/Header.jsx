
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";


import "tailwindcss";
function Header({ search, setSearch }) {

    const navigate = useNavigate();
     //   Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("userId");
      localStorage.removeItem("token");
    navigate("/login"); // redirect to login page
  };  
  
   const userId = localStorage.getItem("userId");
  return (
    <>
<>
  <section className="w-full bg-gray-100">
   <nav className="w-full   h-16 px-6 flex items-center bg-white shadow-md">
       <div className="flex justify-between  w-full items-center">
         <div className="font-bold text-xl   text-black ">Logo </div>
       <input
  type="text"
   placeholder="Search..."
   value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border  border-l-zinc-700  rounded-md px-3 py-1 w-1/3"
/>
        <div className="  flex items-center gap-4">
               {userId ? (
            <>
              {/* Profile */}
              <Link
                to={`/user/${userId}`}
                className="flex  items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
                title="Profile"
              >
                <UserCircleIcon className="w-8 h-8 text-gray-600" />
              </Link>

              {/* Logout */}
              <button
                 onClick={ handleLogout}
                 className="bg-red-500  hover:bg-red-600  text-white px-3 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
               className="bg-blue-500 hover:bg-blue-600   text-white  px-3  py-1  rounded  transition"
            >
               Login
            </Link>
          )}

        </div>

      </div>
    </nav>
  </section>
</>

    </>
   
  )
}


export default Header