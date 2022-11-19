import React from 'react';
import {useState, useEffect} from "react";
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ScrollMoviesBtn from "../ScrollMoviesBtn/ScrollMoviesBtn";
import Preloader from "../Preloader/Preloader";
import MoviesFilter from "../../utils/moviesFilter"
import api from "../../utils/MainApi";


// const checkbox = document.getElementById('checkbox');
// checkbox.addEventListener('change', () => {
//   console.log("Состояние чекбокса изменнено")
// })



const Movies = ({cards, isLoading, onSearch}) => {

  const [result, setResult] = useState(cards ?? []);
  const [isSearched, setIsSearched] = useState(false);
  const [counter, setCounter] = useState(0);
  const [checkbox, setCheckbox] = useState(false);

  const handleSwitchCheckbox = () => {
    setCheckbox(!checkbox);
    console.log('переключение чекбокса')
  }

    const handleSearch = (request, isSmall) => {
    setIsSearched(true);
    if (!cards || !cards.length) {
      onSearch(request, isSmall, setResult);
    } else {
      setResult(MoviesFilter(cards, request, isSmall));
    }
  };

  const handleClick = () => {
    if (window.innerWidth < 1109) {
      setCounter(counter+2)
    } else {
      setCounter(counter+3)
    }
  };


  const check = () => {
    if (document.getElementById("checkbox").checked === true) {
      console.log('check');
    } else {
      console.log('uncheck');
    }
  }

  // document.getElementById("checkbox").checked = true;



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
          cards={cards}
          counter={counter}
          checkbox={checkbox}
          handleSwitchCheckbox={handleSwitchCheckbox}
          flag='add-favorites-btn'
        />
        )
      }
      {1 > result.length ?
        <ScrollMoviesBtn onClick={handleClick}/> :
        <></>
      }
    </section>
  );
}

export default Movies;

// 1 < result.length ? <ScrollMoviesBtn onClick={handleClick}/> : <></>
