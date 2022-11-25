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



function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSaved, setIsLoadingSaved] = useState(false);
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const history = useNavigate();
  const [regIn, setRegIn] = useState(false);
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [savedFilteredMovies, setSavedFilteredMovies] = useState([]);

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
          setInfoTooltipMessage('Вы успешно авторизировались!')
          setInfoTooltip(true);
          setLoggedIn(true);
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

  useEffect(() => {
    api
      .getUserInfo()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setCurrentUser(res);
        }
      })
      .catch((err) => console.log(err));
  }, [loggedIn]);

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
  //____________________________________________________________
  //_______________ФИЛЬМЫ____________________
  //____________________________________________________________





  const [savedMovies, setSavedMovies] = useState([]);
  const [result, setResult] = useState([]);


  useEffect(() => {
    setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')) ?
      JSON.parse(localStorage.getItem('savedMovies')) : [])
  }, [])

  useEffect(() => {
    setResult(JSON.parse(localStorage.getItem('movies')) ?
      JSON.parse(localStorage.getItem('movies')) : [])
  }, [])

  // useEffect(() => {
  //   api
  //     .getMovieCards()
  //     .then((res) => {
  //       setSavedMovies(res);
  //     })
  //     .catch((err) => console.log(err));
  // }, [loggedIn]);



  // const [resultSavedMovies, setResultSavedMovies] = useState([]);
// Поиск фильмов

  const handleGetMoviesCards = (request) => {
    setIsLoading(true);
    //поиск фильмов с сервера фильмов
    apiMovies
      .getMoviesCards()
      .then((res) => {
        setResult(moviesFilter(res, request))
        // Записываем полученные фильмы в локал сторидж
        localStorage.setItem('movies', JSON.stringify(result));

      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
    //поиск фильмов с бэка
    api
      .getMovieCards()
      .then((res) => {
        const FavoritesMovies = [];
        res.forEach((movie) => {
          FavoritesMovies.push(movie.movieId)
        })
        localStorage.setItem('FavoritesMoviesBtn', JSON.stringify(FavoritesMovies));
        setSavedMovies(moviesFilter(res, request))
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
      })
  };

console.log('_____________________App________________________')
  console.log(JSON.parse(localStorage.getItem('movies')));
  console.log(JSON.parse(localStorage.getItem('savedMovies')));
  console.log('______________________________________________________')

//Поиск сохраненных фильмов

  function handleSavedMoviesSearch() {
    setIsLoading(true);
    api.getMovieCards()
      .then((res) => {
        localStorage.setItem('savedMovies', JSON.stringify(res));
        setSavedMovies(res);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }


//сохраненные фильмы из бэка

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

  //удаление фильмов на странице всех фильмов
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

  //удаление фильмов на странице сохраненных фильмов
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
//_________________________________________________________________
//______________________ФИЛЬМЫ роут________________________________
//_________________________________________________________________
            <Movies

              //берем фильмы сервера фильмов из локал сториджа
              // cards={result}

              cards={JSON.parse(localStorage.getItem('movies')) ? JSON.parse(localStorage.getItem('movies')) : []}
              onSearch={handleGetMoviesCards}
              isLoading={isLoading}
              handleAddCard={handleAddSavedMovieCards}
              handleDeleteCard={deleteMovieCard}
            />
          }>
          </Route>

//_________________________________________________________________
//______________________СОХРАНЕННЫЕ ФИЛЬМЫ роут____________________
//_________________________________________________________________

          <Route exact path='/saved-movies' element={
            <SavedMovies
              //Берем сохраненные фильмы с сервера бэка из локал сториджа
              cards={JSON.parse(localStorage.getItem('savedMovies')) ?
                JSON.parse(localStorage.getItem('savedMovies')) : []}
              onSearch={handleSavedMoviesSearch}
              handleDeleteMovieCard={handleDeleteMovieSavedLoc}
              isLoadingSaved={isLoadingSaved}
            />
          }>
//_____________________________________________________________________________


















          </Route>
          <Route exact path='/profile' element={
            <Profile
              handleLogout={handleLogout}
              handleUpdateUserInfo={handleUpdateUserInfo}
              handleEditProfileClick={handleEditProfileClick}
              isOpenEditProfile={isOpenEditProfile}
              onClose={closeAllPopups}
              currentUser={currentUser}
            />
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
