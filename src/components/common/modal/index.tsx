import Modal from "react-modal";
import type { Task } from "../../../types";
import "./style.scss";
import { useCards } from "../../../context/CardsContext";



type CardModalProps = {
  isEditing: boolean;
  title: string;
  taskText: string;
  editTaskText: string;
  draftTasks: Task[];
  editingTaskId: number | null;
  onHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCloseModal: () => void;
  onSetTaskText: (value: React.SetStateAction<string>) => void;
  onSaveTask: () => void;
  onSetEditTaskText: (value: React.SetStateAction<string>) => void;
  onSaveEditedTask: () => void;
  onCancelEditTask: () => void;
  onStartEditTask: (task: Task) => void;
  onDeleteDraftTask: (taskId: number) => void;
};

export default function CardModal(props: CardModalProps) {
  const { isOpen } = useCards();
  const {
    isEditing,
    title,
    taskText,
    editTaskText,
    draftTasks,
    editingTaskId,
    onHandleChange,
    onSubmit,
    onCloseModal,
    onSetTaskText,
    onSaveTask,
    onSetEditTaskText,
    onSaveEditedTask,
    onCancelEditTask,
    onStartEditTask,
    onDeleteDraftTask,
  } = props;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <button onClick={onCloseModal} className="modal-close" type="button">
        ×
      </button>

      <h2 className="modal-heading">{isEditing ? "Edit card" : "New card"}</h2>

      <form onSubmit={onSubmit} className="modal-form">
        <input
          type="text"
          name="title"
          className="modal-title-input"
          placeholder="Add a card name..."
          value={title}
          onChange={onHandleChange}
        />

        <div className="modal-task-row">
          <input
            type="text"
            placeholder="Add a task..."
            value={taskText}
            onChange={(e) => onSetTaskText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSaveTask();
              }
            }}
          />

          <button type="button" className="btn btn-primary" onClick={onSaveTask}>
            Add task
          </button>
        </div>

        <div className="modal-tasks">
          {draftTasks.map((task) => (
            <div className="task" key={task.id}>
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editTaskText}
                    onChange={(e) => onSetEditTaskText(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={onSaveEditedTask}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        onSaveEditedTask(); 
                      }
                    }}
                  >
                    Save
                  </button>
                  <button type="button" onClick={onCancelEditTask}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span>{task.text}</span>

                  <button
                    onClick={() => onStartEditTask(task)}
                    className="edit-task"
                    aria-label="Edit task"
                    type="button"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDeleteDraftTask(task.id)}
                    className="delete-task"
                    aria-label="Delete task"
                    type="button"
                  >
                    x
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-primary modal-submit">
          {isEditing ? "Apply" : "Add New Card"}
        </button>
      </form>
    </Modal>
  );
}
