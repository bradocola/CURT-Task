import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useProject } from "../context/ProjectContext.jsx";
import { useTask } from "../context/TaskContext.jsx";
import { useState } from "react";
import MyButton from "../components/buttons/Button.jsx";
import { initialUsers } from "../data/mockData.js";
const TaskDetails = () => {
    const { project } = useProject();
    const { task } = useTask();
    const { id , taskId } = useParams();
    const navigate = useNavigate();
    const projectaya = project.find((project) => project.id === parseInt(id));
    const taskaya = task.find((task) => task.id === parseInt(taskId));
    if(!taskaya){
        return <div className="justify-center">Project not found</div>;
    }
    const assignee = initialUsers.find((u) => u.id === taskaya.assignedTo);
    return (
        <div className="flex justify-center items-center h-screen">
            <button className="text-6xl hover:opacity-50" onClick={() => navigate(`/projects/${id}`)}> ⬅️ </button>
            <h1 className="text-4xl font-bold">Tasks Page</h1>
        </div>
    )
}

export default TaskDetails;