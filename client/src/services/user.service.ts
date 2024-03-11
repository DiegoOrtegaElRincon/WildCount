import {message} from 'antd';
import http from './http-common';

const url = '/auth/v1/';

const getToken = () => {
  let cookie = document.cookie.split('; ').find(cookie => cookie.startsWith('sb-access-token='))?.split('=')[1];
  let token = `Bearer ${cookie}`;
  return token;
}

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
}

const signUp = (password:string, email:string) => {
  let body = {
    "email": email,
    "password": password
  };
  http.post(`${url}signup`, body).then(() => {
    message.success('Registered successfully.');
  }).catch(() => {
    message.error('Invalid email');
  });
}

const signIn = (password:string, email:string, onLogin:Function) => {
  let body = {
    "email": email,
    "password": password
  };
  http.post(`${url}token?grant_type=${password}`, body).then(() => {
    onLogin();
  }).catch(() => {
    message.error('Invalid email or password');
  });
}

const loggedUser = () => {
  http.get(`${url}user`, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: getToken()
    }
  });
}

const signOut = () => {
  //Delete the cookie
}

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