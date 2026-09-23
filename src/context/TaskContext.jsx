import { createContext, useState, useContext } from "react";
import { initialTasks } from "../data/mockData.js";
export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
    const [ task ,setTask ] =useState(initialTasks)
    function deleteTask(id) {
        setTask([...(task.filter((task) => (task.id !== id)))]);
    };

    function addTask(newTask) {
        setTask([...task , newTask]);
    };

    function maxId(){
        return Math.max(...(task.map((task) => (task.id))))
    }

    function editTask(id, title, description, priority){
        setTask(task.map((p) =>
            p.id === id ? { ...p, title, description, priority } : p
        ));
    }

    function updateStatus(id, status) {
        setTask(task.map((p) =>
            p.id === id ? { ...p, status } : p
        ));
    }

    return (
        <TaskContext.Provider value={{ task, setTask, maxId, addTask, deleteTask, editTask, updateStatus}}>
            {children}
        </TaskContext.Provider>
    );
}


export const useTask = () => useContext(TaskContext);
