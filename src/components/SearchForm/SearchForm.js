import React from "react";
import {useState} from "react";
import "./SearchForm.css";
import search from "../../images/search-form__search-button.svg";
import SwitchCheckbox from "../SwitchCheckbox/SwitchCheckbox";

function SearchForm({ onSearch, checkbox, handleSwitchCheckbox}) {
  const [notFindError, setNotFindError] = useState(false);
  const [request, setRequest] = useState("");

  const handleSearchInput = (evt) => {
    setRequest(evt.target.value);
  };

  const handleSubmitSearch = (evt) => {
    evt.preventDefault();
    if (request === "") {
      setNotFindError(true);
    } else {
      setNotFindError(false);
      onSearch(request);
    }
  };

  return (
    <section className='search-form'>
      <form className='search-form__container' onSubmit={handleSubmitSearch} noValidate>
        <input
          className='search-form__name'
          placeholder='Фильм'
          type='text'
          id="search-form"
          name="search-form"
          required
          value={request}
          onChange={handleSearchInput}
        />
        <button className='search-form__search-button' type='submit'>
          <img  className='search-form__search-image' src={search} alt='кнопка поиска'/>
        </button>
      </form>
      {notFindError && (
        <p className="search-form__search-error">
          Ошибка: введите запрос!
        </p>
      )}
      <div className='search-form__checkbox'>
        <SwitchCheckbox
          handleSwitchCheckbox={handleSwitchCheckbox}
          checkbox={checkbox}
        />
        <p className='search-form__filter-name'>Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
