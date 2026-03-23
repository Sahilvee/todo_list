import React from 'react'
import { Navigate } from 'react-router-dom';

function Privateroute({children}) {

     const isloggedin= !!localStorage.getItem("token");
  
     if(!isloggedin){
      return  <Navigate to="/login" replace />
     
     }
  
     return (   
    <>{children}</>
  ) 
  
}

export default Privateroute;