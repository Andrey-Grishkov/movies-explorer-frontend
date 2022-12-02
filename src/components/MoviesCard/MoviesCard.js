import React from 'react';
import { useState } from 'react';
import "./MoviesCard.css";
import { BEAT_FILM_MOVIES, MOVIE_DURATION_HOUR } from '../../utils/constants';

const MoviesCard = ({card, flag, handleDeleteCard, handleAddCard, handleDeleteMovieCard}) => {
  const imageLink = BEAT_FILM_MOVIES + card.image.url;
  const imageLinkSaved = card.image;
  const durationHours = parseInt((card.duration/MOVIE_DURATION_HOUR));
  const durationMin = card.duration%MOVIE_DURATION_HOUR;

  const [isFavorite, setIsFavorite] =
    useState(flag === 'add-favorites-btn' && JSON.parse(localStorage.getItem('FavoritesMoviesBtn')) !== null ?
      JSON.parse(localStorage.getItem('FavoritesMoviesBtn')).includes(card.nameRU)
      : false);

  function handleSaveMovie () {
    if (!isFavorite) {
    handleAddCard(card);
      setIsFavorite(true);
      const addFavoritesMovies = JSON.parse(localStorage.getItem('FavoritesMoviesBtn'));
      addFavoritesMovies.push(card.nameRU)
      localStorage.setItem('FavoritesMoviesBtn', JSON.stringify(addFavoritesMovies));
    } else {
      handleDeleteCard(card.id);
      setIsFavorite(false);
      const delFavoritesMovies = JSON.parse(localStorage.getItem('FavoritesMoviesBtn')).filter((item) => item !== card.nameRU);
      localStorage.setItem('FavoritesMoviesBtn', JSON.stringify(delFavoritesMovies));
    }
  }

  const handleDeleteSavedCard = () => {
    handleDeleteMovieCard(card._id);
    setIsFavorite(false);
    const FavoritesMovies = JSON.parse(localStorage.getItem('FavoritesMoviesBtn')).filter((item) => item !== card.nameRU)
    localStorage.setItem('FavoritesMoviesBtn', JSON.stringify(FavoritesMovies));
  }

  const handleClick = () => {
    window.open(card.trailerLink);
  };

  return (
      <li className='movies-card__card'>
        <div className='movies-card__info'>
          <div className='movies-card__info-container'>
            <h4 className='movies-card__title'>{card.nameRU}</h4>
            <p className='movies-card__time'>{durationHours}ч {durationMin}м</p>
          </div>
          {
            flag === 'add-favorites-btn' ?
              <button className={`movies-card__${flag} movies-card__${flag}_${isFavorite ? 'active' : ''}`}
                       type='button'
                       onClick={handleSaveMovie}
                      >
              </button>
              :
              <button className={`movies-card__${flag}`}
                       type='button'
                       onClick={handleDeleteSavedCard}
              >
              </button>
          }
        </div>
        {
          flag === 'add-favorites-btn' ?
            <img className='movies-card__image' src={imageLink} alt={card.nameRU} onClick={handleClick}/> :
            <img className='movies-card__image' src={imageLinkSaved} alt={card.nameRU} onClick={handleClick}/>
        }
      </li>
  );
}

export default MoviesCard;
