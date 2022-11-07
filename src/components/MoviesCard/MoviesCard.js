import React from "react";
import "./MoviesCard.css";

const MoviesCard = ({card}) => {
  return (
      <li className='movies-card__card'>
        <div className='movies-card__info'>
          <div className='movies-card__info-container'>
            <h4 className='movies-card__title'>{card.nameRU}</h4>
            <p className='movies-card__time'>{card.duration}</p>
          </div>
          <button className='movies-card__add-favorites-btn' type='button'>
          </button>
        </div>
        <img className='movies-card__image' src={card.image} alt={card.nameRU}/>
      </li>
  );
}

export default MoviesCard;
