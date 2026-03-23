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
import NotFound from './components/NotFound';

function App() {
  const [search, setSearch] = useState("");

  return (
    <Routes>
     
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

                  {/* PRIVATE */}
      <Route
         element={
          <Privateroute>
         <Layout search={search} setSearch={setSearch} />
          </Privateroute>
        }
      >
         <Route index element={<Home search={search} />} />
        <Route path="/user/:id" element={<Profile />} />
      </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App
