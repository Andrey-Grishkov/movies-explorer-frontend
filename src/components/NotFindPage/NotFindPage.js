import React from 'react';
import './NotFindPage.css'

function NotFindPage() {
  return (
    <section className='not-find-page'>
      <h3 className='not-find-page__title'>404</h3>
      <p className='not-find-page__text'>Страница не найдена</p>
      <a className='not-find-page__link' href='/signin'>Назад</a>
    </section>
  );
}

export default NotFindPage;
