import React from "react";
import "./NavTab.css";

function NavTab() {
  return (
      <nav className='nav-tab'>
        <a className='nav-tab__anchor' href='#about-project'>
        <button className='nav-tab__button' type='button'>
            О проекте
          </button>
        </a>
        <a className='nav-tab__anchor' href='#techs'>
          <button className='nav-tab__button' type='button'>Технологии</button>
        </a>
        <a className='nav-tab__anchor' href='#about-me'>
        <button className='nav-tab__button' type='button'>Студент</button>
        </a>
      </nav>
  );
}

export default NavTab;
