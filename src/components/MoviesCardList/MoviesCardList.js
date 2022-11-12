import React from "react";
import "./MoviesCardList.css";
import MoviesCard from '../MoviesCard/MoviesCard'

const MoviesCardList = ({cards, flag}) => {

  const moviesLeght = cards.length;
  console.log(moviesLeght);
  const viewMovies =9;

  return (
      <ul className='movies-card-list__container'>
        {cards.slice(0, viewMovies)
          // .filter((card) => card.duration<60)
          .map((card) => (
            <MoviesCard key={card.id} card={card} flag={flag}/>
          ))}
      </ul>
  );
}

export default MoviesCardList;
