import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MyNav from "./components/buttons/Navbar.jsx";
import Profile from "./pages/profile.jsx";
import Projects from "./pages/projects.jsx";
import Login from "./pages/login.jsx";
import ProjectDetails from "./pages/projectDetails.jsx";
import TaskDetails from "./pages/taskDetails.jsx";
import { ProjectProvider } from "./context/ProjectContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import { UserProvider, useUser } from "./context/UserContext.jsx";
function App() {
  return (
    <>
      <UserProvider>
        <TaskProvider>
          <ProjectProvider>
            <Inner />
          </ProjectProvider>
        </TaskProvider>
      </UserProvider>
    </>
  );
}
function Inner() {
  const { currentUser } = useUser();
  return (
    <>
      {currentUser && <MyNav /> }
      <Routes>
        <Route path="/" element={!currentUser ? <Navigate to="/login" replace /> : <Navigate to="/profile" replace /> } />
        <Route path="/profile" element={!currentUser ? <Navigate to="/login" replace /> :<Profile />} />
        <Route path="/projects" element={!currentUser ? <Navigate to="/login" replace /> :<Projects />} />
        <Route path="/projects/:id" element={!currentUser ? <Navigate to="/login" replace /> :<ProjectDetails />} />
        <Route path="/projects/:id/:taskId" element={!currentUser ? <Navigate to="/login" replace /> :<TaskDetails />} />
        <Route path="/login" element={currentUser ? <Navigate to="/profile" replace /> :<Login />} />
      </Routes>
    </>
  );
}

export default App;
