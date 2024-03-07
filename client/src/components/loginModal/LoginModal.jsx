import React from 'react';

const LoginModal = ({ isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
        <button onClick={onClose}>Close Modal</button>
      </div>
    </div>
  );
};

export default LoginModal;
