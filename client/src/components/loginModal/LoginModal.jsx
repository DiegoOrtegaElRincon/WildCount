import React, { useState } from 'react';
import './LoginModal.scss';
import { loginInput, loginButton } from '../../constants';
import { Link } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent form submission
    // Validation logic
    if (!username || !password) {
      alert('Both fields are required!');
      return;
    }

    onClose(); // Close the modal
    onLogin(); // Perform login action
  };

  const handleGuest = () => {
    onClose();
    onLogin();
  };

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto z-50`}>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded w-72 text-center relative">
          <div className='absolute right-2 top-5 cursor-pointer' onClick={onClose}>
            <span className='bg-black h-1 w-6 block rotate-45'></span>
            <span className='bg-black h-1 w-6 block -rotate-45 -translate-y-1'></span>
          </div>
          <h2 className="text-xl font-bold mb-4">Login</h2>
          <form onSubmit={(event) => handleLogin(event)}>
          <input
              className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 border-gradient"
              type="text"
              name="Name"
              placeholder="Username"
              onChange={(e)=>{setUsername(e.target)}}
            />
            <input
              className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 border-gradient"
              type="password"
              name="Password"
              placeholder="Password"
              onChange={(e)=>{setPassword(e.target)}}
            />
            {loginButton.map((loginButton) => (
              <button
                className="w-full px-4 py-2 mb-2 rounded gradient-button focus:outline-none"
                key={loginButton.id}
                type="submit"
              >
                {loginButton.text}
              </button>
            ))}
          </form>
          <div className="text-sm">
            <button onClick={handleGuest} to="/home" className="text-blue-500">Continue as Guest</button> |
            <Link to="/" className="text-blue-500"> Google Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
