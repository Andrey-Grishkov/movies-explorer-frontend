import logo from '../images/header__logo.svg';
import React from 'react';

function Header() {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='логотип movies-explorer' />
      <div className='header__route-content'>
        <p className='header__link'></p>
        <button className='header__menu-button' type='button'></button>
      </div>
    </header>
  );
}

export default Header;
