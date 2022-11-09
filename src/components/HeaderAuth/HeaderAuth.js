import React from 'react';
import './HeaderAuth.css'

function HeaderAuth() {
  return (
      <div className='header-auth'>
        <a className='header-auth__link' href='/signup'> Регистрация </a>
        <a href='/signin'>
          <button
            className='header-auth__entry-button'
            type='button'
          >Войти</button>
        </a>
      </div>
  );
}

export default HeaderAuth;
