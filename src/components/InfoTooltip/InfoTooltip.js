import React from 'react';
import './InfoTooltip.css'
import yes from '../../images/popup__reg-info-image_yes.svg';
import no from '../../images/popup__reg-info-image_no.svg';

function InfoTooltip({ infoTooltip, infoTooltipStatus, onClose, infoTooltipMessage }) {

  return (
    <div className={infoTooltip ? 'popup popup_is-opened' : 'popup'}>
      <div className='popup__content'>
        <button
          className='popup__close'
          type='button'
          onClick={onClose}
        ></button>
        <img className='popup__reg-info-image' src={infoTooltipStatus ? yes : no} />
        <p className='popup__reg-info-text'>
          {infoTooltipMessage}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
