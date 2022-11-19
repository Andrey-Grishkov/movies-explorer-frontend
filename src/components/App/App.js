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
import { initialMoviesCards } from '../../utils/initialMoviesCards'
import Login from '../Login/Login';
import apiMovies from '../../utils/MoviesApi';
import moviesFilter from '../../utils/moviesFilter';
import InfoTooltip from '../InfoTooltip/InfoTooltip'
import * as auth from "../../utils/auth";
// import auth from "../../utils/auth";
import api from '../../utils/MainApi';
import MoviesFilter from "../../utils/moviesFilter"

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [moviesCards, setMoviesCards] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setUserEmail] = useState('');
  const [userName, setName] = useState('');
  const history = useNavigate();
  const [regIn, setRegIn] = useState(false);
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);



  // const handleCheckToken = () => {
  //   auth
  //     .checkToken()
  //     .then((res) => {
  //       console.log(res);
  //       if (res.ok) {
  //         setLoggedIn(true);
  //         setUserEmail(res.data.email);
  //         setName(res.data.name);
  //         history('/movies');
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  //
  // useEffect(() => {
  //   handleCheckToken();
  // }, []);

  // useEffect(() => {
  //   if (loggedIn) {
  //     history("/");
  //   }
  // }, [loggedIn]);



  const onRegister = (data) => {
    const {email, name, password} = data;
    auth.
      register({email, name, password})
      .then((res) => {
        console.log(res);
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

  // useEffect(() => {
  //   Promise.all([api.getUserInfo()])
  //     .then(([user]) => {
  //       setLoggedIn(true);
  //       setCurrentUser({ name: user.name, email: user.email });
  //     })
  //     .catch((err) => {
  //       setLoggedIn(false)
  //       console.log(err);
  //     })
  // }, [])


  console.log(currentUser);

  function handleLogout() {
    auth.logout()
      .then(() => {
        setInfoTooltipStatus (true);
        setInfoTooltipMessage('Вы вышли из аккаунта!')
        setInfoTooltip(true);
        setCurrentUser({});
        setLoggedIn(false);
        localStorage.clear();
      })
      .catch((err) => {
        setInfoTooltipStatus (false);
        setInfoTooltipMessage('Что-то пошло не так! Попробуйте ещё раз.')
        setInfoTooltip(true);
        console.log(`Ошибка: ${err}`);
      });
  }



  // useEffect(() => {
  //   if (loggedIn){
  //     api
  //       .getUserInfo()
  //       .then((res) => setCurrentUser(res.message))
  //       .catch((err) => console.log(`Ошибка: ${err}`));
  //   }}, [loggedIn]);


  // const [moviescards, setMoviesCards] = useState([]);

  // useEffect(() => {
  //     apiMovies
  //         .getMoviesCards()
  //         .then((res) => {
  //           setMoviesCards(res);
  //           setIsLoading(true);
  //         })
  //         .catch((err) => console.log(`Ошибка: ${err}`))
  //         .finally(() => {
  //           setIsLoading(false);
  //         });
  //     }
  //     , []);

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

  const handleGetMoviesCards = (request, setResult) => {
    setIsLoading(true);
    apiMovies
      .getMoviesCards()
      .then((res) => {
        if (res) {
          setMoviesCards(res);
          setResult(MoviesFilter(res, request));
        }
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditProfileClick = () => {
    setIsOpenEditProfile(true);
  };

  const closeAllPopups = () => {
    setInfoTooltip(false);
    setIsOpenEditProfile(false);
  };

    const handleUpdateUserInfo = (email, name) => {
      console.log(email, name);
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
            <Movies
              onSearch={handleGetMoviesCards}
              isLoading={isLoading}
              cards={moviesCards}
            />
          }>
          </Route>
          <Route exact path='/saved-movies' element={
            <SavedMovies cards = {initialMoviesCards}/>
          }>
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
