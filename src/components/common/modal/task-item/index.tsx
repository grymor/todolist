import { useState } from "react";
import type { Task } from "../../../../types";

interface TaskItemProps {
    task: Task;
    onSave: (id: number, text: string) => void;
    onDelete: (id: number) => void;

}

export default function TaskItem({ task, onDelete, onSave }: TaskItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);
    

   const save = () => {
  const cleanText = editText.trim();
  if (!cleanText) return;
  onSave(task.id, cleanText);
  setIsEditing(false);
};

     const cancel = () => {
  setEditText(task.text);            
  setIsEditing(false);
};
    


  return (
    <div className="task">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={save}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        save(); 
                      }
                    }}
                  >
                    Save
                  </button>
                  <button type="button" onClick={cancel}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{task.text}</span>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="edit-task"
                    aria-label="Edit task"
                    type="button"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(task.id)}
                    className="delete-task"
                    aria-label="Delete task"
                    type="button"
                  >
                    x
                  </button>
                </>
              )}
            </div>
  )
}
