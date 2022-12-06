import React, {useEffect, useState} from 'react';
import './SavedMovies.css'
import { COUNT_CARDS_BIG_SIZE, COUNT_CARDS_MEDIUM_SIZE, COUNT_CARDS_SMALL_SIZE } from '../../utils/constants';
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

const SavedMovies = ({ onSearch, cards, isLoadingSaved, handleDeleteMovieCard}) => {
  const [isSearchedSaved, setIsSearchedSaved] = useState(false);
  const [checkboxSaved, setCheckboxSaved] = useState(false);
  const [counter, setCounter] = useState(0);

  const [windowSize, setWindowSize] = useState(window.innerWidth < 721 ? COUNT_CARDS_SMALL_SIZE :
    (window.innerWidth < 1109 ? COUNT_CARDS_MEDIUM_SIZE : COUNT_CARDS_BIG_SIZE));

  window.addEventListener('resize', () => {
    if (window.innerWidth < 721) {
      setWindowSize(COUNT_CARDS_SMALL_SIZE);
    } else if (window.innerWidth < 1109) {
      setWindowSize(COUNT_CARDS_MEDIUM_SIZE);
    } else {
      setWindowSize(COUNT_CARDS_BIG_SIZE);
    }});

  const handleSwitchCheckboxSaved = () => {
    setCheckboxSaved(!checkboxSaved);
    // localStorage.setItem('checkboxSaved', JSON.stringify(!checkboxSaved));
  }

  // useEffect(() => {
  //   setCheckboxSaved(JSON.parse(localStorage.getItem('checkboxSaved')));
  // }, [handleSwitchCheckboxSaved])

  const handleSearch = (request) => {
    const defaultSaved = 'Фильмы';
    setIsSearchedSaved(true);
    localStorage.setItem('requestSaved', JSON.stringify(defaultSaved));
    onSearch(request);
  };

  return (
    <section className='saved-movies'>
      <SearchForm
        onSearch={handleSearch}
        handleSwitchCheckboxSaved={handleSwitchCheckboxSaved}
        checkboxSaved={checkboxSaved}
        flag='delete-favorites-btn'
        isLoading={isLoadingSaved}
      />
      {isLoadingSaved && <Preloader />}
      {!isLoadingSaved &&
      (   <MoviesCardList
          cards={cards}
          flag='delete-favorites-btn'
          checkboxSaved={checkboxSaved}
          handleSwitchCheckboxSaved={handleSwitchCheckboxSaved}
          isSearched={isSearchedSaved}
          handleSearch={handleSearch}
          windowSize={windowSize}
          counter={counter}
          handleDeleteMovieCard={handleDeleteMovieCard}
        />
      )
      }
    </section>
  );
}

export default SavedMovies;
