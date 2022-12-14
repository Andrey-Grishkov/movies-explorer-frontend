import React from 'react';
import './Header.css'
import Logo from "../Logo/Logo";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import HeaderNav from "../HeaderNav/HeaderNav";
import Navigation from '../Navigation/Navigation';

const Header = ({auth}) => {

  const [isOpen, setIsOpen] = React.useState(false);

  function handleClickOpen () {
    setIsOpen(true)
  }

  function handleClickClose () {
    setIsOpen(false)
  }

  return (
    <header className='header'>
      <div className='header__logo-container'>
        <Logo />
      </div>
      {auth ? <HeaderNav onClick={handleClickOpen}/> : <HeaderAuth />}
      <Navigation isOpen={isOpen} onClick={handleClickClose} />
    </header>
  );
}

export default Header;
