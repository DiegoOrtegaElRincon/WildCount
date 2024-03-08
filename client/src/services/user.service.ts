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
  });
}

const signUp = (password:string, email:string) => {
  let body = {
    "email": email,
    "password": password
  };
  http.post(`${url}signup`, body);
}

const signIn = (password:string, email:string) => {
  let body = {
    "email": email,
    "password": password
  };
  http.post(`${url}signin`, body);
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
//limpia la cookie (Metodo supabase o el mio?)
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