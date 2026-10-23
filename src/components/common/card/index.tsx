import type { Card } from "../../../types";
import "./style.scss";

type CardItemProps = {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (cardId: number) => void;
  onToggleTask: (cardId: number, taskId: number) => void;
};



export default function CardItem({ card, onEdit, onDelete, onToggleTask }: CardItemProps) {
  return (
    <>
      <div className="card-header">
              <h2>{card.title}</h2>

              <button onClick={() => onEdit(card)} className="btn btn-danger">
                Edit card
              </button>

              <button
                onClick={() => onDelete(card.id)}
                className="btn btn-danger"
              >
                Delete card
              </button>
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

