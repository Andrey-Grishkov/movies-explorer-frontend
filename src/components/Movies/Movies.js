import React from 'react';
import {useState} from "react";
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ScrollMoviesBtn from "../ScrollMoviesBtn/ScrollMoviesBtn";
import Preloader from "../Preloader/Preloader";
import MoviesFilter from "../../utils/moviesFilter"

const Movies = ({cards, isLoading, onSearch}) => {

  const [result, setResult] = useState(cards ?? []);
  const [isSearched, setIsSearched] = useState(false);
  const [counter, setCounter] = useState(0);
  const [checkbox, setCheckbox] = useState(false);

  const countBigSize = 12;
  const countMediumSize = 8;
  const countSmallSize = 5;

  const [windowSize, setWindowSize] = useState(window.innerWidth < 721 ? countSmallSize :
    (window.innerWidth < 1109 ? countMediumSize : countBigSize));

  window.addEventListener('resize', () => {
    if (window.innerWidth < 721) {
      setWindowSize(countSmallSize);
    } else if (window.innerWidth < 1109) {
      setWindowSize(countMediumSize);
    } else {
      setWindowSize(countBigSize);
    }});

  const handleSwitchCheckbox = () => {
    setCheckbox(!checkbox);
    console.log('переключение чекбокса')
  }

    const handleSearch = (request) => {
      setIsSearched(true);
    if (!cards || !cards.length) {
      onSearch(request, setResult);
    } else {
      setResult(MoviesFilter(cards, request));
    }
  };

  const handleClick = () => {
    if (window.innerWidth < 1109) {
      setCounter(counter+2)
    } else {
      setCounter(counter+3)
    }
  };

  return (
    <section className='movies'>
      <SearchForm
        onSearch={handleSearch}
        handleSwitchCheckbox={handleSwitchCheckbox}
        checkbox={checkbox}
      />
      {isLoading && <Preloader />}
      {!isLoading &&
      (<MoviesCardList
          cards={result}
          counter={counter}
          checkbox={checkbox}
          handleSwitchCheckbox={handleSwitchCheckbox}
          isSearched={isSearched}
          handleSearch={handleSearch}
          windowSize={windowSize}
          flag='add-favorites-btn'
        />
        )
      }
      {(checkbox ? <></> : (windowSize+counter < result.length)?
        <ScrollMoviesBtn onClick={handleClick}/> :
        <></>)
      }
    </section>
  );
}

export default Movies;
