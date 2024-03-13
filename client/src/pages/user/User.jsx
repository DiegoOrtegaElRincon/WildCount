import React, { useEffect, useState } from "react";
import LoginModal from "../../components/loginModal/LoginModal";
import UsersService from "../../services/user.service";
import { message } from "antd";
import img from "../../assets/tom.myspace.jpeg";
import "./user.scss";

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
        <div className="flex flex-col items-center mt-40 mb-8">
          <img
            src={img} // Replace "profile-picture.jpg" with the path to your profile picture
            alt="Profile Picture"
            className="w-32 h-32 rounded mb-8"
          />
          <input
            type="text"
            placeholder="Name"
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-8 "
          />
          <input
            type="email"
            placeholder="Email"
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-8 "
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-8 "
          />

          <button
            type="submit"
            className="gradient-button focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          <button
            onClick={signOut}
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-8 focus:outline-none text-[#ADA8A8]   sign_btn"
          >
            Sign Out
          </button>
        </div>
      )}

      <br />

      <LoginModal
        isOpen={isModalOpen}
        onClose={() => verifyToken()}
        onLogin={verifyToken}
      />
    </div>
  );
};

export default User;
