import { ReactNode, useContext, useEffect, useState, createContext } from "react";
import { User } from "../types";

type UsersContextType = {
  users: User[];
  addUser: (name: string, email: string) => void;
  updateUser: (id: number, name: string, email: string) => void;
  deleteUser: (id: number) => void;
};

const UsersContext = createContext<UsersContextType | null>(null);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem("users");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (name: string, email: string) =>
    setUsers((prev) => [...prev, { id: Date.now(), name, email }]);

    const updateUser = (id: number, name: string, email: string) =>
    setUsers((prev) =>
      prev.map((User) => (User.id === id ? { ...User, name, email } : User))
    );

  
  const deleteUser = (cardId: number) => {
    setUsers((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };
  

  return (
    <UsersContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (ctx === null) throw new Error("useUsers має бути всередині <UsersProvider>");
  return ctx;
}