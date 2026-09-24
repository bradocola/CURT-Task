import MyButton from "../components/buttons/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext.jsx";
import { useTask } from "../context/TaskContext.jsx";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext.jsx";
const Projects = () => {
  const { project, deleteProject, addProject, maxId, editProject } =
    useProject();
  const { currentUser } = useUser();
  const { deleteTasksByProject } = useTask();
  const navigate = useNavigate();
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [id, setId] = useState();
  const [errors, setErrors] = useState({});

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

  const isValid = title?.trim() && description?.trim();

  return (
    <div className="flex justify-start min-h-screen flex-col pt-5 bg-orange-100">
      {create ? (
        <div>
          <div className="flex flex-col sm:flex-row justify-between ">
            <h1 className="text-2xl sm:text-4xl font-bold mt-4 ml-4">
              {edit ? "Edit" : "Create"} Project Page
            </h1>
            <MyButton
              size="large"
              buttonStyle="cancel"
              onClick={() => {
                setDescription(false);
                setTitle("");
                setDescription("");
                setId("");
                setCreate(false);
                setEdit(false);
              }}
            >
              {" "}
              Cancel{" "}
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
                if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
              }}
              value={title}
              placeholder="Enter task title"
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
            />
            {errors.description && (
              <p className="text-red-600 font-semibold ml-12 text-sm">
                {errors.description}
              </p>
            )}
          </div>
          <div>
            <MyButton
              size="large"
              buttonStyle="navbar"
              onClick={() => {
                if (!validate()) return;
                if (edit) {
                  editProject(id, title, description);
                } else {
                  addProject({
                    id: maxId() + 1,
                    title: title,
                    description: description,
                    ownerId: currentUser.id,
                    members: [currentUser.id],
                  });
                }
                setDescription(false);
                setTitle("");
                setDescription("");
                setId("");
                setCreate(false);
                setEdit(false);
              }}
              disabled={!isValid}
            >
              {edit ? "Confirm Edit" : "Create"}
            </MyButton>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col sm:flex-row justify-between  px-15">
            <h1 className="text-4xl font-bold mt-4"> Projects Page </h1>
            <MyButton
              size="large"
              buttonStyle="navbar"
              onClick={() => setCreate(true)}
            >
              Create
            </MyButton>
          </div>

          {project.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center gap-8 m-10 min-h-75">
              <h1 className="text-3xl sm:text-6xl font-semibold">
                No Project Exist Create a Project to see results
              </h1>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-8 mx-10 ">
              {project.map((project) => (
                <div
                  key={project.id}
                  className="bg-orange-200 border p-4 m-2 rounded shadow hover:scale-125 transition-all duration-1000 flex flex-col h-full"
                >
                  <h2 className="text-2xl font-semibold">{project.title}</h2>
                  <p>{project.description}</p>
                  <div className="flex justify-end items-center mt-2 flexrow mt-auto">
                    {currentUser.id === parseInt(project.ownerId) && (<MyButton
                      size="small"
                      buttonStyle="delete"
                      onClick={() => {
                        deleteProject(project.id);
                        deleteTasksByProject(project.id);
                      }}
                    >
                      Delete
                    </MyButton>)}
                    {currentUser.id === parseInt(project.ownerId) && (
                      <MyButton
                        size="small"
                        buttonStyle="navbar"
                        onClick={() => {
                          setTitle(project.title);
                          setDescription(project.description);
                          setCreate(true);
                          setEdit(true);
                          setId(project.id);
                        }}
                      >
                        Edit
                      </MyButton>
                    )}
                    {project.members.includes(currentUser.id) && (
                      <MyButton
                        size="small"
                        onClick={() => navigate(`/projects/${project.id}`)}
                      >
                        View Project
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
};

export default Projects;
