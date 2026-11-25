import CardItem from "../../common/card-item";
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
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import { useCards } from "../../../context/CardsContext";

export default function Home() {
  const { openModal, openEdit, cards, toggleTask, recordedCards, deleteCard } =
    useCards();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    recordedCards(Number(active.id), Number(over.id));
  };

  return (
    <div className="home">
      <h1 className="card-title">To-Do List</h1>

      <button className="btn btn-primary btn-new-card" onClick={openModal}>
        New Card
      </button>

      <CardModal />

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
