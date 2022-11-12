import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
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
import api from '../../utils/MainApi';

function App() {

  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [moviescards, setMoviesCards] = useState(
    JSON.parse(localStorage.getItem("movies")) || []
  );
  const [infoTooltip, setInfoTooltip] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();
  const [regIn, setRegIn] = useState(false);

  const handleCheckToken = () => {
    auth
      .checkToken()
      .then((res) => {
        if (res.ok) {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleCheckToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn){
      api
        .getUserInfo()
        .then((res) => setCurrentUser(res.message))
        .catch((err) => console.log(`Ошибка: ${err}`));
    }}, [loggedIn]);

  const onRegister = (data) => {
    auth
      .register(data)
      .then((res) => {
        if (res) {
          setInfoTooltip(true);
          setRegIn(true);
          history.push('/signin');
        }
      })
      .catch((err) => {
        setInfoTooltip(true);
        setRegIn(false);
        console.log(`Ошибка: ${err}`);
      });
  };

  const onLogin = (userEmail, password) => {
    auth
      .authorize(userEmail, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserEmail(userEmail);
          history.push('/');
        }
      })
      .catch((err) => {
        setInfoTooltip(true);
        console.log(`Ошибка: ${err}`);
      });
  };

  function handleLogExit() {
    setLoggedIn(false);
    history.push('/signin');
  }




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

  const handleGetMoviesCards = (request, isSmall, setResult) => {
    setIsLoading(true);
    apiMovies
      .getMoviesCards()
      .then((res) => {
        if (res) {
          setMoviesCards(res);
          setResult(moviesFilter(moviescards, request, isSmall));
        }
      })
      .catch((err) => console.log(`Ошибка: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const closeAllPopups = () => {
    setInfoTooltip(false);
  };






  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route exact path="/">
            <Header auth={false}/>
            <Main />
            <Footer />
          </Route>
          <Route exact path="/movies">
            <Header auth={true}/>
            <Movies
              onSearch={handleGetMoviesCards}
              isLoading={isLoading}
              cards={moviescards}
            />
            <Footer />
          </Route>
          <Route exact path="/saved-movies">
            <Header auth={true}/>
            <SavedMovies cards = {initialMoviesCards}/>
            <Footer />
          </Route>
          <Route exact path="/profile">
            <Header auth={true}/>
            <Profile />
          </Route>
          <Route exact path="/signin">
            <Login onLogin={onLogin}/>
          </Route>
          <Route exact path="/signup">
            <Register onRegister={onRegister}/>
          </Route>
          <Route path="*">
            <NotFindPage />
          </Route>
          </Switch>
        <InfoTooltip
          infoTooltip={infoTooltip}
          regIn={regIn}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
