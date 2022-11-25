import React from 'react';
import { useState } from 'react';
import "./MoviesCard.css";
const beatFilmMovies = 'https://api.nomoreparties.co/'

const MoviesCard = ({card, flag, handleDeleteCard, handleAddCard, handleDeleteMovieCard}) => {
  const imageLink = beatFilmMovies + card.image.url;
  const imageLinkSaved = card.image;
  const durationHours = parseInt((card.duration/60));
  const durationMin = card.duration%60;



  const [isFavorite, setIsFavorite] =
    useState(flag === 'add-favorites-btn' ? JSON.parse(localStorage.getItem('FavoritesMoviesBtn')).includes(card.nameRU) : false);

  function handleSaveMovie () {
    if (!isFavorite) {
    handleAddCard(card);
      setIsFavorite(true);
      const FavoritesMovies = JSON.parse(localStorage.getItem('FavoritesMoviesBtn'));
      FavoritesMovies.push(card.id)
      localStorage.setItem('FavoritesMoviesBtn', JSON.stringify(FavoritesMovies));
    } else {
      handleDeleteCard(card.id);
      setIsFavorite(false);
      const FavoritesMovies = JSON.parse(localStorage.getItem('FavoritesMoviesBtn')).filter((item) => item !== card.nameRU);
      localStorage.setItem('FavoritesMoviesBtn', JSON.stringify(FavoritesMovies));
    }
  }

  const handleDeleteSavedCard = () => {
    handleDeleteMovieCard(card._id);
    setIsFavorite(false);
    const FavoritesMovies = JSON.parse(localStorage.getItem('FavoritesMoviesBtn')).filter((item) => item !== card.nameRU)
    localStorage.setItem('FavoritesMoviesBtn', JSON.stringify(FavoritesMovies));
  }

  // console.log('***********likedMovies***************')
  // console.log(JSON.parse(localStorage.getItem('FavoritesMoviesBtn')))

  const handleClick = () => {
    window.open(card.trailerLink);
  };

  // console.log('***********Card***************')
  // console.log(card)
  // console.log('************************************')



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
