import React from "react";
import "./SearchForm.css";
import search from "../../images/search-form__search-button.svg";
import SwitchCheckbox from "../SwitchCheckbox/SwitchCheckbox";

function SearchForm() {
  return (
    <section className='search-form'>
      <div className='search-form__container'>
        <p className='search-form__name'>Фильм</p>
        <img className='search-form__search-button' src={search} alt='кнопка поиска'/>
      </div>
      <div className='search-form__checkbox'>
        <SwitchCheckbox />
        <p className='search-form__filter-name'>Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
