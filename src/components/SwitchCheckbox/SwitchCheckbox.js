import React from 'react';
import './SwitchCheckbox.css';

function SwitchCheckbox({ handleSwitchCheckbox, flag, handleSwitchCheckboxSaved }) {
  const inputChecked = flag==='add-favorites-btn' ? JSON.parse(localStorage.getItem('checkbox')) :
    JSON.parse(localStorage.getItem('checkboxSaved'));

  return (
        <label className='switch-checkbox__switch'>
          <input
            type='checkbox'
            id='checkbox'
            checked={inputChecked}
            onChange={flag==='add-favorites-btn' ? handleSwitchCheckbox : handleSwitchCheckboxSaved}
          />
          <span className="switch-checkbox__slider switch-checkbox__round"></span>
        </label>
  );
}

export default SwitchCheckbox;
