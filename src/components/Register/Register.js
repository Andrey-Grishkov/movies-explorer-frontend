import React from "react";
import Authorization from "../Authorization/Authorization";

function Register({ onRegister }) {

  const [email, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const data = {email, password};
    console.log(data);
    onRegister(data);
  }

  return (
    <Authorization
      authType='register'
      title='Добро пожаловать!'
      button='Зарегистрироваться'
      text='Уже зарегистрированы?'
      link='Войти'
      linkRout='/signup'
      onSubmit={handleSubmit}
      onChangeEmail={(e) => setUserEmail(e.target.value)}
      onChangePassword={(e) => setPassword(e.target.value)}
      valueEmail={email}
      valuePassword={password}
    />
  );
}

export default Register;
