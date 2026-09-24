import { createContext, useState, useContext, useEffect } from "react";
import { initialUsers } from "../data/mockData.js";
export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null,
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || initialUsers,
  );
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  function deleteUser(id) {
    setUser([...user.filter((User) => User.id !== id)]);
  }

  function addUser(newUser) {
    setUser([...user, newUser]);
  }

  function maxId() {
    return Math.max(...user.map((User) => User.id));
  }

  function editUser(id, name, password) {
    setUser(user.map((p) => (p.id === id ? { ...p, name, password } : p)));
  }

  function signup(name, email, password) {
    if (user.some((u) => u.email === email)) return "Email already Exists";
    const newUser = { id: maxId() + 1, name, email, password }
    setUser([...user, newUser]);
    setCurrentUser(newUser)
    return null;
  }

  function login(email, password) {
    const userLog =user.find((u) => (u.email === email && u.password === password));
    if (userLog){
        setCurrentUser(userLog)
        return null;
    }else return "Email or Password is false";
  }

  function logout() {
    setCurrentUser(null)
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, maxId, addUser, deleteUser, editUser, signup, currentUser, login, logout}}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
