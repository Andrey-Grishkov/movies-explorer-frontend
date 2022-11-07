import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies'
import NotFindPage from '../NotFindPage/NotFindPage'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import { initialMoviesCards } from '../../utils/initialMoviesCards'
import Login from "../Login/Login";


function App() {

  const [currentUser, setCurrentUser] = React.useState(null);

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
            <Movies cards = {initialMoviesCards}/>
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
            <Login />
          </Route>
          <Route exact path="/signup">
            <Register />
          </Route>
          <Route path="*">
            <NotFindPage />
          </Route>
          </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
