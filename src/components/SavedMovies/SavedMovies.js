import React, {useState} from 'react';
import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import ScrollMoviesBtn from "../ScrollMoviesBtn/ScrollMoviesBtn";
import Preloader from "../Preloader/Preloader";
import moviesFilter from "../../utils/moviesFilter";

const SavedMovies = ({ onSearch, cards, isLoadingSaved, handleDeleteCard}) => {
  const [resultSaved, setResultSaved] = useState(cards ?? []);
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
    if (!cards || !cards.length) {
      onSearch(request, setResultSaved);
    } else {
      setResultSaved(moviesFilter(cards, request));
    }
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
          cards={resultSaved}
          flag='delete-favorites-btn'
          checkbox={checkbox}
          handleSwitchCheckbox={handleSwitchCheckbox}
          isSearched={isSearchedSaved}
          handleSearch={handleSearch}
          windowSize={windowSize}
          handleDeleteCard={handleDeleteCard}
          counter={counter}
        />
      )
      }
    </section>
  );
}

export default SavedMovies;

// cards={result}
// counter={counter}
// checkbox={checkbox}
// handleSwitchCheckbox={handleSwitchCheckbox}
// isSearched={isSearched}
// handleSearch={handleSearch}
// windowSize={windowSize}
// handleAddCard={handleAddCard}
// flag='add-favorites-btn'
