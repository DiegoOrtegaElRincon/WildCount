import http from './http-common'

const url = 'rest/v1/user_data';

const createUserData = userData => {
  let body = {
    user_id: userData.id,
    email: userData.email,
    name: null,
    phone: null,
    image: null
  };

  http.post(url, body).then(() => {
    console.log('User_data create successfully');
  }).catch(err => {
    console.log(err);
  });
};

const getUserData = (userId, token) => {
  return http.get(`rest/v1/user_data?user_id=eq.${userId}`, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: `Bearer ${token}`
    }
  })
};

const UpdateUserData = (userData, token) => {
  http.put(`rest/v1/user_data?user_id=eq.${userData.user_id}`, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: `Bearer ${token}`
    }
  }).then(res => {
    console.log(res);
  }).catch((err)=> {
    console.log(err);
  });
};

const UsersDataService = {
  createUserData,
  getUserData,
  UpdateUserData
};

export default UsersDataService;