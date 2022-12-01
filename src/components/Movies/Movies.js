import React from 'react';
import {useState, useEffect} from "react";
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ScrollMoviesBtn from "../ScrollMoviesBtn/ScrollMoviesBtn";
import Preloader from "../Preloader/Preloader";

const Movies = ({cards, isLoading, onSearch, handleAddCard, handleDeleteCard}) => {

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
    localStorage.setItem('checkbox', JSON.stringify(!checkbox));
  }

  useEffect(() => {
    setCheckbox(JSON.parse(localStorage.getItem('checkbox')));
  }, [handleSwitchCheckbox])

    const handleSearch = (request) => {
      setIsSearched(true);
      localStorage.setItem('request', JSON.stringify(request));
      onSearch(request);
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
        flag='add-favorites-btn'
      />
      {isLoading && <Preloader />}
      {!isLoading &&
      (<MoviesCardList
          cards={cards}
          counter={counter}
          checkbox={checkbox}
          handleSwitchCheckbox={handleSwitchCheckbox}
          isSearched={isSearched}
          handleSearch={handleSearch}
          windowSize={windowSize}
          handleAddCard={handleAddCard}
          flag='add-favorites-btn'
          handleDeleteCard={handleDeleteCard}
        />
        )
      }
      {(checkbox ? <></> : (windowSize+counter < cards.length)?
        <ScrollMoviesBtn onClick={handleClick}/> :
        <></>)
      }
    </section>
  );
}

export default Movies;
