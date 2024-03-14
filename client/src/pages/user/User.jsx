import React, { useEffect, useState } from "react";
import LoginModal from "../../components/loginModal/LoginModal";
import UsersAuthService from "../../services/user_auth.service";
import { message } from "antd";
import "./user.scss";
import UsersTokenService from "../../services/user_token.service";
import UsersDataService from "../../services/user_data.service";
import InputUpload from "../../components/InputUpload/InputUpload";

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveToken, setSaveToken] = useState();
  const [user, setUser] = useState({
    user_id: '',
    email: '',
    name: '',
    phone: '',
    image: ''
  });


  const fetchUser = (token) => {
    setSaveToken(token);
    UsersAuthService.loggedUser(token)
      .then((res) => {
        setIsModalOpen(false);
        UsersDataService.getUserData(res.data.id, token).then(res => {
          let userData = {
            user_id: res.data[0].user_id || '',
            email: res.data[0].email || '',
            name: res.data[0].name || '',
            phone: res.data[0].phone || '',
            image: res.data[0].image
          }
          setUser(userData);
        }).catch((err) => {
          console.error(err);
        });
      })
      .catch(() => {
        message.error("Error fetching user data.");
      });
  };

  const signOut = () => {
    UsersAuthService.signOut();
  };

  const loginRequire = () => {
    message.info("It is necessary to log in to view the profile.");
    setIsModalOpen(true);
  };

  const verifyToken = () => {
    const token = UsersTokenService.getCookieToken();
    token === "" ? loginRequire() : fetchUser(token);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const submitData = () => {
    console.log(user);
    // UsersDataService.UpdateUserData(user);
  }

  return (
    <div className="dataForm">
      {!isModalOpen && (
        <div className="flex flex-col items-center mt-40 mb-8">
          <img
            src={img} // Replace "profile-picture.jpg" with the path to your profile picture
            alt="Profile Picture"
            className="w-42 h-42 rounded mb-8"
          />
          <InputUpload token={saveToken} userId={user.user_id}/>
            
          <input
            type="text"
            placeholder="Name"
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-8"
            value={user.name}
            onChange={(event) => {
              setUser({ ...user, name: event.target.value });
            }}
          />
          <input
            type="email"
            placeholder="Email"
            className="border-gradient rounded-lg px-0.5 py-0.5 mb-8"
            value={user.email}
            onChange={(event) => {
              setUser({ ...user, email: event.target.value });
            }}
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
            value={user.phone}
            onChange={(event) => {
              setUser({ ...user, phone: event.target.value });
            }}
          />
          <button
            type="submit"
            className="gradient-button w-[250px] text-white font-bold rounded mb-3"
            onClick={submitData}
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
