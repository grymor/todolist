import { useState } from "react";
import { Receipt } from "../../../types";
import { useReceipts } from "../../../context/ReceiptsContext";

export default function ReceiptTable() {
  const { receipts, updateReceipt, deleteReceipt } = useReceipts();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  const handleEdit = (user: Receipt) => {
    setEditingId(user.id);
    setDraftTitle(user.title);
  };

  const handleSave = (id: number) => {
    updateReceipt(id, draftTitle);
    setEditingId(null);
  };
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Receipt</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {receipts.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>

            <td>
              {editingId === user.id ? (
                <input
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                />
              ) : (
                user.title
              )}
            </td>

            <td>
              {editingId === user.id ? (
                <>
                  <button
                    type="button"
                    className="table-panel__action"
                    onClick={() => handleSave(user.id)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="table-panel__action"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="table-panel__action"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
              )}
              <button
                type="button"
                className="table-panel__action table-panel__action--danger"
                onClick={() => deleteReceipt(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
