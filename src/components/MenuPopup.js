import React from 'react';
import profile from '../images/header__profile-img.svg';
import close from "../images/menu-popup__close.svg";

function MenuPopup() {
  return (
    <div className='menu-popup'>
      <div className='menu-popup__content'>
        <button className='menu-popup__close' type="button">
          <img className='menu-popup__close-img' src={close}/>
        </button>
            <p className='menu-popup__link'>Главная</p>
            <p className='menu-popup__link'>Фильмы</p>
            <p className='menu-popup__link'>Сохраненные фильмы</p>
          <button className='menu-popup__button header__profile-button' type='button'>
            <p className='header__profile-text'>Аккаунт</p>
            <div className='header__profile-img-container'>
              <img className='header__profile-img' src={profile}/>
            </div>
          </button>
      </div>
    </div>
  );
}

export default MenuPopup;
