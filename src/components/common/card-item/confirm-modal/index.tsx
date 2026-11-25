import Modal from "react-modal";

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ isOpen, message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      className="modal-confirm-delete"
      overlayClassName="modal-overlay"
    >
      <p>{message}</p>
      <div className="buttons">
      <button type="button" onClick={onCancel}>Cancel</button>
        <button type="button" onClick={onConfirm}>Delete</button>
        </div>
    </Modal>
  );
}