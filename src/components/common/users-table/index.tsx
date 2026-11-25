import { useState } from "react";
import { useUsers } from "../../../context/UsersContext";
import { User } from "../../../types";


export default function UsersTable() {

      const { users, deleteUser, updateUser } = useUsers();
      const [editingId, setEditingId] = useState<number | null>(null);
      const [draftName, setDraftName] = useState("");
      const [draftEmail, setDraftEmail] = useState("");

      const handleEdit = (user: User) => {
  setEditingId(user.id);
  setDraftName(user.name);
  setDraftEmail(user.email);
};

const handleSave = (id: number) => {
  updateUser(id, draftName, draftEmail);
  setEditingId(null);
    };
    


  return (
  <table>
  <thead>
    <tr><th>ID</th><th>Name</th><th>Email</th><th>Actions</th></tr>
  </thead>
  <tbody>
    {users.map((user, index) => (
      <tr key={user.id}>
        <td>{index + 1}</td>

        <td>
    {editingId === user.id ? (
      <input value={draftName} onChange={(e) => setDraftName(e.target.value)} />
    ) : (
      user.name
    )}
  </td>

  <td>
    {editingId === user.id ? (
      <input value={draftEmail} onChange={(e) => setDraftEmail(e.target.value)} />
    ) : (
      user.email
    )}
  </td>
    <td>


    {editingId === user.id ? (
      <>
        <button type="button" className="table-panel__action" onClick={() => handleSave(user.id)}>Save</button>
        <button type="button" className="table-panel__action" onClick={() => setEditingId(null)}>Cancel</button>
      </>
    ) : (
      <button type="button" className="table-panel__action" onClick={() => handleEdit(user)}>Edit</button>
          )}
              <button type="button" className="table-panel__action table-panel__action--danger" onClick={() => deleteUser(user.id)}>Delete</button>
  </td>
      </tr>
    ))}
  </tbody>
        </table>
  )
}
