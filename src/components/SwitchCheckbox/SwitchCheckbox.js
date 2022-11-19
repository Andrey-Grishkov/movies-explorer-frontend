import React from 'react';
import './SwitchCheckbox.css';

function SwitchCheckbox({ checkbox, handleSwitchCheckbox }) {
  return (
        <label className='switch-checkbox__switch'>
          <input
            type='checkbox'
            id='checkbox'
            checked={checkbox ? true : false}
            onChange={handleSwitchCheckbox}
          />
          <span className="switch-checkbox__slider switch-checkbox__round"></span>
        </label>
  );
}

export default SwitchCheckbox;
