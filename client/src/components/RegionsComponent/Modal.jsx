import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '5px', position: 'relative', maxWidth: '600px', width: '100%' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>X</button>
                {children}
            </div>
        </div>
    );
};


export default Modal;
