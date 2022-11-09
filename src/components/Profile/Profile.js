import React from "react";
import "./Profile.css";

function Profile() {
  return (
    <section className='profile'>
      <h3 className='profile__title'>Привет, Андрей!</h3>
      <div className='profile__container'>
        <p className='profile__text'>Имя</p>
        <p className='profile__text'>Андрей</p>
      </div>
      <div className='profile__container'>
        <p className='profile__text'>E-mail</p>
        <p className='profile__text'>pochta@yandex.ru</p>
      </div>
      <a className='profile__link' href='/signup'>Редактировать</a>
      <a className='profile__link profile__link_changed-color' href='/signin'>Выйти из аккаунта</a>
    </section>
  );
}

export default Profile;
