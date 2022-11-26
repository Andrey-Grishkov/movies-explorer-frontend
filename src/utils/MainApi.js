import { baseUrl, beatFilmMovies } from '../utils/constants';

class Api {
  _url;
  _headers;

  constructor(baseUrl, headers) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovieCards() {
    return fetch(`${this._url}/movies`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

  handleAddMovieCard(data) {

    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: `${beatFilmMovies}${data.image.url}`,
        trailerLink: data.trailerLink,
        thumbnail: beatFilmMovies+data.image.formats.thumbnail.url,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
      credentials: "include"
    }).then(this._checkResponse);
  }

  deleteMovieCard(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: "include",
    }).then(this._checkResponse);
  }

  addUserInfo(email, name) {
    console.log(email, name)
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({email, name}),
    }).then(this._checkResponse);
  }
}

const headers = {
  'Content-Type': 'application/json',
};

const api = new Api(baseUrl, headers);

export default api;
