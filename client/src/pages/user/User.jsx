import React, { useEffect, useState } from "react";
import LoginModal from "../../components/loginModal/LoginModal";
import UsersService from "../../services/user.service";
import { message } from "antd";
import img from "../../assets/tom.myspace.jpeg";

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({});

  const fetchUser = (token) => {
    UsersService.loggedUser(token)
      .then((res) => {
        setUser(res.data);
        setIsModalOpen(false);
      })
      .catch(() => {
        message.error("Error fetching user data.");
      });
  };

  const signOut = () => {
    UsersService.signOut();
  };

  const loginRequire = () => {
    message.info("It is necessary to log in to view the profile.");
    setIsModalOpen(true);
  };

  const verifyToken = () => {
    const token = UsersService.getCookieToken();
    token === "" ? loginRequire() : fetchUser(token);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <div>
      {!isModalOpen && (
        <div className="flex flex-col items-center mt-10">
          <img
            src={img} // Replace "profile-picture.jpg" with the path to your profile picture
            alt="Profile Picture"
            className="w-32 h-32 rounded-full mb-4"
          />
          <input
            type="text"
            placeholder="Name"
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-4"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-4"
          />
          <input
            type="password"
            placeholder="New Password"
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-4"
          />
          <input
            type="password"
            placeholder="Re-type New Password"
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-4"
          />
          <button
            type="submit"
            className="gradient-button focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      )}

      <br />
      <button onClick={signOut}>SignOut</button>
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => verifyToken()}
        onLogin={verifyToken}
      />
    </div>
  );
};

export default User;
