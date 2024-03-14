import { message } from 'antd';
import http from './http-common'
import UsersDataService from './user_data.service';
import UsersTokenService from './user_token.service';

const url = '/auth/v1/';

const verifyEmail = token => {
  let body = {};
  http.put(`${url}user`, body, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: `Bearer ${token}`
    }
  }).then(() => {
    message.success('Verified successfully.');
    setTimeout(() => {
      window.location.href = '/'; // Redirect to startupPage after message
  }, 1000); // Adjust the delay to match your message duration
  }).catch(() => {
    message.error('Verification not possible, invalid key.');
  });
};

const signUp = (password: string, email: string) => {
  let body = {
    "email": email,
    "password": password
  };
  http.post(`${url}signup`, body).then((res) => {
    message.success('Registered successfully. You will receive a verification email at that email address.');
    UsersDataService.createUserData(res.data);
  }).catch(() => {
    message.error('Invalid email');
  });
};

const signIn = (password: string, email: string, onLogin: Function, onClose: Function) => {
  let body = {
    "email": email,
    "password": password
  };
  http.post(`${url}token?grant_type=password`, body).then((res) => {
    const token = res.data;
    UsersTokenService.setCookieToken(token.access_token, token.expires_in);
    onClose();
    onLogin();
  }).catch(() => {
    message.error('Invalid email or password');
  });
};

const loggedUser = () => {
  return http.get(`${url}user`, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: `Bearer ${UsersTokenService.getCookieToken()}`
    }
  })
};

const signOut = () => {
  document.cookie = 'access_token=; Max-Age=0; path=/';
  window.location.href = '/';
};

// const deleteAccount = () => {

// }

const UsersAuthService = {
  signUp,
  signIn,
  verifyEmail,
  loggedUser,
  signOut,
  // deleteAccount
}

export default UsersAuthService;