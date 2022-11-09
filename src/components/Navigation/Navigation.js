import React from 'react';
import './Navigation.css'
import NavProfileBtn from "../NavProfileBtn/NavProfileBtn";
import close from "../../images/navigation__close.svg";

function Navigation(props) {
  return (
    <div className={props.isOpen ? `navigation navigation_is-opened` : `navigation`}>
      <div className='navigation__content'>
        <button className='navigation__close' type='button' onClick={props.onClick}>
          <img className='navigation__close-img' src={close} alt='закрыть'/>
        </button>
        <ul className='navigation__links'>
          <li className="navigation__link-container">
            <a className="navigation__link" href="/">Главная</a>
          </li>
          <li className="navigation__link-container">
            <a className="navigation__link" href='/movies'>Фильмы</a>
          </li>
          <li className="navigation__link-container">
            <a className="navigation__link" href='/saved-movies'>Сохраненные фильмы</a>
          </li>
        </ul>
        <div className='navigation__button-container'>
          <NavProfileBtn onClick={props.onClick}/>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
