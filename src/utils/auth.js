const baseUrl = 'http://localhost:3001';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({email, name, password}) => {
  console.log({email, name, password});
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

// export const checkToken = () => {
//   return fetch(`${baseUrl}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     credentials: "include",
//   }).then(checkResponse);
// }

export const logout = () => {
    return fetch(`${baseUrl}/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(checkResponse);
};
