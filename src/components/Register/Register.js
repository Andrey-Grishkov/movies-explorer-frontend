import React from "react";
import Authorization from "../Authorization/Authorization";

function Register() {
  return (
    <Authorization
      authType='register'
      title='Добро пожаловать!'
      button='Зарегистрироваться'
      text='Уже зарегистрированы?'
      link='Войти'
      linkRout='/signin'
    />
  );
}

export default Register;
