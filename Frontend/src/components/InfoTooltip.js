import React from "react";

function InfoTooltip({isOpen, success,onClose}) {
  const popupClass = isOpen ? 
  `popup popup__tooltip popup_opened` :
  `popup popup__tooltip`

  const message = success ? 
  `Success! You have now been registered.` :
  `Oops, something went wrong!
   Please try again.`

  const iconClass = success ? 
  `popup__icon_type_success` :
  `popup__icon_type_error`

  return (
    <aside className={popupClass}>
      <div className="popup__container">
      <form className="popup__form ">
        <div className={iconClass}></div>
        <h2 className="popup__title">{message}</h2>
        <button className="popup__exit" onClick={onClose}></button>
      </form>
      </div>
    </aside>
  );
}

export default InfoTooltip;