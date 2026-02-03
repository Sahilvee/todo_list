import axios from "axios";
import { useEffect, useState } from "react";


const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
     const fetchUser = async () => {
      try {
        const res = await axios.get(
                     `https://todo-list-hnig.onrender.com/users/${localStorage.getItem("userId")}`
        );
                setUser(res.data.user);
      }  catch (err) {
            setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

      fetchUser();
  }, []);

   if (loading)
  return (
         <div className="flex min-h-screen items-center justify-center text-gray-600">
        Loading profile...
      </div>
    );

  if (error)
     return (
        <div className="flex min-h-screen items-center justify-center text-red-600">
          {error}
          </div>
    );

  return (
   <div className="min-h-screen bg-gray-50 px-6 py-10">
       <div className="max-w-5xl mx-auto">
        
        <div className="flex items-center gap-6 border-b pb-6">
            <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-semibold">
            {user.name.charAt(0).toUpperCase()}
            </div>

          <div>
             <h1 className="text-3xl font-semibold text-gray-800">
              {user.name}
            </h1>
                   <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

       
         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
     <div className="border rounded-lg p-6 bg-white">
             <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Personal Information
            </h2>

      <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-base font-medium">{user.name}</p>
              </div>

              <div>
                 <p className="text-sm text-gray-500">Email Address</p>
              <p className="text-base font-medium">{user.email}</p>
                      </div>

                <div>
                <p className="text-sm text-gray-500">Joined On</p>
                <p className="text-base font-medium">
                           {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              </div>
          </div>

         
          <div className="border rounded-lg p-6 bg-white">
             <h2 className="text-lg font-semibold mb-4 text-gray-800">
               Account Actions
            </h2>

                <div className="space-y-4">
              <button className="w-full disabled: bg-cyan-900  text-white py-2 rounded-md transition">
                Edit Profile
              </button>

              <button
                onClick={() => {
                   localStorage.clear();
                  window.location.href = "/login";
                }}
                className="w-full border border-gray-300 hover:bg-gray-100 py-2 rounded-md transition"
              >
                Logout
               </button>
            </div>
           </div>
          </div>

       </div>
     </div>
  );
};

export default UserProfile;
