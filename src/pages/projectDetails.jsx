import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext.jsx";
import { useTask } from "../context/TaskContext.jsx";
import { useUser } from "../context/UserContext.jsx";
import { useState, useEffect } from "react";
import MyButton from "../components/buttons/Button.jsx";
const ProjectDetails = () => {
  const { project } = useProject();
  const { task, deleteTask, addTask, editTask, maxId } = useTask();
  const { user, currentUser } = useUser();
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
  const [assignedTo, setAssignedTo] = useState(currentUser.id);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("To Do");
  const isValid = title?.trim() && description?.trim();

  const validate = () => {
    const newErrors = {};
    if (!title || !title.trim()) {
      newErrors.title = "Title is required and cannot be empty";
    }
    if (!description || !description.trim()) {
      newErrors.description = "Description is required and cannot be empty";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  if (!projectaya) {
    return <div className="justify-center">Project not found</div>;
  } else {
    return (
      <div className="bg-orange-100 flex justify-center min-h-screen flex-col pt-5">
        {create ? (
          <div>
            <div className="flex flex-col sm:flex-row justify-between ">
              <h1 className="text-2xl sm:text-4xl font-bold mt-4 ml-4">
                {edit ? "Edit" : "Add"} Task Page
              </h1>
              <MyButton
                size="large"
                buttonStyle="cancel"
                onClick={() => {
                  setDescription(false);
                  setTitle("");
                  setPriority("Low");
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
              <h2 className="text-2xl font-bold mt-2 ml-8">
                Title <span className="text-red-500">*</span>
              </h2>
              <input
                className={`rounded-4xl text-black border-3 transition-all duration-500 hover:scale-105 mx-10 my-3 py-2 px-5 ${errors.title ? "border-red-500 bg-red-50" : ""}`}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title)
                    setErrors((prev) => ({ ...prev, title: "" }));
                }}
                value={title}
                placeholder="Enter task title"
                disabled={currentUser.id !== parseInt(projectaya.ownerId)}
              />
              {errors.title && (
                <p className="text-red-600 font-semibold ml-12 text-sm">
                  {errors.title}
                </p>
              )}

              <h2 className="text-2xl font-bold mt-2 ml-8">
                Description <span className="text-red-500">*</span>
              </h2>
              <input
                className={`rounded-4xl text-black border-3 transition-all duration-500 hover:scale-105 mx-10 my-3 py-2 px-5 ${
                  errors.description ? "border-red-500 bg-red-50" : ""
                }`}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description)
                    setErrors((prev) => ({ ...prev, description: "" }));
                }}
                value={description}
                placeholder="Enter task description"
                disabled={currentUser.id !== parseInt(projectaya.ownerId)}
              />
              {errors.description && (
                <p className="text-red-600 font-semibold ml-12 text-sm">
                  {errors.description}
                </p>
              )}
              <h2 className="text-2xl font-bold mt-2 ml-8"> Priority </h2>
              <div className="flex flex-row justify-around">
                <MyButton
                  buttonStyle={priority === "Low" ? "navbar" : "cancel"}
                  onClick={() => {
                    setPriority("Low");
                  }}
                  disabled={currentUser.id !== parseInt(projectaya.ownerId)}
                >
                  Low
                </MyButton>
                <MyButton
                  buttonStyle={priority === "Medium" ? "navbar" : "cancel"}
                  onClick={() => {
                    setPriority("Medium");
                  }}
                  disabled={currentUser.id !== parseInt(projectaya.ownerId)}
                >
                  Medium
                </MyButton>
                <MyButton
                  buttonStyle={priority === "High" ? "navbar" : "cancel"}
                  onClick={() => {
                    setPriority("High");
                  }}
                  disabled={currentUser.id !== parseInt(projectaya.ownerId)}
                >
                  High
                </MyButton>
              </div>

              <h2 className="text-2xl font-bold mt-2 ml-8"> Status </h2>
              <div className="flex flex-row justify-around">
                <MyButton
                  buttonStyle={status === "To Do" ? "navbar" : "cancel"}
                  onClick={() => setStatus("To Do")}
                >
                  To Do
                </MyButton>
                <MyButton
                  buttonStyle={status === "In Progress" ? "navbar" : "cancel"}
                  onClick={() => setStatus("In Progress")}
                >
                  In Progress
                </MyButton>
                <MyButton
                  buttonStyle={status === "Done" ? "navbar" : "cancel"}
                  onClick={() => setStatus("Done")}
                >
                  Done
                </MyButton>
              </div>

              <h2 className="text-2xl font-bold mt-2 ml-8"> Assignee </h2>
              <select
                className="rounded-4xl text-black border-3 transition-all duration-500 hover:scale-105 mx-10 my-3 py-2 px-5 bg-white"
                value={assignedTo}
                onChange={(e) => setAssignedTo(parseInt(e.target.value))}
                disabled={currentUser.id !== parseInt(projectaya.ownerId)}
              >
                {projectaya.members
                  ?.map((mid) => user.find((u) => u.id === mid))
                  .filter(Boolean)
                  .map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <MyButton
                size="large"
                buttonStyle="navbar"
                disabled={!isValid}
                onClick={() => {
                  if (!validate()) return;
                  if (edit) {
                    editTask(idT, { title, description, priority, assignedTo });
                  } else {
                    addTask({
                      id: maxId() + 1,
                      projectId: parseInt(id),
                      title: title,
                      description: description,
                      ownerId: currentUser.id,
                      priority: priority,
                      status: "To Do",
                      assignedTo: assignedTo,
                    });
                  }
                  setDescription(false);
                  setTitle("");
                  setPriority("Low");
                  setDescription("");
                  setIdT("");
                  setCreate(false);
                  setEdit(false);
                }}
              >
                {edit ? "Confirm Edit" : "Add"}
              </MyButton>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row justify-between  px-15">
              <div className="flex flex-row">
                <button
                  className="text-3xl sm:text-6xl hover:opacity-50"
                  onClick={() => navigate(`/projects`)}
                >
                  ⬅️
                </button>
                <div>
                  <h1 className="text-2xl sm:text-4xl font-bold">{projectaya.title}</h1>
                  <p>{projectaya.description}</p>
                </div>
              </div>
              {currentUser.id === parseInt(projectaya.ownerId) && (
                <MyButton
                  size="large"
                  buttonStyle="navbar"
                  onClick={() => setCreate(true)}
                >
                  Add Task
                </MyButton>
              )}
            </div>
            {taskat.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center gap-8 m-10 min-h-75">
                <h1 className="text-3xl sm:text-6xl font-semibold">
                  No Tasks Exist Create a Task to see results
                </h1>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 m-8 mx-10 ">
                {taskat.map((task) => (
                  <div
                    key={task.id}
                    className="bg-orange-200 border p-4 m-2 rounded shadow hover:scale-115 transition-all duration-1000 flex flex-col h-full"
                  >
                    <h2 className="text-2xl font-semibold">{task.title}</h2>
                    <p>{task.description}</p>
                    <div className="flex justify-end items-center mt-2 flex-row mt-auto">
                      {currentUser.id === parseInt(projectaya.ownerId) && (
                        <MyButton
                          size="small"
                          buttonStyle="delete"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </MyButton>
                      )}
                      {(currentUser.id === parseInt(projectaya.ownerId) ||
                        currentUser.id === parseInt(task.assignedTo)) && (
                        <MyButton
                          size="small"
                          buttonStyle="navbar"
                          onClick={() => {
                            setTitle(task.title);
                            setDescription(task.description);
                            setCreate(true);
                            setEdit(true);
                            setIdT(task.id);
                            setPriority(task.priority);
                            setAssignedTo(task.assignedTo);
                            setStatus(task.status)
                          }}
                        >
                          Edit
                        </MyButton>
                      )}
                      {(currentUser.id === parseInt(projectaya.ownerId) ||
                        currentUser.id === parseInt(task.assignedTo)) && (
                        <MyButton
                          size="small"
                          onClick={() =>
                            navigate(`/projects/${projectaya.id}/${task.id}`)
                          }
                        >
                          View Task
                        </MyButton>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
};

export default ProjectDetails;
