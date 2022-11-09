import React from "react";
import { useState } from 'react';
import "./MoviesCard.css";
const beatFilmMovies = 'https://api.nomoreparties.co/'

const MoviesCard = ({card, flag}) => {
  const [saveMovie, setSaveMovie] = useState(false);

  const handleSaveMovie = () => {
    if (!saveMovie && flag === 'add-favorites-btn') {
      return setSaveMovie(true);
    }
    return setSaveMovie(false);
  };

  const handleClick = () => {
    window.open(card.trailerLink);
  };

  const imageLink = beatFilmMovies + card.image.url;
  const durationHours = parseInt((card.duration/60));
  const durationMin = card.duration%60;

  return (
      <li className='movies-card__card'>
        <div className='movies-card__info'>
          <div className='movies-card__info-container'>
            <h4 className='movies-card__title'>{card.nameRU}</h4>
            <p className='movies-card__time'>{durationHours}ч {durationMin}м</p>
          </div>
          <button className={`movies-card__${flag} movies-card__${flag}_${saveMovie ? 'active' : ''}`}
                  onClick={handleSaveMovie}
                  type='button'>
          </button>
        </div>
        <img className='movies-card__image' src={imageLink} alt={card.nameRU} onClick={handleClick}/>
      </li>
  );
}

export default MoviesCard;
