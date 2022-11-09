import React from 'react';
import Authorization from '../Authorization/Authorization';

function Login() {
  return (
    <Authorization
      authType='login'
      title='Рады видеть!'
      button='Войти'
      text='Ещё не зарегистрированы?'
      link='Регистрация'
      linkRout='/signup'
    />
  );
}

export default Login;
