import React from "react";
import "./AboutMe.css";
import foto from '../../images/about-me__foto.jpg';
import arrow from "../../images/about-me__link-arrow.svg";

function AboutMe() {
  return (
    <section className='about-me'>
      <a name='about-me'></a>
      <h3 className='about-me__title'>Студент</h3>
      <div className='about-me__container'>
        <div className='about-me__description'>
          <h4 className='about-me__name'>Андрей</h4>
          <p className='about-me__about'>Фронтенд-разработчик, 35 лет</p>
          <p className='about-me__biography'>Я родился в Москве, закончил Московский энергетический университет (МЭИ (ТУ)).
            Работал инженером в различных компаниях в энергетике, авиации и вентиляциии зданий.
            У меня есть жена и кот. Я люблю рисовать, настольные и компьютерные игры, немного играю на гитаре,
            увлекаюсь историей и путешествиями.
            Решил поменять сферу деятельности и стать фронтенд-разработчиком.
            Для воплощения своей мечты осваиваю курс веб-разработчика от Яндекс практикум</p>
          <p className='about-me__github-link-container'>
            <a className='about-me__github-link' href='https://github.com/Andrey-Grishkov' target="_blank">
              Github
            </a>
          </p>
        </div>
        <img className='about-me__foto' src={foto} alt='фотография студента' />
      </div>
      <p className='about-me__portfolio-link'>Портфолио</p>
      <ul className='about-me__navigation'>
        <li>
          <a className='about-me__link-container' href='https://andrey-grishkov.github.io/how-to-learn/' target="_blank">
            <p className='about-me__link-name'>Статичный сайт</p>
            <img className='about-me__link-arrow' src={arrow} alt='стрелка'/>
          </a>
        </li>
        <li>
          <a className='about-me__link-container' href='https://andrey-grishkov.github.io/russian-travel/' target="_blank">
            <p className='about-me__link-name'>Адаптивный сайт</p>
            <img className='about-me__link-arrow' src={arrow} alt='стрелка'/>
          </a>
        </li>
        <li>
          <a className='about-me__link-container' href='https://mesto.front.grishkov.nomoredomains.icu' target="_blank">
            <p className='about-me__link-name'>Одностраничное приложение</p>
            <img className='about-me__link-arrow' src={arrow} alt='стрелка'/>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default AboutMe;
