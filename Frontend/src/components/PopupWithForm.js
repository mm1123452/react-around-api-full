import React from "react";

function PopupWithForm({ title,name, isOpen,onClose,buttonText,
  inputPlaceholder1,inputPlaceholder2,input2Type,disableButton,
  inputValue1, inputValue2, 
  onInputChange1, onInputChange2,onSubmit, refInput2}) {
  
    const popupClass = isOpen ? 
    `popup popup_type_${name} popup_opened` :
    `popup popup_type_${name}`

  const disableButtonClass = disableButton ? `popup__button popup__button_disabled`:
  `popup__button`

  const handleSubmit = (e) => {
    onSubmit(e)
    onClose()
  }

  return (
    <div>
      <aside className={popupClass}>
        <div className="popup__container">
          <form className="popup__form" onSubmit={handleSubmit}>
            <h2 className="popup__title">{title}</h2>
            {inputPlaceholder1 && <input
              className="popup__input popup__name"
              type="text"
              name="title"
              placeholder={inputPlaceholder1}
              minLength="1"
              maxLength="30"
              value={inputValue1 }
              onChange={onInputChange1}
              required
            />}
            <span
              id="popup__title-error"
              className="popup__input_type_error"
            ></span>
            {inputPlaceholder2 && <input
              className="popup__input popup__about"
              type={input2Type}
              name="link"
              placeholder={inputPlaceholder2}
              pattern={input2Type === "link"? "https?://.+":null}
              value={inputValue2  }
              ref={refInput2}
              onChange={onInputChange2}
              required
            />}
            <span
              id="popup__link-error"
              className="popup__input_type_error"
            ></span>
            <button type="submit" className={disableButtonClass}>{buttonText}</button>
            <button className="popup__exit" onClick={onClose}></button>
          </form>
        </div>
      </aside> 
    </div>
  );
}

export default PopupWithForm;
