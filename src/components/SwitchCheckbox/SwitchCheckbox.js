import React from "react";
import "./SwitchCheckbox.css";

function SwitchCheckbox({handleSwitch}) {
  return (
        <label className="switch-checkbox__switch">
          <input
            type="checkbox"
            onClick={handleSwitch}
          />
          <span className="switch-checkbox__slider switch-checkbox__round"></span>
        </label>
  );
}

export default SwitchCheckbox;
