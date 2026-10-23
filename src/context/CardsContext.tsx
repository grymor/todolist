import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Card, Task } from "../types";

type CardsContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const CardsContext = createContext<CardsContextType | null>(null);


export function CardsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);     // що треба зробити зі станом?
    const closeModal = () => setIsOpen(false);

  return (
    <CardsContext.Provider value={{ isOpen, openModal, closeModal }}>
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