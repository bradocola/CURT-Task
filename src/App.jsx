import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import MyNav from './components/buttons/Navbar.jsx'
import Profile from './pages/profile.jsx'
import Dashboard from './pages/dashboard.jsx'
import Projects from './pages/projects.jsx'
import Tasks from './pages/tasks.jsx'
import Login from './pages/login.jsx'
import ProjectDetails from './pages/projectDetails.jsx'

function App() {
  return (
    <>
      <MyNav />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
    </>
  )
}

export default App
