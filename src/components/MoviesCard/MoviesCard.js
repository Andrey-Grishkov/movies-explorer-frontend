import React from "react";
import { useState } from 'react';
import "./MoviesCard.css";

const MoviesCard = ({card, flag}) => {
  const [saveMovie, setSaveMovie] = useState(false);

  const handleSaveMovie = () => {
    if (!saveMovie && flag === 'add-favorites-btn') {
      return setSaveMovie(true);
    }
    return setSaveMovie(false);
  };

  return (
      <li className='movies-card__card'>
        <div className='movies-card__info'>
          <div className='movies-card__info-container'>
            <h4 className='movies-card__title'>{card.nameRU}</h4>
            <p className='movies-card__time'>{card.duration}</p>
          </div>
          <button className={`movies-card__${flag} movies-card__${flag}_${saveMovie ? 'active' : ''}`}
                  onClick={handleSaveMovie}
                  type='button'>
          </button>
        </div>
        <img className='movies-card__image' src={card.image} alt={card.nameRU}/>
      </li>
  );
}

// className={`movies-card__mark movies-card__mark_${mark} movies-card__mark_${
//   saveMovies ? 'active' : ''
// }`}
// onClick={handleSaveMovie}



export default MoviesCard;
