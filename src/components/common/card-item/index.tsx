import { useState } from "react";
import type { Card } from "../../../types";
import ConfirmModal from "./confirm-modal";
import "./style.scss";

type CardItemProps = {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (cardId: number) => void;
  onToggleTask: (cardId: number, taskId: number) => void;
};



export default function CardItem({ card, onEdit, onDelete, onToggleTask }: CardItemProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  return (
    <>
      <div className="card-header">
              <h2>{card.title}</h2>

              <button onClick={() => onEdit(card)} className="btn btn-danger">
                Edit card
              </button>

              <button
                onClick={() => setIsConfirmOpen(true)}
                className="delete-card"
                aria-label="Delete card"
                type="button"
              >
                x
        </button>
        <ConfirmModal
  isOpen={isConfirmOpen}
  message={`Delete "${card.title}"?`}
  onConfirm={() => {
    onDelete(card.id);
    setIsConfirmOpen(false);
  }}
  onCancel={() => setIsConfirmOpen(false)}
/>
            </div>
            <div className="tasks">
              {card.tasks.map((task) => (
                <div className="task" key={task.id}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleTask(card.id, task.id)}
                  />

                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
    </>
  )
}

