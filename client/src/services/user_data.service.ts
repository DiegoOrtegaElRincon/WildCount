import http from './http-common';


const APIURL = import.meta.env.VITE_API_URL;
const url = 'rest/v1/user_data';

const createUserData = userData => {
  let body = {
    user_id: userData.id,
    email: userData.email,
    name: null,
    phone: null
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

const updateUserData = (userData, token) => {
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

const updateUserImage = (userId, file, token) => {
  let body = new FormData();
  body.append('image', file);
  http.put(`storage/v1/object/user_image/${userId}_image`, body, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: `Bearer ${token}`
    }
  });
};

const getUserImage = (userId) => {
  return `${APIURL}storage/v1/object/public/user_image/${userId}_image`;
};

const createUserImage = (userId, file, token) => {
  let body = new FormData();
  body.append('image', file);
  http.post(`storage/v1/object/user_image/${userId}_image`, body, {
    headers: {
      ...http.defaults.headers.common,
      Authorization: `Bearer ${token}`
    }
  });
};

const UsersDataService = {
  createUserData,
  getUserData,
  updateUserData,
  updateUserImage,
  getUserImage,
  createUserImage
};

export default UsersDataService;