import React from "react";
import { useState, useEffect } from 'react';
import "./MoviesCard.css";
const beatFilmMovies = 'https://api.nomoreparties.co/'

  // /uploads/stones_in_exile_b2f1b8f4b7.jpeg

const MoviesCard = ({card, flag, handleDeleteCard, handleAddCard,
                      savedMovies}) => {
  const imageLink = beatFilmMovies + card.image.url;
  const imageLinkSaved = card.image;
  const durationHours = parseInt((card.duration/60));
  const durationMin = card.duration%60;
  const [saveMovie, setSaveMovie] = useState(false);
  const [findId, setFindId] = useState(flag !== 'add-favorites-btn' ? card._id : card.id);





  // const handleSaveMovie = () => {
  //   if (!saveMovie && flag === 'add-favorites-btn') {
  //     return setSaveMovie(true);
  //   }
  //   return setSaveMovie(false);
  // };

  // const checkMovie = (card, savedMovies) => {
  //   let findId = "";
  //   savedMovies.forEach((item) => {
  //     if (item.movieId === card.movieId) {
  //       findId = item._id;
  //     }
  //   });
  //   return findId;
  // }
  //
  // useEffect(() => {
  //   if (flag === "add-favorites-btn") {
  //     setFindId(checkMovie(card, savedMovies));
  //   }
  // }, [savedMovies, card, flag]);


  // const handleSaveMovie = (evt) => {
  //   evt.stopPropagation();
  //
  //   if (!saveMovie && flag === 'add-favorites-btn') {
  //     setcardTest(card);
  //     handleAddCard(card);
  //     setSaveMovie(true);
  //   } else {
  //     handleDeleteCard(findId);
  //     setSaveMovie(false);
  //   }
  // };

  function handleSaveMovie (evt) {
    evt.stopPropagation();

    if (!saveMovie && flag === 'add-favorites-btn') {
      handleAddCard(card);
      setSaveMovie(true);
    } else {
      handleDeleteCard(findId);
      setSaveMovie(false);
    }
  };


  // const movieCard = {
  //   country: cardTest.country,
  //   director: cardTest.director,
  //   duration: cardTest.duration,
  //   year: cardTest.year,
  //   description: cardTest.description,
  //   image: `https://api.nomoreparties.co/${cardTest.image.url}`,
  //   trailerLink: cardTest.trailerLink,
  //   thumbnail: `https://api.nomoreparties.co/${cardTest.image.formats.thumbnail}`,
  //   movieId: cardTest.id,
  //   nameRU: cardTest.nameRU,
  //   nameEN: cardTest.nameEN,
  // }






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
              <button className={`movies-card__${flag} movies-card__${flag}_${saveMovie ? 'active' : ''}`}
                       type='button'
                       onClick={handleSaveMovie}
                      >
              </button> :
              <button className={`movies-card__${flag}`}
                       type='button'
                       onClick={handleDeleteCard}>
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
