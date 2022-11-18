import React from 'react';
import './AuthorizationBtn.css'

const AuthorizationBtn = (props) => {

  return (
    <button className={`${props.authType} ${props.disabled}`}
            type='submit' disabled={props.disabled}
    >{props.button}</button>
  );
}

export default AuthorizationBtn;
