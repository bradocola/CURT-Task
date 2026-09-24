import { useParams, useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext.jsx";
import { useTask } from "../context/TaskContext.jsx";
import { useUser } from "../context/UserContext.jsx";
import { useState, useEffect } from "react";
import MyButton from "../components/buttons/Button.jsx";

const Profile = () => {
  const { project } = useProject();
  const { task } = useTask();
  const { currentUser, logout } = useUser();
  const navigate = useNavigate();

  const projectat = project.filter((p) => p.members.includes(currentUser.id));
  const taskat = task.filter((t) => currentUser.id === parseInt(t.assignedTo));
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);
  if (loading) {
    return (
      <div className="flex justify-start min-h-screen flex-col pt-5 bg-orange-100">
        <div className="m-auto animate-spin text-8xl">↻</div>
      </div>
    );
  }

  return (
    <div className="flex bg-orange-100 items-start flex-col ">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-4 w-full px-4 sm:px-15">
        <div className="flex flex-col mt-5 ml-5">
          <h1 className="text-2xl sm:text-4xl font-bold">{currentUser.name}</h1>
          <h1 className="text-lg sm:text-3xl font-bold">{currentUser.email}</h1>
        </div>
        <MyButton
          buttonStyle="delete"
          size="large"
          onClick={() => {
            logout();
          }}
        >
          Log Out
        </MyButton>
      </div>
      <div>
        <h1 className="text-4xl font-bold mt-5 ml-5 px-15">My Projects</h1>

        {projectat.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center gap-8 m-10 min-h-75">
            <h1 className="text-2xl font-semibold">
              No Project Exist Create a Project from the Projects navBar
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-8 mx-10 ">
            {projectat.map((project) => (
              <div
                key={project.id}
                className="bg-orange-200 border p-4 m-2 rounded shadow hover:scale-125 transition-all duration-1000 flex flex-col h-full"
              >
                <h2 className="text-2xl font-semibold">{project.title}</h2>
                <p>{project.description}</p>
                <div className="flex justify-end items-center mt-2 flexrow mt-auto">
                  <MyButton
                    size="small"
                    onClick={() => navigate(`/projects/${project.id}`)}
                  >
                    View Project
                  </MyButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <h1 className="text-4xl font-bold mt-5 ml-5 px-15">My Tasks</h1>
      {taskat.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center gap-8 m-10 min-h-75">
                <h1 className="text-2xl font-semibold">
                  No Tasks Exist Create a Task to see results
                </h1>
              </div>
            ) : (
      <div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-8 mx-10 ">
          {taskat.map((task) => (
            <div
              key={task.id}
              className="bg-orange-200 border p-4 m-2 rounded shadow hover:scale-115 transition-all duration-1000 flex flex-col h-full"
            >
              <h2 className="text-2xl font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <div className="flex justify-end items-center mt-2 flexrow mt-auto">
                <MyButton
                  size="small"
                  onClick={() =>
                    navigate(`/projects/${task.projectId}/${task.id}`)
                  }
                >
                  View Task
                </MyButton>
              </div>
            </div>
          ))}
        </div>
      </div>)}
    </div>
  );
};

export default Profile;
