import React, {useEffect} from "react";
import {useState} from "react";
import "./SearchForm.css";
import search from "../../images/search-form__search-button.svg";
import SwitchCheckbox from "../SwitchCheckbox/SwitchCheckbox";

function SearchForm({ onSearch, checkbox, handleSwitchCheckbox, checkboxSaved, flag, handleSwitchCheckboxSaved, isLoading}) {
  const [notFindError, setNotFindError] = useState(false);
  const [request, setRequest] = useState("");
  const [defaultValue, setDefaultValue] = useState('Фильмы');

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

  useEffect(() => {
    flag==='add-favorites-btn' ? setDefaultValue(JSON.parse(localStorage.getItem('request'))) : setDefaultValue(JSON.parse(localStorage.getItem('requestSaved')));
  }, [handleSubmitSearch])

  return (
    <section className='search-form'>
      <form className='search-form__container' onSubmit={handleSubmitSearch} noValidate>
        <input
          className='search-form__name'
          placeholder={defaultValue == null ? 'Фильмы' : defaultValue}
          type='text'
          id="search-form"
          name="search-form"
          required
          value={request}
          onChange={handleSearchInput}
          disabled={isLoading}
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
          checkboxSaved={checkboxSaved}
          flag={flag}
          handleSwitchCheckboxSaved={handleSwitchCheckboxSaved}
        />
        <p className='search-form__filter-name'>Короткометражки</p>
      </div>
    </section>
  );
}

export default SearchForm;
