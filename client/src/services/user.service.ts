import { message } from 'antd';
import http from './http-common'

const url = '/auth/v1/';

const getCookieToken = () => {
  const cookies = document.cookie.split(';');
  let token = '';
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
    if (cookieName === 'access_token') {
      token = cookieValue;
    }
  }
  return token;
};

const setCookieToken = (value, seconds) => {
  const expirationDate: Date = new Date();
  expirationDate.setTime(expirationDate.getTime() + (seconds * 1000));
  const cookieValue: string = `access_token=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieValue;
};

const verifyEmail = token => {
  let body = {};
  http.put(`${url}user`, body, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: `Bearer ${token}`
    }
  }).then(() => {
    message.success('Verified successfully.');
    window.location.href = '/';
  }).catch(() => {
    message.error('Verification not possible, invalid key.');
  });
};

const signUp = (password: string, email: string) => {
  let body = {
    "email": email,
    "password": password
  };
  http.post(`${url}signup`, body).then(() => {
    message.success('Registered successfully. You will receive a verification email at that email address.');
  }).catch(() => {
    message.error('Invalid email');
  });
};

const signIn = (password: string, email: string, onLogin: Function, onClose: Function) => {
  let body = {
    "email": email,
    "password": password
  };
  http.post(`${url}token?grant_type=${password}`, body).then((res) => {
    const token = res.data;
    setCookieToken(token.access_token, token.expires_in);
    onClose();
    onLogin();
  }).catch(() => {
    message.error('Invalid email or password');
  });
};

const loggedUser = (token) => {
  return http.get(`${url}user`, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: `Bearer ${token}`
    }
  })
};

const signOut = () => {
  document.cookie = 'access_token=; Max-Age=0; path=/';
  window.location.href = '/';
};

// const deleteAccount = () => {

// }

const UsersService = {
  getCookieToken,
  signUp,
  signIn,
  verifyEmail,
  loggedUser,
  signOut,
  // deleteAccount
}

export default UsersService;