import React, { useState, useEffect } from "react";
import type { Task, Card } from "../../../types";
import CardItem from "../../common/card";
import SortableCard from "../../common/sortable-card";
import CardModal from "../../common/modal";
import "./style.scss";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useCards } from "../../../context/CardsContext";

export default function Home() {
  const { openModal, closeModal } = useCards();
  const [form, setForm] = useState({ title: "" });
  const [editTaskText, setEditTaskText] = useState("");
  const [draftTasks, setDraftTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null); 
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [cards, setCards] = useState<Card[]>(() => {
    try {
      const savedCards = localStorage.getItem("cards");
      return savedCards ? JSON.parse(savedCards) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = form.title.trim() || "Untitled";

    if (editingId === null) {
      const newCard: Card = {
        id: Date.now(),
        title,
        tasks: draftTasks,
      };
      setCards((prevCards) => [...prevCards, newCard]);
    } else {
      setCards((prev) =>
        prev.map((card) =>
          card.id === editingId ? { ...card, title, tasks: draftTasks } : card,
        ),
      );
    }

    handleClose()
  };

  const toggleTask = (cardId: number, taskId: number) => {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            tasks: card.tasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task,
            ),
          };
        }
        return card;
      }),
    );
  };

  const deleteCard = (cardId: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  const resetForm = () => {
    setForm({ title: "" });
    setDraftTasks([]);
    setTaskText("");
    setEditingId(null);
    setEditingTaskId(null);
    setEditTaskText("");
  };

  const saveTask = () => {
    const text = taskText.trim();
    if (!text) return;

    setDraftTasks((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ]);
    setTaskText("");
  };

  const saveEditedTask = () => {
    const text = editTaskText.trim();
    if (!text) return;

    setDraftTasks((prev) =>
      prev.map((task) =>
        task.id === editingTaskId ? { ...task, text } : task,
      ),
    );

    setEditingTaskId(null);
    setEditTaskText("");
  };

  const cancelEditTask = () => {
    setEditingTaskId(null);
    setEditTaskText("");
  };

  const deleteDraftTask = (taskId: number) => {
    setDraftTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const startEditTask = (task: Task) => {
    setEditTaskText(task.text);
    setEditingTaskId(task.id);
  };

  const openEdit = (card: Card) => {
    setEditingId(card.id);
    setForm({ title: card.title });
    setDraftTasks(card.tasks);
    openModal();
  };

  const handleClose = () => {
    closeModal();
    resetForm();
    };
  

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setCards((prev) => {
      const from = prev.findIndex((c) => c.id === active.id);
      const to = prev.findIndex((c) => c.id === over.id);
      return arrayMove(prev, from, to);
    });
  };

  return (
    <div className="home">
      <h1 className="card-title">To-Do List</h1>

      <button className="btn btn-primary btn-new-card" onClick={openModal}>
        New Card
      </button>

      <CardModal
        isEditing={editingId !== null}
        title={form.title}
        taskText={taskText}
        editTaskText={editTaskText}
        draftTasks={draftTasks}
        editingTaskId={editingTaskId}
        onHandleChange={handleChange}
        onSubmit={handleSubmit}
        onCloseModal={handleClose}
        onSetTaskText={setTaskText}
        onSaveTask={saveTask}
        onSetEditTaskText={setEditTaskText}
        onSaveEditedTask={saveEditedTask}
        onCancelEditTask={cancelEditTask}
        onStartEditTask={startEditTask}
        onDeleteDraftTask={deleteDraftTask}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={cards.map((c) => c.id)}
          strategy={rectSortingStrategy}
        >
          <div className="cards">
            {cards.map((card) => (
              <SortableCard key={card.id} id={card.id}>
                <CardItem
                  card={card}
                  onEdit={openEdit}
                  onDelete={deleteCard}
                  onToggleTask={toggleTask}
                />
              </SortableCard>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}