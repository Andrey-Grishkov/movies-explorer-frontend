import React from 'react';
import './NavProfileBtn.css'
import profile from "../../images/header__profile-img.svg";

function NavProfileBtn() {
  return (
      <a className='nav-profile-btn' href='/profile'>
        <p className='nav-profile-btn__text'>Аккаунт</p>
        <div className='nav-profile-btn__img-container'>
          <img className='nav-profile-btn__img' src={profile}/>
        </div>
      </a>
  );
}

export default NavProfileBtn;
