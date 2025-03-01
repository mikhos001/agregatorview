import React from 'react';
import './Modal.css';

function Modal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Подтверждение</h2>
        <p>Вы действительно хотите выйти?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="modal-button confirm">Да</button>
          <button onClick={onClose} className="modal-button cancel">Нет</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
