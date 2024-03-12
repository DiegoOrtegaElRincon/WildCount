import React, { useEffect, useState } from 'react'
import LoginModal from '../../components/loginModal/LoginModal';
import UsersService from '../../services/user.service';
import { message } from 'antd';

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({});

  const fetchUser = (token) => {
    UsersService.loggedUser(token).then(res => {
      setUser(res.data)
      setIsModalOpen(false);
    }).catch(() => {
      message.error('Error fetching user data.');
    });

  };

  const signOut = () => {
    UsersService.signOut();
  }

  const loginRequire = () => {
    message.info('It is necessary to log in to view the profile.');
    setIsModalOpen(true);
  };

  const verifyToken = () => {
    const token = UsersService.getCookieToken();
    token === '' ? loginRequire() : fetchUser(token);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div>
      User
      <br/>
      <button onClick={signOut}>SignOut</button>
      <LoginModal isOpen={isModalOpen} onClose={() => verifyToken()} onLogin={verifyToken} />
    </div>
  )
}

export default User
