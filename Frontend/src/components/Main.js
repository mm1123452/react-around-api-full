import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onDelete,
  onCardLike,
  onCardDelete,
}) {
  const { name, about, avatar, _id } = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="overlay-container">
          <div
            className="avatar"
            style={{ backgroundImage: `url(${avatar})` }}
          ></div>
          <div className="overlay">
            <div className="edit" onClick={onEditAvatar}></div>
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <button
            className="button button_edit"
            onClick={onEditProfile}
          ></button>
          <p className="profile__title">{about}</p>
        </div>
        <button className="button button_add" onClick={onAddPlace}></button>
      </section>
      <section className="container">
        <ul className="places">
          {cards.map((data, index) => {
            return (
              <li className="place" key={index}>
                <Card
                  card={data}
                  userId={_id}
                  onCardClick={onCardClick}
                  onDeleteClick={onDelete}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
