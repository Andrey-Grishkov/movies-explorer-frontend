import React from "react";
import Authorization from "../Authorization/Authorization";

function Register({ onRegister }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const data = {email, name, password};
    onRegister(data);
  }

  return (
    <Authorization
      authType='register'
      title='Добро пожаловать!'
      button='Зарегистрироваться'
      text='Уже зарегистрированы?'
      link='Войти'
      linkRout='/signin'
      onSubmit={handleSubmit}
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      valueName={name}
      valueEmail={email}
      valuePassword={password}
    />
  );
}

export default Register;
