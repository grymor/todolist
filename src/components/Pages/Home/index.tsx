import React, { useState, useEffect } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type Card = {
  id: number;
  title: string;
  tasks: Task[];
};

export default function Home() {
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
  const [form, setForm] = useState({ title: "" });
  const [taskInputs, setTaskInputs] = useState<Record<number, string>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = form.title.trim();
    if (!title) return;

    const newCard: Card = {
      id: Date.now(),
      title,
      tasks: [],
    };

    setCards((prevCards) => [...prevCards, newCard]);
    setForm({ title: "" });
  };

  const handleTaskChange = (cardId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInputs((prevInputs) => ({
      ...prevInputs,
      [cardId]: event.target.value,
    }));
  };

  const handleTaskSubmit = (cardId: number, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = (taskInputs[cardId] ?? "").trim();
    if (!text) return;

    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
    };

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, tasks: [...card.tasks, newTask] } : card
      )
    );

    setTaskInputs((prevInputs) => ({
      ...prevInputs,
      [cardId]: "",
    }));
  };

  const deleteTask = (cardId: number, taskId: number) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              tasks: card.tasks.filter((task) => task.id !== taskId),
            }
          : card
      )
    );
  };

  const toggleTask = (cardId: number, taskId: number) => {
    setCards((prevCards) =>
      prevCards.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            tasks: card.tasks.map((task) =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
          };
        }
        return card;
      })
    );
  };

  const deleteCard = (cardId: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  return (
    <div className="home">
      <h1 className="card-title">To-Do List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Add a new card..."
          value={form.title}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

      <div className="cards">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <div className="card-header">
              <h2>{card.title}</h2>

              <button onClick={() => deleteCard(card.id)} className="btn btn-danger">
                Delete card
              </button>
            </div>

            <div className="tasks">
              {card.tasks.map((task) => (
                <div className="task" key={task.id}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(card.id, task.id)}
                  />

                  <span
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.text}
                  </span>

                  <button onClick={() => deleteTask(card.id, task.id)} className="delete-task" aria-label="Delete task">
                    x
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={(event) => handleTaskSubmit(card.id, event)}>
              <input
                type="text"
                placeholder="Add a task..."
                value={taskInputs[card.id] || ""}
                onChange={(event) => handleTaskChange(card.id, event)}
              />

              <button type="submit" className="btn btn-primary">
                Add task
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}