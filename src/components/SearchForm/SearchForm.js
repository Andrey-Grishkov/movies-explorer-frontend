import React from "react";
import "./SearchForm.css";
import search from "../../images/search-form__search-button.svg";
import SwitchCheckbox from "../SwitchCheckbox/SwitchCheckbox";

function SearchForm() {
  return (
    <section className='search-form'>
      <form className='search-form__container'>
        <input className='search-form__name' placeholder='Фильм' type='text' id="search-form" name="search-form" required/>
        <button className='search-form__search-button' type='reset'>
          <img  className='search-form__search-image' src={search} alt='кнопка поиска'/>
        </button>
      </form>
      <div className='search-form__checkbox'>
        <SwitchCheckbox />
        <p className='search-form__filter-name'>Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
