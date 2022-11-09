const beatFilmMovies = 'https://api.nomoreparties.co/beatfilm-movies'

const headers = {
  'Content-Type': 'application/json',
};

class Api {
  _url;
  _headers;

  constructor(beatFilmMovies, headers) {
    this._url = beatFilmMovies;
    this._headers = headers;
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

const apiMovies = new Api(beatFilmMovies, headers);

export default apiMovies;
