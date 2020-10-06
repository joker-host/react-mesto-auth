import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import { getContent } from '../utils/mestoAuth.js'
import { api } from '../utils/api.js';
import { UserContext } from '../contexts/CurrentUserContext.js';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const history = useHistory();

  const tokenCheck = () => {
    let jwt = localStorage.getItem('jwt');
    if (jwt) {
      getContent(jwt)
        .then((res) => {
          console.log(res)
          console.log(isRegisterPopupOpen)
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email)
            history.push('/main');
          }
        })
        
    }
  }

  useEffect(() => {
    tokenCheck();
  }, [loggedIn])

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const userInfo = React.useContext(UserContext);

  function handleEditAvatarClick() { //открывает попап с аватаром
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() { //открывает попап с профилем
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() { //открывает попап с добавлением карточки
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardsClick() { //открывает попап с подтверждением удаления карточки
    SetIsDeleteCardsPopupOpen(true);
  }

  function handleCardClick(card) { //открывает попап с увеличенной фотографией
    setSelectedCard({
      name: card.name,
      link: card.link
    });
  }

  function handleRegisterClick() { //открывает попап с подтверждением регистрации
    setIsRegisterPopupOpen(true);
  }

  function closeAllPopups() {  //закрывает все попапы
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    SetIsDeleteCardsPopupOpen(false);
    setIsRegisterPopupOpen(false);
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); // хуки состояния для открытия//закрытия попапов
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardsPopupOpen, SetIsDeleteCardsPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null); // хук состояния, запоминающий выбранную карточку, на фотографию которой нажали

  const [currentUser, setCurrentUser] = useState({  // хук, содержащий информцию о пользователе
    name: '',
    about: '',
    avatar: '',
    _id: '',
    cohort: ''
  });

  React.useEffect(() => { // получение объекта с информацией о пользователе
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(() => {
        console.error('error');
      })
  }, [])

  const [cards, setCards] = useState([]); // актуальный массив с карточками

  React.useEffect(() => { //получение карточек с сервера
    api.getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(() => {
        console.error('error');
      })
  }, [])

  function handleAddPlaceSubmit(values) { //добавление новой карточки
    setIsLoading(true)
    api.addCards(values)
      .then(newCard => {
        setCards([...cards, newCard]);
        setIsLoading(false)
        closeAllPopups();
      })
  }

  function handleCardLike(props) {  //лайк/дизлайк карточки
    setIsLoading(true)
    const isLiked = props.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.likeCards(props._id)
        .then((newCard) => {
          const newCards = cards.map((item) => item._id === props._id ? newCard : item);
          setCards(newCards);
          setIsLoading(false);
        })
    } else {
      api.disLikeCards(props._id)
        .then((newCard) => {
          const newCards = cards.map((item) => item._id === props._id ? newCard : item);
          setCards(newCards);
          setIsLoading(false);
        })
    }
  }

  const [deleteCard, setDeleteCard] = React.useState({})

  function handleCardDelete(props) { // удаление карточки
    handleDeleteCardsClick();
    setDeleteCard(props);
  }

  function deletedCard(deletedCard) { // удаление карточки
    setIsLoading(true)
    api.deleteCards(deletedCard._id)
      .then(() => {
        const newCards = cards.filter(card => card._id != deletedCard._id);
        setCards(newCards);
        setIsLoading(false)
        closeAllPopups();
      });
  }

  function handleUpdateUser(values) { // изменение информции пользователя
    setIsLoading(true)
    api.setUserUnfo(values)
      .then(res => {
        setCurrentUser(res);
        setIsLoading(false);
        closeAllPopups();
      })
  }

  function handleUpdateAvatar(values) { // изменение аватара
    setIsLoading(true)
    api.changeAvatar(values)
      .then(res => {
        setCurrentUser(res);
        setIsLoading(false)
        closeAllPopups();
      })
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  const [isloading, setIsLoading] = React.useState(false);

  return (

    <UserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header userEmail={userEmail} onQuit={handleLogout}/>
          <Switch>
            <ProtectedRoute
              path="/main"
              loggedIn={loggedIn}
              component={Main}

              loadingIndicator={isloading}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardImageClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
            <Route path="/signup">
              <Register handleRegisterClick={handleRegisterClick} isOpen={isRegisterPopupOpen}/>
            </Route>
            <Route path="/signin">
              <Login handleLogin={handleLogin}/>
            </Route>
            <Route>
              {loggedIn ? <Redirect to='/main'/> : <Redirect to='/signin'/>}
            </Route>
          </Switch>
          <Footer/>
          
          <InfoTooltip isOpen={isRegisterPopupOpen}/>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            loadingIndicator={isloading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            loadingIndicator={isloading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            loadingIndicator={isloading}
          />
          <ImagePopup
            selectedCard={selectedCard}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            loadingIndicator={isloading}
          />
          <DeletePopup
            isOpen={isDeleteCardsPopupOpen}
            onClose={closeAllPopups}
            card={deleteCard}
            onDeleteCard={deletedCard}
            loadingIndicator={isloading}
          />

        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;


/// andrey@ya.ru
/// 12345
