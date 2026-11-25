import { useState } from 'react'
import { useCards } from "../../../../context/CardsContext";
import type { Task } from "../../../../types";
import TaskForm from '../task-form'
import TaskItem from '../task-item'



export default function CardForm() {
    const { editingCard, saveCard } = useCards();
    const [title, setTitle] = useState(editingCard?.title ?? "");
  const [tasks, setTasks] = useState<Task[]>(editingCard?.tasks ?? []);

  const addTask = (text:string) => {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ]);
  };
  

  const saveTask = (id: number, text: string) =>
    setTasks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text } : item))
    );

  const deleteTask = (id: number) =>
    setTasks((prev) => prev.filter((item) => item.id !== id));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    saveCard(title.trim() || "Untitled", tasks);
  };

  

  return (
    <form onSubmit={handleSubmit} className="modal-form">
        <input
          type="text"
          name="title"
          className="modal-title-input"
          placeholder="Add a card name..."
          value={title}
          onChange={(e) => setTitle(e.target.value) }
        />

        <TaskForm onAdd={addTask}/>

        <div className="modal-tasks">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onDelete={deleteTask} onSave={saveTask}/>
          ))}
        </div>

        <button type="submit" className="btn btn-primary modal-submit">
          {editingCard ? "Apply" : "Add New Card"}
        </button>
      </form>
  )
}
