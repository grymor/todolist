import { useState } from "react";

interface TaskFormProps {
  onAdd: (text: string) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [text, setText] = useState("");
  

  const submit = () => {
    const cleanText = text.trim();
    if (!cleanText) return;
    onAdd(cleanText);
    setText("");
  }
  return (
    <div className="modal-task-row">
          <input
            type="text"
            placeholder="Add a task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
          />

          <button type="button" className="btn btn-primary" onClick={submit}>
            Add task
          </button>
        </div>
  )
}
