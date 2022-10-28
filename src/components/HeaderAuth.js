import logo from '../images/header__logo.svg';
import profile from '../images/header__profile-img.svg';
import React from 'react';

function Header() {
  return (
    <header className='header'>
      <img className='header__logo' src={logo} alt='логотип movies-explorer' />
      <div className='header__route-content'>
        <p className='header__nav-link'>Фильмы</p>
        <p className='header__nav-link'>Сохраненные фильмы</p>
        <button className='header__profile-button' type='button'>
          <p className='header__profile-text'>Аккаунт</p>
          <div className='header__profile-img-container'>
            <img className='header__profile-img' src={profile}/>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;
