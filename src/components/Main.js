import React from 'react';
import foto from '../images/student__foto.jpg';
import arrow from "../images/student__link-arrow.svg";
import search from "../images/film-search__search-button.svg";
import movie1 from "../images/movies__initional-movies/movies__card-image-1.png";
import movie2 from "../images/movies__initional-movies/movies__card-image-2.png";
import movie3 from "../images/movies__initional-movies/movies__card-image-3.png";
import movie4 from "../images/movies__initional-movies/movies__card-image-4.png";
import movie5 from "../images/movies__initional-movies/movies__card-image-5.png";
import movie6 from "../images/movies__initional-movies/movies__card-image-6.png";
import movie7 from "../images/movies__initional-movies/movies__card-image-7.png";
import movie8 from "../images/movies__initional-movies/movies__card-image-8.png";
import movie9 from "../images/movies__initional-movies/movies__card-image-9.png";
import logo from "../images/header__logo.svg";

function Main() {
  return (
    <main className='content'>
      <section className='intro'>
        <h2 className='intro__title'>Учебный проект студента <br/> факультета Веб-разработки.</h2>
        <nav className='intro__navigation'>
          <button className='intro__button' type='button'>О проекте</button>
          <button className='intro__button' type='button'>Технологии</button>
          <button className='intro__button' type='button'>Студент</button>
        </nav>
      </section>
      <section className='about-project'>
        <h3 className='about-project__title'>О проекте</h3>
        <div className='about-project__cards-container'>
          <div className='about-project__card'>
            <h4 className='about-project__card-title'>Дипломный проект включал 5 этапов</h4>
            <p className='about-project__card-description'>Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.</p>
          </div>
          <div className='about-project__card'>
            <h4 className='about-project__card-title'>На выполнение диплома ушло 5 недель</h4>
            <p className='about-project__card-description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
              было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className='about-project__time-container'>
            <p className='about-project__time-scale'>1 неделя</p>
            <p className='about-project__time-scale'>4 недели</p>
            <p className='about-project__time-part-name'>Back-end</p>
            <p className='about-project__time-part-name'>Front-end</p>
        </div>
      </section>
      <section className='technology'>
        <h3 className='technology__title'>Технологии</h3>
        <h4 className='technology__description-title'>7 технологий</h4>
        <p className='technology__description'>На курсе веб-разработки мы освоили технологии,
            которые применили  <br/> в дипломном проекте.</p>
        <nav className='technology__navigation'>
          <button className='technology__button' type='button'>HTML</button>
          <button className='technology__button' type='button'>CSS</button>
          <button className='technology__button' type='button'>JS</button>
          <button className='technology__button' type='button'>React</button>
          <button className='technology__button' type='button'>Git</button>
          <button className='technology__button' type='button'>Express.js</button>
          <button className='technology__button' type='button'>mongoDB</button>
        </nav>
      </section>
      <section className='student'>
        <h3 className='student__title'>Студент</h3>
        <div className='student__about-container'>
          <div className='student__description'>
            <h4 className='student__name'>Андрей</h4>
            <p className='student__about'>Фронтенд-разработчик, 35 лет</p>
            <p className='student__biography'>Я родился в Москве, закончил Московский энергетический университет (МЭИ (ТУ)).
              Работал инженером в различных компаниях в энергетике, авиации и вентиляциии зданий.
              У меня есть жена и кот. Я люблю рисовать, настольные и компьютерные игры, немного играю на гитаре,
              увлекаюсь историей и путешествиями.
              Решил поменять сферу деятельности и стать фронтенд-разработчиком.
              Для воплощения своей мечты осваиваю курс веб-разработчика от Яндекс практикум</p>
            <p className='student__github-link'>Github</p>
          </div>
          <img className='student__foto' src={foto} alt='фотография студента' />
        </div>
        <p className='student__portfolio-link'>Портфолио</p>
        <nav className='student__navigation'>
          <div className='student__link-container'>
            <p className='student__link-name'>Статичный сайт</p>
            <img className='student__link-arrow' src={arrow} alt='стрелка'/>
          </div>
          <div className='student__link-container'>
            <p className='student__link-name'>Адаптивный сайт</p>
            <img className='student__link-arrow' src={arrow} alt='стрелка'/>
          </div>
          <div className='student__link-container'>
            <p className='student__link-name'>Одностраничное приложение</p>
            <img className='student__link-arrow' src={arrow} alt='стрелка'/>
          </div>
        </nav>
      </section>
      <section className='film-search'>
        <div className='film-search__container'>
          <p className='film-search__name'>Фильм</p>
          <img className='film-search__search-button' src={search} alt='кнопка поиска'/>
        </div>
        <div className='film-search__checkbox'>
          <label className="switch">
            <input type="checkbox"/>
              <span className="slider round"></span>
          </label>
          <p className='film-search__filter-name'>Короткометражки</p>
        </div>
      </section>
      <section className='movies'>
        <ul className='movies__cards-container'>
          <li className='movies__card'>
            <div className='movies__info'>
              <div className='movies__info-container'>
                <h4 className='movies__title'>33 слова о дизайне</h4>
                <p className='movies__time'>1ч 47м</p>
              </div>
              <button className='movies__delete-favorites-btn' type='button'>
              </button>
            </div>
            <img className='movies__card-image' src={movie1} alt='33 слова о дизайне'/>
          </li>
          <li className='movies__card'>
            <div className='movies__info'>
              <div className='movies__info-container'>
                <h4 className='movies__title'>33 слова о дизайне</h4>
                <p className='movies__time'>1ч 47м</p>
              </div>
              <button className='movies__add-favorites-btn' type='button'>
              </button>
            </div>
            <img className='movies__card-image' src={movie2} alt='33 слова о дизайне'/>
          </li>
          <li className='movies__card'>
            <div className='movies__info'>
              <div className='movies__info-container'>
                <h4 className='movies__title'>33 слова о дизайне</h4>
                <p className='movies__time'>1ч 47м</p>
              </div>
              <button className='movies__add-favorites-btn' type='button'>
              </button>
            </div>
            <img className='movies__card-image' src={movie3} alt='33 слова о дизайне'/>
          </li>
          <li className='movies__card'>
            <div className='movies__info'>
              <div className='movies__info-container'>
                <h4 className='movies__title'>33 слова о дизайне</h4>
                <p className='movies__time'>1ч 47м</p>
              </div>
              <button className='movies__add-favorites-btn' type='button'>
              </button>
            </div>
            <img className='movies__card-image' src={movie4} alt='33 слова о дизайне'/>
          </li>
          <li className='movies__card'>
            <div className='movies__info'>
              <div className='movies__info-container'>
                <h4 className='movies__title'>33 слова о дизайне</h4>
                <p className='movies__time'>1ч 47м</p>
              </div>
              <button className='movies__add-favorites-btn' type='button'>
              </button>
            </div>
            <img className='movies__card-image' src={movie5} alt='33 слова о дизайне'/>
          </li>
          <li className='movies__card'>
            <div className='movies__info'>
              <div className='movies__info-container'>
                <h4 className='movies__title'>33 слова о дизайне</h4>
                <p className='movies__time'>1ч 47м</p>
              </div>
              <button className='movies__add-favorites-btn' type='button'>
              </button>
            </div>
            <img className='movies__card-image' src={movie6} alt='33 слова о дизайне'/>
          </li>
          <li className='movies__card'>
            <div className='movies__info'>
              <div className='movies__info-container'>
                <h4 className='movies__title'>33 слова о дизайне</h4>
                <p className='movies__time'>1ч 47м</p>
              </div>
              <button className='movies__add-favorites-btn' type='button'>
              </button>
            </div>
            <img className='movies__card-image' src={movie7} alt='33 слова о дизайне'/>
          </li>
          <li className='movies__card'>
            <div className='movies__info'>
              <div className='movies__info-container'>
                <h4 className='movies__title'>33 слова о дизайне</h4>
                <p className='movies__time'>1ч 47м</p>
              </div>
              <button className='movies__add-favorites-btn' type='button'>
              </button>
            </div>
            <img className='movies__card-image' src={movie8} alt='33 слова о дизайне'/>
          </li>
          <li className='movies__card'>
            <div className='movies__info'>
              <div className='movies__info-container'>
                <h4 className='movies__title'>33 слова о дизайне</h4>
                <p className='movies__time'>1ч 47м</p>
              </div>
              <button className='movies__add-favorites-btn' type='button'>
              </button>
            </div>
            <img className='movies__card-image' src={movie9} alt='33 слова о дизайне'/>
          </li>
          <li className='movies__card'>
            <div className='movies__info'>
              <div className='movies__info-container'>
                <h4 className='movies__title'>33 слова о дизайне</h4>
                <p className='movies__time'>1ч 47м</p>
              </div>
              <button className='movies__add-favorites-btn' type='button'>
              </button>
            </div>
            <img className='movies__card-image' src={movie7} alt='33 слова о дизайне'/>
          </li>
          <li className='movies__card'>
            <div className='movies__info'>
              <div className='movies__info-container'>
                <h4 className='movies__title'>33 слова о дизайне</h4>
                <p className='movies__time'>1ч 47м</p>
              </div>
              <button className='movies__add-favorites-btn movies__add-favorites-btn_active' type='button'>
              </button>
            </div>
            <img className='movies__card-image' src={movie8} alt='33 слова о дизайне'/>
          </li>
          <li className='movies__card'>
            <div className='movies__info'>
              <div className='movies__info-container'>
                <h4 className='movies__title'>33 слова о дизайне</h4>
                <p className='movies__time'>1ч 47м</p>
              </div>
              <button className='movies__add-favorites-btn movies__add-favorites-btn_active' type='button'>
              </button>
            </div>
            <img className='movies__card-image' src={movie9} alt='33 слова о дизайне'/>
          </li>
        </ul>
      </section>
      <section className='scroll-movies'>
        <button className='scroll-movies__button' type='button'>
          Ещё
        </button>
      </section>
      <section className='user-info'>
        <h3 className='user-info__title'>Привет, Андрей!</h3>
        <div className='user-info__container'>
          <p className='user-info__text'>Имя</p>
          <p className='user-info__text'>Андрей</p>
        </div>
        <div className='user-info__container'>
          <p className='user-info__text'>E-mail</p>
          <p className='user-info__text'>pochta@yandex.ru</p>
        </div>
        <p className='user-info__link'>Редактировать</p>
        <p className='user-info__link user-info__link_changed-color'>Выйти из аккаунта</p>
      </section>
      <section className='not-find-page'>
        <h3 className='not-find-page__title'>404</h3>
        <p className='not-find-page__text'>Страница не найдена</p>
        <p className='not-find-page__link'>Назад</p>
      </section>
      <section className='header-auth'>
        <img className='header-auth__logo' src={logo} alt='логотип movies-explorer' />
        <p className='header-auth__text'>Добро пожаловать!</p>
      </section>
      <section className='auth-form'>
        <ul className='auth-form__container'>
          <li className='auth-form__part-form'>
            <p className='auth-form__name'>Имя</p>
            <p className='auth-form__input'>Виталий</p>
          </li>
          <p className='auth-form__validation-text'>что-то пошло не так...</p>
          <li className='auth-form__part-form'>
            <p className='auth-form__name'>E-mail</p>
            <p className='auth-form__input'>bolopop@yandex.ru</p>
          </li>
          <p className='auth-form__validation-text'>что-то пошло не так...</p>
          <li className='auth-form__part-form'>
            <p className='auth-form__name'>Пароль</p>
            <p className='auth-form__input'>Виталий</p>
          </li>
          <p className='auth-form__validation-text'>что-то пошло не так...</p>
        </ul>
      </section>
      <section className='auth-confirm'>
        <button className='auth-confirm__button' type='button'>Зарегистрироваться</button>
        <div className='auth-confirm__container'>
          <p className='auth-confirm__text'>Уже зарегистрированы?</p>
          <p className='auth-confirm__link'>Войти</p>
        </div>

      </section>
    </main>
  );
}

export default Main;
