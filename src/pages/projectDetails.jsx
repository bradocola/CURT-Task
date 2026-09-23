import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext.jsx";
import { useTask } from "../context/TaskContext.jsx";
import { useState } from "react";
import MyButton from "../components/buttons/Button.jsx";
const ProjectDetails = () => {
  const { project } = useProject();
  const { task, deleteTask, addTask, editTask, maxId } = useTask();
  const { id } = useParams();
  const navigate = useNavigate();
  const projectaya = project.find((project) => project.id === parseInt(id));
  const taskat = task.filter((task) => task.projectId === parseInt(id));
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [priority, setPriority] = useState("Low");
  const [idT, setIdT] = useState();

  if (!projectaya) {
    return <div className="justify-center">Project not found</div>;
  } else {
    return (
      <div className="bg-orange-100 flex justify-center min-h-screen flex-col pt-5">
        {create ? (
          <div>
            <div className="flex flexrow justify-between">
              <h1 className="text-4xl font-bold mt-4 ml-4">
                {" "}
                {edit ? "Edit" : "Add"} Task Page{" "}
              </h1>
              <MyButton
                size="large"
                buttonStyle="cancel"
                onClick={() => {
                  setDescription(false);
                  setTitle("");
                  setPriority("Low")
                  setDescription("");
                  setIdT("");
                  setCreate(false);
                  setEdit(false);
                }}
              >
                Cancel
              </MyButton>
            </div>
            <div className="flex flex-col h-full justify-center m-auto">
              <h2 className="text-2xl font-bold mt-2 ml-8"> Title </h2>
              <input
                className="rounded-4xl text-black border-3 transition-all duration-500 hover:scale-105 mx-10 my-3 py-2 px-5"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <h2 className="text-2xl font-bold mt-2 ml-8"> Description </h2>
              <input
                className="rounded-4xl text-black border-3 transition-all duration-500 hover:scale-105 mx-10 my-3 py-2 px-5"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <h2 className="text-2xl font-bold mt-2 ml-8"> Priority </h2>
              <div className="flex flexrow justify-around">
                <MyButton
                  buttonStyle={priority ==="Low" ? "navbar" : "cancel"}
                  onClick={() => {
                    setPriority("Low")
                  }}>
                    Low
                </MyButton>
                <MyButton
                  buttonStyle={priority ==="Medium" ? "navbar" : "cancel"}
                  onClick={() => {
                    setPriority("Medium")
                  }}>
                    Medium
                </MyButton>
                <MyButton
                  buttonStyle={priority ==="High" ? "navbar" : "cancel"}
                  onClick={() => {
                    setPriority("High")
                  }}>
                    High
                </MyButton>  
              </div>
            </div>
            <div>
              <MyButton
                size="large"
                buttonStyle="navbar"
                onClick={() => {
                  if (edit) {
                    editTask(idT, title, description,priority);
                  } else {
                    addTask({
                      id: maxId() + 1,
                      projectId: parseInt(id),
                      title: title,
                      description: description,
                      ownerId: 1,
                      priority: priority,
                      status: "To Do",
                      assignedTo: 1,
                    });
                  }
                  setDescription(false);
                  setTitle("");
                  setPriority("Low")
                  setDescription("");
                  setIdT("");
                  setCreate(false);
                  setEdit(false);
                }}
              >
                {" "}
                {edit ? "Confirm Edit" : "Add"}{" "}
              </MyButton>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flexrow justify-between px-15">
              <div className="flex flexrow">
                <button
                  className="text-6xl hover:opacity-50"
                  onClick={() => navigate(`/projects`)}
                >
                  {" "}
                  ⬅️{" "}
                </button>
                <div>
                  <h1 className="text-4xl font-bold">{projectaya.title}</h1>
                  <p>{projectaya.description}</p>
                </div>
              </div>
              <MyButton
                size="large"
                buttonStyle="navbar"
                onClick={() => setCreate(true)}
              >
                {" "}
                Add Task{" "}
              </MyButton>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 m-8 mx-10 ">
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
                      buttonStyle="delete"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </MyButton>
                    <MyButton
                      size="small"
                      buttonStyle="navbar"
                      onClick={() => {
                        setTitle(task.title);
                        setDescription(task.description);
                        setCreate(true);
                        setEdit(true);
                        setIdT(task.id);
                        setPriority(task.priority)
                      }}
                    >
                      Edit
                    </MyButton>
                    <MyButton
                      size="small"
                      onClick={() =>
                        navigate(`/projects/${projectaya.id}/${task.id}`)
                      }
                    >
                      View Task
                    </MyButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default ProjectDetails;
