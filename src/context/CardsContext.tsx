import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { Card, Task } from "../types";
import { arrayMove } from "@dnd-kit/sortable"

type CardsContextType = {
  isOpen: boolean;
  deleteCard: (cardId: number) => void;
  recordedCards: (activeId: number, overId: number) => void;
  toggleTask: (cardId: number, taskId: number) => void;
  openModal: () => void;
  closeModal: () => void;
  openEdit: (card: Card) => void;
  editingCard: Card | null;
  saveCard: (name: string, tasks: Task[]) => void;
  cards: Card[];
};

const CardsContext = createContext<CardsContextType | null>(null);

export function CardsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [cards, setCards] = useState<Card[]>(() => {
    try {
      const saved = localStorage.getItem("cards");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
  }
  });

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

const openEdit = (card: Card) => {
    setEditingCard(card);
    setIsOpen(true);
  };
  
  const openModal = () => {
    setIsOpen(true);
    setEditingCard(null);
  };
  const closeModal = () => {
    setIsOpen(false);
    setEditingCard(null);
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

   const saveCard = (title: string, tasks: Task[]) => {
    if (editingCard === null) {
      setCards((prev) => [...prev, { id: Date.now(), title, tasks }]);
    } else {
      setCards((prev) =>
        prev.map((task) =>
          task.id === editingCard.id ? { ...task, title, tasks } : task
        )
      );
    }
    closeModal();
  };

  const recordedCards = (activeId: number, overId: number) => {
setCards((prev) => {
      const from = prev.findIndex((c) => c.id === activeId);
      const to = prev.findIndex((c) => c.id === overId);
      return arrayMove(prev, from, to);
    });
  };

    const deleteCard = (cardId: number) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  return (
    <CardsContext.Provider
      value={{ isOpen, openModal, closeModal, openEdit, editingCard, saveCard, cards, toggleTask, recordedCards, deleteCard }}
    >
      {children}
    </CardsContext.Provider>
  );
}

export function useCards() {
  const ctx = useContext(CardsContext);
  if (ctx === null) {
    throw new Error("useCards має бути всередині <CardsProvider>");
  }
  return ctx;
}
