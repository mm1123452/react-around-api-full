import React from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext'


function Card(props) {
  const { _id} = React.useContext(CurrentUserContext);
  const { link, name } = props.card;
  //const cardOwnerId = props.card.owner._id;
   // const userId = _id
  const likes = props.card.likes;
  const likesCount = likes.length;
  const cardId = props.card._id
  const isOwn = props.card.owner._id === _id;
  const isLiked = likes.some(i => i._id === _id);
  const cardLikeButtonClassName = isLiked ? 'place__icon place__icon_liked': 'place__icon';
  
  function handleImageClick() {
    props.onCardClick(props.card);
  }

  const handleDeleteClick = () => {
    props.onCardDelete(cardId)
  }

  const handleLikeClick = () => {
    props.onCardLike(props.card)
  }

  return (
    <>
      <img className="place__image" src={link} alt={name} onClick={handleImageClick}/>
      {isOwn ? <div className="place__delete" onClick={handleDeleteClick}></div> : null}
      <div className="place__info">
        <h3 className="place__name">{name}</h3>
        <div className="place__icon-container">
          <div className={cardLikeButtonClassName} onClick={handleLikeClick}></div>
          <span className="place__likes-count">{likesCount}</span>
        </div>
      </div>
    </>
  );
}

export default Card;
