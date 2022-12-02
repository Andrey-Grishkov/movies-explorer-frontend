import { BEAT_FILM_MOVIES_SERVER, HEADERS } from '../utils/constants';

class Api {
  _url;
  _headers;

  constructor(BEAT_FILM_MOVIES_SERVER, HEADERS) {
    this._url = BEAT_FILM_MOVIES_SERVER;
    this._headers = HEADERS;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMoviesCards() {
    return fetch(`${this._url}`, {
      headers: this._headers,
      // credentials: "include",
    }).then(this._checkResponse);
  }
}

const apiMovies = new Api(BEAT_FILM_MOVIES_SERVER, HEADERS);

export default apiMovies;
