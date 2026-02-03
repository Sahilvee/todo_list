import React from 'react'
import Header from './Header'
import Footer from './Footer';
import Sidebar from './Sidebar';
import "tailwindcss";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
    <div className=' flex flex-col min-h-screen'>
         <Header></Header>
  
  <div className="flex flex-1">
    <div className="w-64 p-4">
      <Sidebar></Sidebar>
    </div>
    <div className="flex-1 h-full bg-gray-200 p-4">
      <Outlet />
    </div>
  </div>
 {/* <Footer></Footer>  if needed*/}
    </div>

    
    </>
  )
}

export default Layout