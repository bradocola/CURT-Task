import { createContext, useState, useContext, useEffect } from "react";
import { initialUsers } from "../data/mockData.js";
export const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [ user ,setUser ] =useState(JSON.parse(localStorage.getItem('user'))||initialUsers)
        useEffect(() =>
        {
            localStorage.setItem('user', JSON.stringify(user));
        },
        [user]
    )
    function deleteUser(id) {
        setUser([...(user.filter((User) => (User.id !== id)))]);
    };

    function addUser(newUser) {
        setUser([...user , newUser]);
    };

    function maxId(){
        return Math.max(...(user.map((User) => (User.id))))
    }

    function editUser(id, name, password){
        setUser(user.map((p) =>
            p.id === id ? { ...p, name, password } : p
        ));
    }

    return (
        <UserContext.Provider value={{ user, setUser, maxId, addUser, deleteUser, editUser }}>
            {children}
        </UserContext.Provider>
    );
}


export const useUser = () => useContext(UserContext);
