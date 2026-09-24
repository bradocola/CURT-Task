import { createContext, useState, useContext, useEffect } from "react";
import { initialTasks } from "../data/mockData.js";
export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
    const [task, setTask] = useState(JSON.parse(localStorage.getItem('task')) || initialTasks)

    useEffect(() => {
        localStorage.setItem('task', JSON.stringify(task));
    },
        [task]
    )

    function deleteTask(id) {
        setTask([...(task.filter((task) => (task.id !== id)))]);
    };

    function addTask(newTask) {
        setTask([...task, newTask]);
    };

    function maxId() {
        return task.length === 0 ? 0 : Math.max(...(task.map((task) => (task.id))))
    }

    function deleteTasksByProject(projectId){
        setTask([...(task.filter((task) => (task.projectId !== projectId)))]);
    }

    function editTask(id, updates) {
        setTask(task.map((p) =>
            p.id === id ? { ...p, ...updates} : p
        ));
    }

    function updateStatus(id, status) {
        setTask(task.map((p) =>
            p.id === id ? { ...p, status } : p
        ));
    }

    return (
        <TaskContext.Provider value={{ task, setTask, maxId, addTask, deleteTask, editTask, updateStatus, deleteTasksByProject}}>
            {children}
        </TaskContext.Provider>
    );
}


export const useTask = () => useContext(TaskContext);
