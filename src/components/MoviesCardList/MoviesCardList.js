import React, {useState, useEffect} from "react";
import "./MoviesCardList.css";
import MoviesCard from '../MoviesCard/MoviesCard'
import InfoTooltip from "../InfoTooltip/InfoTooltip";

const MoviesCardList = ({cards, flag, counter, checkbox, handleSwitchCheckbox, isSearched, handleSearch, windowSize,
                          handleDeleteCard, handleAddCard, handleDeleteMovieCard}) => {

  const [filmDuration, setFilmDuration] = useState(checkbox ? 40 : 600)
  const [infoTooltip, setInfoTooltip] = useState(false);

  const closeAllPopups = () => {
    setInfoTooltip(false);
  };

  useEffect(() => {
    if(checkbox) {
      setFilmDuration(40)
    } else {
      setFilmDuration(600)
    }
  }, [handleSwitchCheckbox]);

  useEffect(() => {
    if(!cards.length && isSearched) {
      setInfoTooltip(true)
    }
  }, [handleSearch]);

  return (
    <div>
      <ul className='movies-card-list__container'>
        {flag === 'add-favorites-btn' ?
          (cards
          .filter((savedCard) => savedCard.duration<filmDuration)
          .slice(0, windowSize+counter)
          .map((savedCard) => (
            <MoviesCard
              key={flag !== 'add-favorites-btn' ? savedCard._id : savedCard.id}
              card={savedCard}
              flag={flag}
              handleDeleteCard={handleDeleteCard}
              handleAddCard={handleAddCard}
            />
          ))) : (JSON.parse(localStorage.getItem('savedMovies'))
            .filter((savedCard) => savedCard.duration<filmDuration)
            .slice(0, windowSize+counter)
            .map((savedCard) => (
              <MoviesCard
                key={flag !== 'add-favorites-btn' ? savedCard._id : savedCard.id}
                card={savedCard}
                flag={flag}
                handleDeleteCard={handleDeleteCard}
                handleAddCard={handleAddCard}
                handleDeleteMovieCard={handleDeleteMovieCard}
              />
            )))
        }
      </ul>
  <InfoTooltip
    infoTooltip={infoTooltip}
    infoTooltipStatus={false}
    infoTooltipMessage={'Ничего не найдено'}
    onClose={closeAllPopups}
  />
    </div>
  );
}

export default MoviesCardList;
