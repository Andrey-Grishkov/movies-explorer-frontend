import React from 'react';
import { useState, useEffect } from 'react';
import {Route, Routes, useLocation, useNavigate, Navigate} from 'react-router-dom';
import './App.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies'
import NotFindPage from '../NotFindPage/NotFindPage'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Movies from '../Movies/Movies';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import apiMovies from '../../utils/MoviesApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import * as auth from "../../utils/auth";
import api from '../../utils/MainApi';
import moviesFilter from "../../utils/moviesFilter";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSaved, setIsLoadingSaved] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const history = useNavigate();
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [result, setResult] = useState([]);
  const [authLogged, setAuthLogged] = useState(false);

  const onRegister = (data) => {
    const {email, name, password} = data;
    auth.
      register({email, name, password})
      .then((res) => {
        console.log(res, 'Данные регистрации');
        if (res) {
          setInfoTooltipStatus(true);
          setInfoTooltipMessage('Вы успешно зарегистрированы!');
          setInfoTooltip(true);
          setCurrentUser(res);
          setLoggedIn(true);
          setAuthLogged(true);
          history('/movies');
          localStorage.setItem('authKey', JSON.stringify(true));
          // handleGetMoviesCards();
          handleGetSavedMoviesCards();
        }
      })
      .catch((err) => {
        setInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.')
        setInfoTooltipStatus (false);
        setInfoTooltip(true);
        console.log(`Ошибка: ${err}`);
      });
  };

  const onLogin = (data) => {
    const {email, password} = data;
    auth
      .authorize({email, password})
      .then((res) => {
        if (res) {
          setInfoTooltipStatus (true);
          setInfoTooltipMessage('Вы успешно авторизировались!');
          setInfoTooltip(true);
          setCurrentUser(res);
          setLoggedIn(true);
          history('/movies');
          setAuthLogged(true);
          localStorage.setItem('authKey', JSON.stringify(true));
          // handleGetMoviesCards();
          handleGetSavedMoviesCards();
        }
      })
      .catch((err) => {
        setInfoTooltipStatus (false);
        setInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.')
        setInfoTooltip(true);
        setAuthLogged(false);
        console.log(`Ошибка: ${err}`);
      });
  };

  useEffect(() => {
      api
        .getUserInfo()
        .then((res) => {
          if (res._id) {
            setCurrentUser(res);
            setLoggedIn(true);
            if(JSON.parse(localStorage.getItem('authKey'))===true){
              setAuthLogged(true);
            }
          }
        })
        .catch((err) => {
          setLoggedIn(false);
          setCurrentUser({});
          localStorage.clear();
          setSavedMovies([]);
          setResult([]);
          setAuthLogged(false);
          console.log(`Ошибка: ${err}`);
        })
    }, [authLogged]);

  function handleLogout() {
    auth.logout()
      .then((res) => {
        setInfoTooltipStatus (true);
        setInfoTooltipMessage('Вы вышли из аккаунта!')
        setInfoTooltip(true);
        setCurrentUser({});
        setLoggedIn(false);
        localStorage.clear();
        setSavedMovies([]);
        setResult([]);
        setAuthLogged(false);
        localStorage.setItem('authKey', JSON.stringify(false));
        history('/');
        console.log(res);
      })
      .catch((err) => {
        setInfoTooltipStatus (false);
        setInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.')
        setInfoTooltip(true);
        console.log(`Ошибка: ${err}`);
      });
  }

  const handleEditProfileClick = () => {
    setIsOpenEditProfile(true);
  };

  const closeAllPopups = () => {
    setInfoTooltip(false);
    setIsOpenEditProfile(false);
  };

  const handleUpdateUserInfo = (email, name) => {
    api.addUserInfo(email, name)
      .then((user) => {
        setInfoTooltipStatus (true);
        setInfoTooltipMessage('Данные пользователя обновлены')
        setInfoTooltip(true);
        setCurrentUser(user);
        setIsOpenEditProfile(false);
      })
      .catch((err) => {
        setInfoTooltipStatus (false);
        setInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.')
        setInfoTooltip(true);
        console.log(`Ошибка: ${err}`);
      });
  }

  // const handleGetMoviesCards = () => {
  //   apiMovies
  //     .getMoviesCards()
  //     .then((res) => {
  //       localStorage.setItem('movies', JSON.stringify(res));
  //     })
  //     .catch((err) => console.log(`Ошибка: ${err}`))
  // };

  //_________ФИЛЬМЫ___________________________

  useEffect(() => {
    setResult(JSON.parse(localStorage.getItem('movies')) === null ? [] : JSON.parse(localStorage.getItem('movies')));
  }, []);

  useEffect(() => {
    setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')) === null ? [] : JSON.parse(localStorage.getItem('savedMovies')));
  }, []);

  const handleGetMoviesCards = (request) => {
    setIsLoading(true);
    apiMovies
      .getMoviesCards()
      .then((res) => {
        setResult(moviesFilter(res, request))
        localStorage.setItem('movies', JSON.stringify(moviesFilter(res, request)));
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });

    const findFavoritesMovies = [];

    JSON.parse(localStorage.getItem('savedMovies')).forEach((movie) => {
      findFavoritesMovies.push(movie.nameRU)
    })
    localStorage.setItem('FavoritesMoviesBtn', JSON.stringify(findFavoritesMovies));

  };

  // const handleFindMoviesCards = (request) => {
  //   setIsLoading(true);
  //   apiMovies
  //     .getMoviesCards()
  //     .then(() => {
  //     })
  //     .catch((err) => console.log(`Ошибка: ${err}`))
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  //
  //   setResult(moviesFilter(JSON.parse(localStorage.getItem('movies')), request));
  //   const findFavoritesMovies = [];
  //   JSON.parse(localStorage.getItem('savedMovies')).forEach((movie) => {
  //     findFavoritesMovies.push(movie.nameRU)
  //   })
  //   localStorage.setItem('FavoritesMoviesBtn', JSON.stringify(findFavoritesMovies));
  // }

  const handleGetSavedMoviesCards = () => {
    api
      .getMovieCards()
      .then((res) => {
        localStorage.setItem('savedMovies', JSON.stringify((res.filter((savedCard) => savedCard.owner===currentUser._id))));
      }).catch((err) => console.log(`Ошибка: ${err}`))
  }

  const handleAddSavedMovieCards = (card) => {
    setIsLoadingSaved(true);
    api.handleAddMovieCard(card)
      .then((res) => {
        const savedAddMovies = JSON.parse(localStorage.getItem('savedMovies'));
        savedAddMovies.push(res)
        localStorage.setItem('savedMovies', JSON.stringify(savedAddMovies));
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
      setIsLoadingSaved(false);
    });
  };

  const deleteMovieCard = (cardId) => {
    JSON.parse(localStorage.getItem('savedMovies')).forEach((movie) => {
      if (movie.movieId === cardId) {
        api.deleteMovieCard(movie._id)
          .then(() => {
            const savedDeleteMovies = JSON.parse(localStorage.getItem('savedMovies')).filter((movie) => !(movie.movieId === cardId))
            localStorage.setItem('savedMovies', JSON.stringify(savedDeleteMovies));
            setSavedMovies(savedDeleteMovies);
          })
          .catch(err => console.log(err));
      }
    })
  }

    const handleDeleteMovieSavedLoc = (cardId) => {
      api.deleteMovieCard(cardId)
        .then(() => {
          const savedRemoveMovies = JSON.parse(localStorage.getItem('savedMovies'))
            .filter((item) => item._id !== cardId);
          localStorage.setItem('savedMovies', JSON.stringify(savedRemoveMovies));
          setSavedMovies(savedRemoveMovies)
    })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleSavedMoviesSearch(request) {
    setIsLoadingSaved(true);
    setSavedMovies(moviesFilter(JSON.parse(localStorage.getItem('savedMovies')), request));

    api.getMovieCards()
      .then((res) => {
      })
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoadingSaved(false);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        {location.pathname === '/' ||
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ||
        location.pathname === '/profile'  ?
          <Header auth={authLogged}/> :
          <></>}
        <Routes>
          <Route exact path='/' element={
            <Main />
          }>
          </Route>
          <Route exact path='/signup' element={
            !authLogged ?
            <Register onRegister={onRegister}/> :
            <Navigate to='/' />
          }>
          </Route>
          <Route exact path='/signin' element={
            !authLogged ?
            <Login onLogin={onLogin}/> :
              <Navigate to='/' />
          }>
          </Route>
            <Route exact path='/movies' element={
              <ProtectedRoute isAuth={loggedIn}>
                <Movies
                 cards={result}
                 onSearch={handleGetMoviesCards}
                 isLoading={isLoading}
                 handleAddCard={handleAddSavedMovieCards}
                 handleDeleteCard={deleteMovieCard}
                />
              </ProtectedRoute>}>
            </Route>
            <Route exact path='/saved-movies' element={
              <ProtectedRoute isAuth={loggedIn}>
              <SavedMovies
                cards={savedMovies}
                onSearch={handleSavedMoviesSearch}
                handleDeleteMovieCard={handleDeleteMovieSavedLoc}
                isLoadingSaved={isLoadingSaved}
              />
              </ProtectedRoute>
            }>
            </Route>
            <Route exact path='/profile' element={
              <ProtectedRoute isAuth={loggedIn}>
              <Profile
                handleLogout={handleLogout}
                handleUpdateUserInfo={handleUpdateUserInfo}
                handleEditProfileClick={handleEditProfileClick}
                isOpenEditProfile={isOpenEditProfile}
                onClose={closeAllPopups}
                currentUser={currentUser}
              />
              </ProtectedRoute>
            }>
            </Route>
          <Route exact path='*' element={
            <NotFindPage />
          }>
          </Route>
          </Routes>
          {location.pathname === '/' ||
          location.pathname === '/movies' ||
          location.pathname === '/saved-movies' ?
            <Footer /> :
            <></>}
        <InfoTooltip
          infoTooltip={infoTooltip}
          infoTooltipStatus={infoTooltipStatus}
          infoTooltipMessage={infoTooltipMessage}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
