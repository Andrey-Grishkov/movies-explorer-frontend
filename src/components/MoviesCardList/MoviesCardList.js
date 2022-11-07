import React from "react";
import "./MoviesCardList.css";
import MoviesCard from '../MoviesCard/MoviesCard'

const MoviesCardList = ({cards}) => {
  return (
      <ul className='movies-card-list__container'>
        {cards.map((card) => (
          <MoviesCard key={card.movieId} card={card}/>
        ))}
      </ul>
  );
}


export default MoviesCardList;
