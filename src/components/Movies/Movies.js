import React from 'react';
import {useState} from "react";
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ScrollMoviesBtn from "../ScrollMoviesBtn/ScrollMoviesBtn";
import Preloader from "../Preloader/Preloader";
import MoviesFilter from "../../utils/moviesFilter"

const Movies = ({cards, isLoading, onSearch}) => {

  const [result, setResult] = useState((cards !== null && cards !== undefined) ? cards : []);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = (request, isSmall) => {
    setIsSearched(true);
    if (!cards || !cards.length) {
      onSearch(request, isSmall, setResult);
    } else {
      setResult(MoviesFilter(cards, request, isSmall));
    }
  };

  return (
    <section className='movies'>
      <SearchForm onSearch={handleSearch}/>
      {isLoading && <Preloader />}
      {!isLoading &&
      (<MoviesCardList cards={cards} flag='add-favorites-btn'/>
        )
      }
      {<ScrollMoviesBtn />
      }
    </section>
  );
}

export default Movies;
