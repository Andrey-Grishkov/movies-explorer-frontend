import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import HeaderAuth from './HeaderAuth'
import HeaderBurger from './HeaderBurger'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [currentUser, setCurrentUser] = React.useState(null);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page__content'>
        <Header />
        <HeaderBurger />
        <HeaderAuth />
        <Main/>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
