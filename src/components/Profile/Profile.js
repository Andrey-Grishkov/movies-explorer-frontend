import React from "react";
import "./Profile.css";
import {NavLink} from "react-router-dom";
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup'

function Profile(props) {
  const [name, setName] =  React.useState('');
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    if (props.currentUser !== null) {
      setName(props.currentUser.name);
      setEmail(props.currentUser.email);
    }
  }, [props.currentUser, props.isOpenEditProfile]);

  function handleSubmit(e) {
    e.preventDefault();
    props.handleUpdateUserInfo(
      email,
      name,
    );
  }

  return (
    <section className='profile'>
      <h3 className='profile__title'>Привет, {name}</h3>
      <div className='profile__container'>
        <p className='profile__text'>Имя</p>
        <p className='profile__text'>{name}</p>
      </div>
      <div className='profile__container'>
        <p className='profile__text'>E-mail</p>
        <p className='profile__text'>{email}</p>
      </div>
      <button className='profile__link' onClick={props.handleEditProfileClick}>Редактировать</button>
      <NavLink className='profile__link profile__link_changed-color' to='/signin' onClick={props.handleLogout}>Выйти из аккаунта</NavLink>
      <EditProfilePopup
        handleEditProfileClick={props.handleEditProfileClick}
        isOpenEditProfile={props.isOpenEditProfile}
        onClose={props.onClose}
        email={email}
        name={name}
        handleSubmit={handleSubmit}
        setName={setName}
        setEmail={setEmail}
        valueName={name}
        valueEmail={email}
      />
    </section>
  );
}

export default Profile;
