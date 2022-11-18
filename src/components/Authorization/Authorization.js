import React from "react";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./Authorization.css";
import Logo from "../Logo/Logo";
import AuthorizationBtn from "../AuthorizationBtn/AuthorizationBtn";

const errors = {
  required: "Обязательно для заполнения",
  name: "Имя содержит недопустимые символы",
  email: "Некорректный email",
  minLength: "Введите не менее 2 символов",
  maxLength: "Введите не более 30 символов",
}

function Authorization(props) {
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [disabledBtnName, setDisabledBtnName] = useState(true);
  const [disabledBtnEmail, setDisabledBtnEmail] = useState(true);
  const [disabledBtnPassword, setDisabledBtnPassword] = useState(true);

  function handleErrorEmail(e) {
    const inputEmail = e.target;
    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
      inputEmail.value
    );
    if (inputEmail.value.length < 1) {
      setErrorEmail(errors.required);
      setDisabledBtnEmail(true);
    } else if (!validEmail) {
      setErrorEmail(errors.email);
      setDisabledBtnEmail(true);
    } else {
      setErrorEmail('');
      setDisabledBtnEmail(false);
    }
    props.setEmail(inputEmail.value);
  }

  function handleErrorName(e) {
    const inputName = e.target;
    const validName = /^[a-zA-Zа-яА-Я- ]+$/.test(inputName.value);

    if (inputName.value.length < 1) {
      setErrorName(errors.required);
      setDisabledBtnName(true);
    } else if (inputName.value.length < 2) {
      setErrorName(errors.minLength);
      setDisabledBtnName(true);
    } else if (inputName.value.length > 30) {
      setErrorName(errors.maxLength);
      setDisabledBtnName(true);
    } else if (!validName) {
      setErrorName(errors.name);
      setDisabledBtnName(true);
    } else {
      setErrorName('');
      setDisabledBtnName(false);
    }
    props.setName(inputName.value);
  }

  function handleErrorPassword(e) {
    const inputPassword = e.target;
    if (inputPassword.value.length < 1) {
      setErrorPassword(errors.required);
      setDisabledBtnPassword(true);
    } else {
      setErrorPassword('');
      setDisabledBtnPassword(false);
    }
    props.setPassword(inputPassword.value);
  }

  const disabledBtnReg = disabledBtnName || disabledBtnEmail || disabledBtnPassword;
  const disabledBtnLog = disabledBtnEmail || disabledBtnPassword;
  const disabledBtn = props.authType === 'register' ? disabledBtnReg : disabledBtnLog;

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
      <form onSubmit={props.onSubmit} noValidate>
      <ul className='authorization__container'>
        {props.authType === 'register' && (
        <li className='authorization__part-form'>
          <p className='authorization__name'>Имя</p>
          <input
            className='authorization__input'
            placeholder='Имя'
            type="text"
            id="name"
            name="name"
            minLength="2"
            maxLength="30"
            value={props.valueName}
            onChange={handleErrorName}
            required
          />
        </li>)}
        {props.authType === 'register' && (<p className='authorization__validation-text'>{errorName}</p>)}
        <li className='authorization__part-form'>
          <p className='authorization__name'>E-mail</p>
          <input
            className='authorization__input'
            placeholder='E-mail'
            type="email"
            id="email"
            name="email"
            minLength="2"
            maxLength="30"
            value={props.email}
            required
            onChange={handleErrorEmail}
          />
        </li>
        <span className='authorization__validation-text'>{errorEmail}</span>
        <li className='authorization__part-form'>
          <p className='authorization__name'>Пароль</p>
          <input
            className='authorization__input'
            placeholder='Пароль'
            type='password'
            id="password"
            name="password"
            minLength="2"
            maxLength="30"
            value={props.password}
            onChange={handleErrorPassword}
            required
          />
        </li>
        <span className='authorization__validation-text'>{errorPassword}</span>
      </ul>
        <div className='authorization__confirm'>
          < AuthorizationBtn
            disabled={disabledBtn === true ? 'authorization__confirm-button_disabled' : ''}
            authType={props.authType === 'register' ? 'authorization__confirm-button' :
                'authorization__confirm-button authorization__confirm-button-login'}
            button={props.button}
          />
          <div className='authorization__confirm-container'>
            <p className='authorization__confirm-text'>{props.text}</p>
            <NavLink className='authorization__confirm-link' to={props.linkRout}>{props.link}</NavLink>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Authorization;
