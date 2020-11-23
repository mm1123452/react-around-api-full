import React from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  withRouter 
 } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import { api } from "../utils/api";
import { auth } from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardId, setCardId] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setloggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({data:''});
  const [token, setToken] = React.useState(localStorage.getItem("token"));
  const [loginSuccess, setLoginSucces] = React.useState(false);
  const [showTooltip, setShowTooltip] = React.useState(false);
  let history = useHistory();



  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res.slice(0, 6));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  React.useEffect(() => {
    if (token) {
      auth.getContent(token)
      .then((res) => {       
        if (res) {
          const data = {
            id: res.data._id,
            email: res.data.email
          }
          setloggedIn(true)
          setUserData({...userData,data})
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    // eslint-disable-next-line
  }, [token]);

  React.useEffect(() => {
    api
      .getProfile()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (cardId) => {
    api
      .deleteCard(cardId)
      .then((res) => {
        const newCards = cards.filter((c) => (c._id !== cardId ? c : null));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceClick = (e) => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleEditAvatarClick = (e) => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleDeleteClick = (cardId) => {
    setIsConfirmPopupOpen(true);
    setCardId(cardId);
  };

  const handleCardClick = (card) => {
    console.log(card)
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
    setIsImagePopupOpen(false);
    setShowTooltip(false)
  };

  const handleAddPlace = (data) => {
    api
      .postCard(data)
      .then((newCard) => {
        setCards([...cards, newCard]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = (profileData) => {
    api
      .updateProfileData(profileData)
      .then((res) => setCurrentUser(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .updateProfileAvatar(data.avatar)
      .then((res) => setCurrentUser(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCard = (e) => {
    e.preventDefault();

    api
      .deleteCard(cardId)
      .then((res) => {
        setCardId(null);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = (email, password) => {
    auth.signin(email, password)
    .then((res) => {
      if(res){
        localStorage.setItem('token', res.token);
        setToken(res.token)
        setloggedIn(true)
        history.push('/');
      } 
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleRegister = (email,password) => {
    auth.register(email, password)
    .then((res) => {
      if(res){
        setLoginSucces(true)
        setShowTooltip(true)
         history.push("/signin");
      } else {
        setLoginSucces(false)
        setShowTooltip(true)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleLogout = () => {
    setloggedIn(false);
    setUserData({data:''})
    localStorage.removeItem("token");
    history.push("/signin");
  }

  const confirmProps = {
    title: "Are you sure?",
    name: "confirm",
    isOpen: isConfirmPopupOpen,
    onClose: closeAllPopups,
    buttonText: "Yes",
    disableButton: false,
    handleSubmit: deleteCard,
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <Header email={userData.data.email} onLogout={handleLogout}/>
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              cards={cards}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onDelete={handleDeleteClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Footer />
            
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <PopupWithForm {...confirmProps} />
            {selectedCard && (
              <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
                isOpen={isImagePopupOpen}
              />
            )}
          </ProtectedRoute>
          <Route path="/signin">
              <Login onLogin = {handleLogin}/>
          </Route>
          <Route path="/signup">          
            <Register  onRegister = {handleRegister} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
       <InfoTooltip isOpen={showTooltip} success={loginSuccess} onClose={closeAllPopups}/>
    </CurrentUserContext.Provider>
  );
}

export default  withRouter(App);
