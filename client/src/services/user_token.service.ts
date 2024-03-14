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

const UsersTokenService = {
  getCookieToken,
  setCookieToken
}

export default UsersTokenService;