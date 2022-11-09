import React from "react";
import "./SwitchCheckbox.css";

function SwitchCheckbox() {
  return (
        <label className="switch-checkbox__switch">
          <input type="checkbox"/>
          <span className="switch-checkbox__slider switch-checkbox__round"></span>
        </label>
  );
}

export default SwitchCheckbox;
