import { useState } from "react";
import { useUsers } from "../../../context/UsersContext";

export default function UsersForm() {
  const { addUser } = useUsers();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    if (!cleanName || !cleanEmail) return;

    addUser(cleanName, cleanEmail);

    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="table-panel__toolbar">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}
