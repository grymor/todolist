import Modal from "react-modal";
import "./style.scss";
import { useCards } from "../../../context/CardsContext";
import CardForm from "./card-form";


export default function CardModal() {
  const { isOpen, closeModal, editingCard } = useCards();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="modal"
      overlayClassName="modal-overlay"
    >
      <button onClick={closeModal} className="modal-close" type="button">
        x
      </button>

      <h2 className="modal-heading">{editingCard ? "Edit card" : "New card"}</h2>

      <CardForm />
    </Modal>
  );
}
