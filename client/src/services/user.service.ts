import {message} from 'antd';
import http from './http-common';

const url = '/auth/v1/';

const getToken = () => {
  let cookie = document.cookie.split('; ').find(cookie => cookie.startsWith('access-token'))?.split('')[1];
  let token = `Bearer ${cookie}`;
  return token;
};

const setCookieToken = (value, seconds) => {
  const expirationDate:Date = new Date();
  expirationDate.setTime(expirationDate.getTime() + (seconds * 1000));
  const cookieValue:string = `access_token=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieValue;
};

const verifyEmail = token  => {
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

const signUp = (password:string, email:string) => {
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

const signIn = (password:string, email:string, onLogin:Function) => {
  let body = {
    "email": email,
    "password": password
  };
  http.post(`${url}token?grant_type=${password}`, body).then((res) => {
    const token = res.data;
    setCookieToken(token.access_token, token.expires_in);
    onLogin();
  }).catch(() => {
    message.error('Invalid email or password');
  });
};

const loggedUser = () => {
  http.get(`${url}user`, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: getToken()
    }
  });
};

const signOut = () => {
  //Delete the cookie
};

// const deleteAccount = () => {
  
// }

const UsersService = {
  signUp,
  signIn,
  verifyEmail,
  loggedUser,
  signOut,
  // deleteAccount
}

export default UsersService;