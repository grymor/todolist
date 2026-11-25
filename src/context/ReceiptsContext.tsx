import { ReactNode, useContext, useEffect, useState, createContext } from "react";
import { Receipt } from "../types";

type ReceiptsContextType = {
  receipts: Receipt[];
  addReceipt: (title: string) => void;
  updateReceipt: (id: number, title: string) => void;
  deleteReceipt: (id: number) => void;
};

const ReceiptsContext = createContext<ReceiptsContextType | null>(null);

export function ReceiptsProvider({ children }: { children: ReactNode }) {
  const [receipts, setReceipts] = useState<Receipt[]>(() => {
    try {
      const saved = localStorage.getItem("receipts");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("receipts", JSON.stringify(receipts));
  }, [receipts]);

  const addReceipt = (title: string) =>
    setReceipts((prev) => [...prev, { id: Date.now(), title }]);

    const updateReceipt = (id: number, title: string) =>
    setReceipts((prev) =>
      prev.map((Receipt) => (Receipt.id === id ? { ...Receipt, title } : Receipt))
    );

  
  const deleteReceipt = (cardId: number) => {
    setReceipts((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  return (
    <ReceiptsContext.Provider value={{ receipts, addReceipt, updateReceipt, deleteReceipt }}>
      {children}
    </ReceiptsContext.Provider>
  );
}

export function useReceipts() {
  const ctx = useContext(ReceiptsContext);
  if (ctx === null) throw new Error("useReceipts має бути всередині <UsersProvider>");
  return ctx;
}