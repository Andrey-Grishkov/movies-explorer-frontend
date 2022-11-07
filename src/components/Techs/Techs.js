import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section className='technology'>
      <a name='techs'></a>
      <h3 className='technology__title'>Технологии</h3>
      <h4 className='technology__description-title'>7 технологий</h4>
      <p className='technology__description'>На курсе веб-разработки мы освоили технологии,
        которые применили  <br/> в дипломном проекте.</p>
      <nav className='technology__navigation'>
        <a className='technology__link' href='https://ru.wikipedia.org/wiki/HTML'>
          <button className='technology__button' type='button'>HTML</button>
        </a>
        <a className='technology__link' href='https://ru.wikipedia.org/wiki/CSS'>
          <button className='technology__button' type='button'>CSS</button>
        </a>
        <a className='technology__link' href='https://www.javascript.com/'>
          <button className='technology__button' type='button'>JS</button>
        </a>
        <a className='technology__link' href='https://reactjs.org/'>
          <button className='technology__button' type='button'>React</button>
        </a>
        <a className='technology__link' href='https://git-scm.com/'>
          <button className='technology__button' type='button'>Git</button>
        </a>
        <a className='technology__link' href='https://expressjs.com/ru/'>
          <button className='technology__button' type='button'>Express.js</button>
        </a>
        <a className='technology__link' href='https://www.mongodb.com/'>
          <button className='technology__button' type='button'>mongoDB</button>
        </a>
      </nav>
    </section>
  );
}

export default Techs;
