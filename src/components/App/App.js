import React from 'react';
import { useState, useEffect } from 'react';
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
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
  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const history = useNavigate();
  const [regIn, setRegIn] = useState(false);
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [result, setResult] = useState([]);

  const onRegister = (data) => {
    const {email, name, password} = data;
    auth.
      register({email, name, password})
      .then((res) => {
        console.log(res, 'Данные регистрации');
        if (res) {
          setRegIn(true);
          setInfoTooltipStatus(true);
          setInfoTooltipMessage('Вы успешно зарегистрированы!');
          setInfoTooltip(true);
          history('/signin');
        }
      })
      .catch((err) => {
        setRegIn(false);
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
          // setCurrentUser(res);
          // setLoggedIn(true);
          history('/movies');
        }
      })
      .catch((err) => {
        setInfoTooltipStatus (false);
        setInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.')
        setInfoTooltip(true);
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
          }
        })
        .catch((err) => {
          // setLoggedIn(false)
          console.log(`Ошибка: ${err}`);
        })
    }, [loggedIn]);

  console.log('___________________________');
  console.log(currentUser, 'currentUser');
  console.log(loggedIn, 'loggedIn');
  console.log('___________________________');

  function handleLogout() {
    auth.logout()
      .then(() => {
        setInfoTooltipStatus (true);
        setInfoTooltipMessage('Вы вышли из аккаунта!')
        setInfoTooltip(true);
        setCurrentUser({});
        setLoggedIn(false);
        localStorage.clear();
        setSavedMovies([]);
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

  useEffect(() => {
    setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')) ?
      JSON.parse(localStorage.getItem('savedMovies')) : [])
  }, [])

  useEffect(() => {
    setResult(JSON.parse(localStorage.getItem('movies')) ?
      JSON.parse(localStorage.getItem('movies')) : [])
  }, [])

  const handleGetMoviesCards = (request) => {
    setIsLoading(true);
    apiMovies
      .getMoviesCards()
      .then((res) => {
        setResult(moviesFilter(res, request))
        localStorage.setItem('movies', JSON.stringify(result));
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });

    api
      .getMovieCards()
      .then((res) => {
        const findFavoritesMovies = [];
        res.forEach((movie) => {
          findFavoritesMovies.push(movie.nameRU)
        })
        localStorage.setItem('FavoritesMoviesBtn', JSON.stringify(findFavoritesMovies));
        setSavedMovies(moviesFilter(res, request))
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
  };

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
    api.getMovieCards()
      .then((res) => {
        setSavedMovies(moviesFilter(res, request));
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
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
          <Header auth={loggedIn}/> :
          <></>}
        <Routes>
          <Route exact path='/' element={
            <Main />
          }>
          </Route>
          <Route exact path='/signup' element={
            <Register onRegister={onRegister}/>
          }>
          </Route>
          <Route exact path='/signin' element={
            <Login onLogin={onLogin}/>
          }>
          </Route>
            <Route exact path='/movies' element={
              <ProtectedRoute loggedIn={loggedIn}>
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
              <ProtectedRoute loggedIn={loggedIn}>
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
              <ProtectedRoute loggedIn={loggedIn}>
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
