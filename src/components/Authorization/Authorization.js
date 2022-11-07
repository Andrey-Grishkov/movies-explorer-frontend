import React from "react";
import "./Authorization.css";
import Logo from "../Logo/Logo";

function Authorization(props) {
  return (
    <section className='authorization'>
      <div className='authorization__header'>
        <div className='authorization__header-container'>
          <div className='authorization__logo-container'>
            <Logo />
          </div>
          <p className='authorization__text'>{props.title}</p>
        </div>
      </div>
      <form>
      <ul className='authorization__container'>
        {props.authType === 'register' && (
        <li className='authorization__part-form'>
          <p className='authorization__name'>Имя</p>
          <input className='authorization__input' placeholder='Имя'/>
        </li>)}
        {props.authType === 'register' && (<p className='authorization__validation-text'>что-то пошло не так...</p>
          )}
        <li className='authorization__part-form'>
          <p className='authorization__name'>E-mail</p>
          <input className='authorization__input' placeholder='E-mail'/>
        </li>
        <p className='authorization__validation-text'>что-то пошло не так...</p>
        <li className='authorization__part-form'>
          <p className='authorization__name'>Пароль</p>
          <input className='authorization__input' placeholder='Пароль' type='password'/>
        </li>
        <p className='authorization__validation-text'>что-то пошло не так...</p>
      </ul>
      </form>
      <div className='authorization__confirm'>
        <button className={`${props.authType === 'register' ? 'authorization__confirm-button' : 'authorization__confirm-button authorization__confirm-button-login'}`} type='submit'>{props.button}</button>
        <div className='authorization__confirm-container'>
          <p className='authorization__confirm-text'>{props.text}</p>
          <a className='authorization__confirm-link' href={props.linkRout}>{props.link}</a>
        </div>
      </div>
    </section>
  );
}
// {`${props.authType === 'register' ? 'authorization__confirm-button' : 'authorization__confirm-button authorization__confirm-button-login'}`
// className={`${isErr ? "authorizatio__input authorizatio__input_active" : "authorizatio__input"}`

export default Authorization;
