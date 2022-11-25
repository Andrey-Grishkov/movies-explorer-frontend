import React, {useState} from 'react';
import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import moviesFilter from "../../utils/moviesFilter";

const SavedMovies = ({ onSearch, cards, isLoadingSaved, handleDeleteMovieCard}) => {
  // const [resultSaved, setResultSaved] = useState(cards ?? []);
  const [isSearchedSaved, setIsSearchedSaved] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [counter, setCounter] = useState(0);

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
    setIsSearchedSaved(true);
    onSearch(request);

    // setIsSearchedSaved(true);
    // if (!cards || !cards.length) {
    //   onSearch(request);
    // } else {
    //   setResultSaved(moviesFilter(cards, request));
    // }
  };

  return (
    <section className='saved-movies'>
      <SearchForm
        onSearch={handleSearch}
        handleSwitchCheckbox={handleSwitchCheckbox}
        checkbox={checkbox}
      />
      {!isLoadingSaved &&
      (   <MoviesCardList
          cards={cards}
          flag='delete-favorites-btn'
          checkbox={checkbox}
          handleSwitchCheckbox={handleSwitchCheckbox}
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
