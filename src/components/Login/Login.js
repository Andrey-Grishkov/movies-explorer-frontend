import React from 'react';
import Authorization from '../Authorization/Authorization';

function Login({onLogin}) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const data = {email, password};
    onLogin(data);
  }

  return (
    <Authorization
      authType='login'
      title='Рады видеть!'
      button='Войти'
      text='Ещё не зарегистрированы?'
      link='Регистрация'
      linkRout='/signup'
      onSubmit={handleSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
      valueEmail={email}
      valuePassword={password}
    />
  );
}

export default Login;
