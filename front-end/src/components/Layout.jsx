import React from 'react'
import Header from './Header'
import Footer from './Footer';
import Sidebar from './Sidebar';
import "tailwindcss";
import { Outlet } from "react-router-dom";

function Layout({ search, setSearch }) {
  return (
    <>
   <div className="flex flex-col h-screen">

  <Header search={search} setSearch={setSearch} />

  <div className="flex flex-1 overflow-hidden">
    
    <div className="w-64 border-r bg-white p-4">
   <Sidebar />
    </div>

  <div className="flex-1  bg-gray-200 p-4">
    <Outlet context={{ search }} />
    </div>

  </div>

</div>

    
    </>
  )
}

export default Layout