import React from 'react'
import { Header } from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import { Users } from './pages/Users'


const App = () => {
  return (
  <>
  <Header/>
  <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='dashboard' element={<Dashboard/>}></Route>
    <Route path='user-info' element={<Users/>}></Route>
    <Route path='admin' element={<AdminPanel/>}></Route>
  </Routes>
  </>
  )
}

export default App