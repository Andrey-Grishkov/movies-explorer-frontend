import React from "react";
import "./Authorization.css";
import Logo from "../Logo/Logo";

function Authorization(props) {
  return (
    <section className='register'>
      <div className='register__header'>
        <div className='register__header-container'>
          <div className='register__logo-container'>
            <Logo />
          </div>
          <p className='register__text'>{props.title}</p>
        </div>
      </div>
      <form>
      <ul className='register__container'>
        {props.authType === 'register' && (
        <li className='register__part-form'>
          <p className='register__name'>Имя</p>
          <input className='register__input' placeholder='Имя'/>
        </li>)}
        {props.authType === 'register' && (<p className='register__validation-text'>что-то пошло не так...</p>
          )}
        <li className='register__part-form'>
          <p className='register__name'>E-mail</p>
          <input className='register__input' placeholder='E-mail'/>
        </li>
        <p className='register__validation-text'>что-то пошло не так...</p>
        <li className='register__part-form'>
          <p className='register__name'>Пароль</p>
          <input className='register__input' placeholder='Пароль' type='password'/>
        </li>
        <p className='register__validation-text'>что-то пошло не так...</p>
      </ul>
      </form>



      <div className='register__confirm'>
        <button className='register__confirm-button' type='submit'>{props.button}</button>
        <div className='register__confirm-container'>
          <p className='register__confirm-text'>{props.text}</p>
          <a className='register__confirm-link' href={props.linkRout}>{props.link}</a>
        </div>
      </div>
    </section>
  );
}

export default Authorization;
