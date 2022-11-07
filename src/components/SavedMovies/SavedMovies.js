import React from 'react';
import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ScrollMoviesBtn from "../ScrollMoviesBtn/ScrollMoviesBtn";

const SavedMovies = ({cards}) => {
  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList cards={cards}/>
      <ScrollMoviesBtn />
    </section>
  );
}

export default SavedMovies;
