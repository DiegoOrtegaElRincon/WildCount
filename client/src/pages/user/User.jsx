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
    <div className="dataForm">
      {!isModalOpen && (
        <div className="flex flex-col items-center mt-40 mb-8">
          <img
            src={img} // Replace "profile-picture.jpg" with the path to your profile picture
            alt="Profile Picture"
            className="w-42 h-42 rounded mb-8"
          />
          <input
            type="text"
            placeholder="Name"
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-8"
          />
          <input
            type="email"
            placeholder="Email"
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-8"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-8"
          />

          <input
            type="password"
            placeholder="New Password"
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-8"
          />

          <button
            type="submit"
            className="gradient-button w-[250px] text-white font-bold rounded mb-3"
          >
            Submit
          </button>
          <button
            onClick={signOut}
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-8 focus:outline-none text-[#ADA8A8] w-[180px]  sign_btn"
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

      {/* Animation for decorative elements */}
      <div className="left-animation" />
      <div className="right-animation" />
    </div>
  );
};

export default User;
