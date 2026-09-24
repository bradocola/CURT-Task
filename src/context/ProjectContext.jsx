import { createContext, useState, useContext, useEffect } from "react";
import { initialProjects } from "../data/mockData.js";
export const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [project, setProject] = useState(
    JSON.parse(localStorage.getItem("project")) || initialProjects,
  );
  useEffect(() => {
    localStorage.setItem("project", JSON.stringify(project));
  }, [project]);
  function deleteProject(id) {
    setProject([...project.filter((project) => project.id !== id)]);
  }

  function addProject(newProject) {
    setProject([...project, newProject]);
  }

  function maxId() {
    return project.length === 0
      ? 0
      : Math.max(...project.map((project) => project.id));
  }

  function editProject(id, title, description) {
    setProject(
      project.map((p) => (p.id === id ? { ...p, title, description } : p)),
    );
  }

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        maxId,
        addProject,
        deleteProject,
        editProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export const useProject = () => useContext(ProjectContext);
