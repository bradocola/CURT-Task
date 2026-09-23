import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MyNav from "./components/buttons/Navbar.jsx";
import Profile from "./pages/profile.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Projects from "./pages/projects.jsx";
import Login from "./pages/login.jsx";
import ProjectDetails from "./pages/projectDetails.jsx";
import TaskDetails from "./pages/taskDetails.jsx"
import { ProjectProvider } from "./context/ProjectContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";

function App() {
  return (
    <>
      <TaskProvider>
        <ProjectProvider>
          <MyNav />
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/login" element={<Login />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/projects/:id/:taskId" element={<TaskDetails />} />
          </Routes>
        </ProjectProvider>
      </TaskProvider>
    </>
  );
}

export default App;
