import React, {useState, useEffect} from "react";
import "./MoviesCardList.css";
import MoviesCard from '../MoviesCard/MoviesCard'
import api from "../../utils/MainApi";

const MoviesCardList = ({cards, flag, counter, checkbox, handleSwitchCheckbox}) => {

  const countBigSize = 12;
  const countMediumSize = 8;
  const countSmallSize = 5;

  const [windowSize, setWindowSize] = useState(window.innerWidth < 721 ? countSmallSize : (window.innerWidth < 1109 ? countMediumSize : countBigSize));
  const [filmDuration, setFilmDuration] = useState(checkbox ? 40 : 600)

  window.addEventListener('resize', () => {
    if (window.innerWidth < 721) {
      setWindowSize(countSmallSize);
    } else if (window.innerWidth < 1109) {
      setWindowSize(countMediumSize);
    } else {
      setWindowSize(countBigSize);
    }});

  useEffect(() => {
    if(checkbox) {
      setFilmDuration(40)
    } else {
      setFilmDuration(600)
    }
  }, [handleSwitchCheckbox]);

  // const handleFilterDuration = () => {
  //   if (checkbox) {
  //     setCounter(counter+2)
  //   } else {
  //     setCounter(counter+3)
  //   }
  // };

  return (
      <ul className='movies-card-list__container'>
        {cards
          .filter((card) => card.duration<filmDuration)
          .slice(0, windowSize+counter)
          .map((card) => (
            <MoviesCard key={card.id} card={card} flag={flag}/>
          ))}
      </ul>
  );
}

export default MoviesCardList;
