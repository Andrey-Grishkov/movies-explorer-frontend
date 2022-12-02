import { baseUrl } from '../utils/constants';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({email, name, password}) => {
  console.log({email, name, password}, 'console in auth');
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, name, password}),
    credentials: "include",
  }).then(checkResponse);
};

export const authorize = ({email, password}) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const logout = () => {
  console.log('viatka');
    return fetch(`${baseUrl}/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(checkResponse);
};
