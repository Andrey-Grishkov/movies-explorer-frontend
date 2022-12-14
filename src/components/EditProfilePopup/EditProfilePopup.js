import React, {useContext, useState} from "react";
import "./EditProfilePopup.css";
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const errors = {
  required: "Обязательно для заполнения",
  name: "Имя содержит недопустимые символы",
  email: "Некорректный email",
  minLength: "Введите не менее 2 символов",
  maxLength: "Введите не более 30 символов",
  nameCurrent: "Имя совпадает с существующим",
  emailCurrent: "Почта совпадает с существующей",
}

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [disabledBtnName, setDisabledBtnName] = useState(true);
  const [disabledBtnEmail, setDisabledBtnEmail] = useState(true);
  const [disabledCurrentName, setDisabledCurrentName] = useState(true);

  function handleErrorEmail(e) {
    const inputEmail = e.target;
    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
      inputEmail.value
    );

    if (inputEmail.value.length < 1) {
      setErrorEmail(errors.required);
      setDisabledBtnEmail(true);
    } else if (!validEmail) {
      setErrorEmail(errors.email);
      setDisabledBtnEmail(true);
    } else {
      setErrorEmail('');
      setDisabledBtnEmail(false);
    }
    // if (currentUser.email === props.valueEmail) {
    //   setErrorEmail(errors.emailCurrent);
    // }
    props.setEmail(inputEmail.value);
  }

  function handleErrorName(e) {
    const inputName = e.target;

    if (inputName.value.length < 1) {
      setErrorName(errors.required);
      setDisabledBtnName(true);
    } else if (inputName.value.length < 2) {
      setErrorName(errors.minLength);
      setDisabledBtnName(true);
    } else if (inputName.value.length > 30) {
      setErrorName(errors.maxLength);
      setDisabledBtnName(true);
    } else {
      setErrorName('');
      setDisabledBtnName(false);
    }
    // if (currentUser.name === props.valueName) {
    //   setErrorName(errors.nameCurrent);
    // }
    props.setName(inputName.value);
  }

  const isDisabled = currentUser.name === props.valueName && currentUser.email === props.valueEmail;
  const disabledBtn = disabledBtnName || disabledBtnEmail || isDisabled;

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      btnTitle='Сохранить'
      isOpen={props.isOpenEditProfile}
      onClose={props.onClose}
      onSubmit={props.handleSubmit}
      disabled={disabledBtn === true ? 'popup__button-submit_type_disabled' : ''}
    >
      <input
        className='popup__user-input popup__user-input_input_name'
        type='text'
        id='input-name'
        required
        placeholder='Введите имя'
        minLength='2'
        maxLength='40'
        name='userName'
        value={props.name}
        onChange={handleErrorName}
      />
      <span className='popup__error_visible' id='input-name-error'>{errorName}</span>
      <input
        className='popup__user-input popup__user-input_input_user-about'
        type='text'
        id='input-text'
        required
        placeholder='Введите email'
        minLength='2'
        maxLength='200'
        name='userAboutEmail'
        value={props.email}
        onChange={handleErrorEmail}
      />
      <span className='popup__error_visible' id='input-text-error'>{errorEmail}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
