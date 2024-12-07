import React from 'react'

import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AdminPanel from './pages/AdminPanel'
import { Users } from './pages/Users'
import Header from './components/Header'
import UserInfo from './pages/UserInfo'


const App = () => {
  return (
  <>
  <Header></Header>
  <Routes>
    <Route path='/' element={<Login/>}></Route>
    <Route path='dashboard' element={<Dashboard/>}></Route>
    <Route path='user-info' element={<UserInfo/>}></Route>
    <Route path='user' element={<Users/>}></Route>
    <Route path='admin' element={<AdminPanel/>}></Route>
  </Routes>
  </>
  )
}

export default App