import React from "react";

function ImagePopup(props) {
  const {card, isOpen,onClose} = props

  const popupClass = isOpen ? 
  `popup popup_type_large-image popup_opened` :
  `popup popup_type_large-image`


  return (
    <aside className={popupClass}>
      <div className="popup__container">
        <figure className="popup__image-figure">
          <button className="popup__exit" onClick={onClose}></button>
          <img className="popup__image" alt="figure" src={card.link}/>
          <figcaption className="popup__image-title">{card.name}</figcaption>
        </figure>
      </div>
    </aside>
  );
}

export default ImagePopup;
