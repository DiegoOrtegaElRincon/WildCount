import React from 'react';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const handleLogin = () => {
    onClose(); // Close the modal
    onLogin(); // Perform login action
  };

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto z-50`} onClick={onClose}>
      <div className="bg-white w-96 rounded shadow-lg p-6 relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="cursor-pointer absolute right-2 top-2" onClick={onClose}>
          <span className='block h-1 w-6 bg-black rotate-45 translate-y-2'></span>
          <span className='block h-1 w-6 bg-black -rotate-45 translate-y-1'></span>
        </div>
        <h2 className="text-xl font-semibold mb-4">Modal Content</h2> 
        <p className="mb-4">This is the content of the modal.</p>
        <button className='bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 text-white text-xl' onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginModal;
