import React from 'react';
import Authorization from '../Authorization/Authorization';

function Login({onLogin}) {

  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(userEmail, password);
  }

  return (
    <Authorization
      authType='login'
      title='Рады видеть!'
      button='Войти'
      text='Ещё не зарегистрированы?'
      link='Регистрация'
      linkRout='/signin'
      onSubmit={handleSubmit}
      onChangeEmail={(e) => setUserEmail(e.target.value)}
      onChangePassword={(e) => setPassword(e.target.value)}
      valueEmail={userEmail}
      valuePassword={password}
    />
  );
}

export default Login;
