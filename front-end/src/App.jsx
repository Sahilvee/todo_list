import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import Layout from './components/Layout'
import Profile from './components/Profile'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Privateroute from './components/Privateroute'
import Signup from './components/Signup'

function App() {


  return (
    <Routes>
      <Route  path='/login' element={<Login/>}></Route>
      <Route  path='/signup' element={<Signup/>}></Route>
      <Route path='/' element=
      {<Privateroute><Layout/></Privateroute>
      }>
      <Route index element={<Home></Home>}/>

      </Route>
      <Route path='/user/:id' element={<Profile/>}/>
      
    </Routes>

  )
}

export default App
