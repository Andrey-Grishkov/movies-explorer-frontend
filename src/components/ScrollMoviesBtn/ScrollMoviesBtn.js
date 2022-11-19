import React from 'react';
import './ScrollMoviesBtn.css'

function ScrollMoviesBtn ({onClick}) {
  return (
      <div className='scroll-movies-btn'>
        <button className='scroll-movies-btn__button' type='button' onClick={onClick}>
          Ещё
        </button>
      </div>
  );
}

export default ScrollMoviesBtn;
