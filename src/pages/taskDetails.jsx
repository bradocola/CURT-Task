import { useParams, useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext.jsx";
import { useTask } from "../context/TaskContext.jsx";
import { useUser } from "../context/UserContext.jsx";
import { useState, useEffect } from "react";
import MyButton from "../components/buttons/Button.jsx";

const TaskDetails = () => {
  const { project } = useProject();
  const { task, deleteTask, editTask, updateStatus } = useTask();
  const { user, currentUser } = useUser();
  const { id, taskId } = useParams();
  const navigate = useNavigate();

  const projectaya = project.find((p) => p.id === parseInt(id));
  const taskaya = task.find((t) => t.id === parseInt(taskId));

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("To Do");
  const [assignedTo, setAssignedTo] = useState(1);
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

  if (!taskaya) {
    return (
      <div className="bg-orange-100 flex justify-center items-center min-h-screen flex-col">
        <h1 className="text-3xl font-bold mb-4">Task not found</h1>
        <MyButton
          buttonStyle="navbar"
          onClick={() => navigate(`/projects/${id}`)}
        >
          Back to Project
        </MyButton>
      </div>
    );
  }
  const assignee = user?.find((u) => u.id === taskaya.assignedTo);

  const isValid = title?.trim() && description?.trim();

  return (
    <div className="bg-orange-100 flex justify-start min-h-screen flex-col pt-5">
      <div className="flex flex-row items-center px-15">
        <button
          className="text-6xl hover:opacity-50 cursor-pointer"
          onClick={() => navigate(`/projects/${id}`)}
        >
          ⬅️
        </button>
        <div className="ml-4">
          <h1 className="text-2xl sm:text-4xl font-bold">
            {isEditing ? "Edit Task" : "Task Details"}
          </h1>
          <p className="text-gray-700">
            Project: {projectaya ? projectaya.title : `Project #${id}`}
          </p>
        </div>
      </div>

      {isEditing ? (
        /* Edit Form */
        <div className="m-8 mx-15">
          <div className="flex flex-col h-full justify-center m-auto bg-orange-200/60 p-6 rounded-3xl border">
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
                onClick={() => setPriority("Low")}
                disabled={currentUser.id !== parseInt(projectaya.ownerId)}
              >
                Low
              </MyButton>
              <MyButton
                buttonStyle={priority === "Medium" ? "navbar" : "cancel"}
                onClick={() => setPriority("Medium")}
                disabled={currentUser.id !== parseInt(projectaya.ownerId)}
              >
                Medium
              </MyButton>
              <MyButton
                buttonStyle={priority === "High" ? "navbar" : "cancel"}
                onClick={() => setPriority("High")}
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

            <div className="flex justify-end gap-4 mt-6">
              <MyButton
                size="large"
                buttonStyle="cancel"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </MyButton>
              <MyButton
                size="large"
                buttonStyle="navbar"
                onClick={() => {
                  if (!validate()) return;

                  editTask(taskaya.id, {
                    title: title.trim(),
                    description: description.trim(),
                    priority,
                    assignedTo,
                    status,
                  });
                  setIsEditing(false);
                }}
                disabled={!isValid}
              >
                Confirm Edit
              </MyButton>
            </div>
          </div>
        </div>
      ) : (
        /* Details View */
        <div className="m-8 mx-15 bg-orange-200 border p-8 rounded shadow flex flex-col gap-4">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <h2 className="text-3xl font-bold">{taskaya.title}</h2>
            <span className="text-base font-bold bg-white px-3 py-1 rounded-full border border-gray-400">
              Priority: {taskaya.priority}
            </span>
          </div>

          <div className="mt-2">
            <h3 className="text-lg font-bold text-gray-800">Description</h3>
            <p className="text-lg mt-1 text-gray-900 bg-orange-100/60 p-4 rounded-2xl border border-orange-300 whitespace-pre-wrap">
              {taskaya.description}
            </p>
          </div>

          <div className="mt-2 pt-3 border-t border-orange-300">
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex flex-row">
              Status is:{" "}
              <div className="text-blue-800 ml-1"> {taskaya.status}</div>
            </h3>
          </div>

          <div className="mt-2 pt-3 border-t border-orange-300 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Assignee</h3>
              <p className="text-base text-gray-900 mt-1 font-medium">
                {assignee ? (
                  <>
                    <span>👤 {assignee.name}</span>
                    <span className="text-sm text-gray-600 block">
                      {assignee.email}
                    </span>
                  </>
                ) : (
                  <span className="text-gray-500 italic">Unassigned</span>
                )}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800">Project</h3>
              <p className="text-base text-gray-900 mt-1 font-medium">
                {projectaya.title}
              </p>
            </div>
          </div>

          <div className="flex justify-end items-center gap-3 mt-6 pt-4 border-t border-orange-300 flex-wrap">
            {currentUser.id === parseInt(projectaya.ownerId) && (
              <MyButton
                size="small"
                buttonStyle="delete"
                onClick={() => {
                  deleteTask(taskaya.id);
                  navigate(`/projects/${id}`);
                }}
              >
                Delete Task
              </MyButton>
            )}
            <MyButton
              size="small"
              buttonStyle="navbar"
              onClick={() => {
                setTitle(taskaya.title);
                setDescription(taskaya.description);
                setPriority(taskaya.priority);
                setStatus(taskaya.status);
                setAssignedTo(taskaya.assignedTo);
                setErrors({});
                setIsEditing(true);
              }}
            >
              Edit Task
            </MyButton>
            <MyButton size="small" onClick={() => navigate(`/projects/${id}`)}>
              Back to Project
            </MyButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
