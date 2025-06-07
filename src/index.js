import './pages/index.css';
import { openModal, closeModal, setPopupEventListeners, closeModalOverlay } from './scripts/modal.js';
import { createCard, deleteCard, likeAction } from './scripts/card.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { apiConfig, apiGetInitialCards, apiGetResponseData, apiGetUserInfo, apiSubmitNewCard, apiUpdateUserImage, apiUpdateUserProfile, apiDeleteCard, apiAddCardLike, apiDeleteCardLike } from './scripts/api.js';
import addIcon from './images/add-icon.svg';
import avatar from './images/avatar.jpg';
import cardOne from './images/card_1.jpg';
import cardTwo from './images/card_2.jpg';
import cardThree from './images/card_3.jpg';
import close from './images/close.svg';
import deleteIcon from './images/delete-icon.svg';
import editIcon from './images/edit-icon.svg';
import likeActive from './images/like-active.svg';
import likeInactive from './images/like-inactive.svg';
import logo from './images/logo.svg';
import userImageEditIcon from './images/userimage-edit-button.svg';


// Изображения

const images = [
  { name: 'Add Icon', link: addIcon },
  { name: 'Avatar', link: avatar },
  { name: 'Card One', link: cardOne },
  { name: 'Card Two', link: cardTwo },
  { name: 'Card Three', link: cardThree },
  { name: 'Close', link: close },
  { name: 'Delete Icon', link: deleteIcon },
  { name: 'Edit Icon', link: editIcon },
  { name: 'Like Active', link: likeActive },
  { name: 'Like Inactive', link: likeInactive },
  { name: 'Logo', link: logo },
  { name: 'User Image Edit', link: userImageEditIcon }
]

// Конфигурация валидации

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//  DOM узлы

// Карточки
const cardList = document.querySelector('.places__list');

// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const userImageEditButton = document.querySelector('.profile__image__edit-button');

// Элементы попапов
const popupEditUserImage = document.querySelector('.popup_type_user-image')
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImageView = document.querySelector('.popup_type_image');
const popupImageElement = popupImageView.querySelector('.popup__image');
const popupCaption = popupImageView.querySelector('.popup__caption');

// Элементы форм
const formEditUserImage = document.forms['edit-user-image'];
const formEditProfile = document.forms['edit-profile'];
const formAddCard = document.forms['new-place'];
const nameInput = formEditProfile.elements['name'];
const jobInput = formEditProfile.elements['description'];
const cardAddName = formAddCard.elements['place-name'];
const cardAddImage = formAddCard.elements['link'];
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');


// Массив карточек
const popupsArr = Array.from(document.querySelectorAll('.popup'));


// Работа с формой изменения аватара

function submitEditUserImage(evt) {
  evt.preventDefault();

  const button = formEditUserImage.querySelector('.popup__button');
  button.textContent = 'Сохранение...'
  const avatarInput = formEditUserImage.elements['user-image-url'];
  const newAvatarUrl = avatarInput.value;

  apiUpdateUserImage(newAvatarUrl)
    .then(user => {
      document.querySelector('.profile__image').style.backgroundImage = `url(${user.avatar})`;
      closeModal(popupEditUserImage);
      formEditUserImage.reset();
    })
    .catch(err => {
      console.error('Ошибка обновления аватара:', err);
    })
    .finally(() => {
      button.textContent = 'Сохранить'
    })
}

// Работа с формой изменения профиля

function submitEditProfile(evt) {
  evt.preventDefault();

  const button = formEditProfile.querySelector('.popup__button');
  button.textContent = 'Сохранение...';

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  apiUpdateUserProfile(nameValue, jobValue)
    .then(user => {
      profileName.textContent = user.name;
      profileJob.textContent = user.about;
      closeModal(popupEditProfile);
      formEditProfile.reset();
    })
    .catch(err => {
      console.error('Ошибка обновления профиля:', err);
    })
    .finally(() => {
      button.textContent = 'Сохранить';
    })
}

// Работа с формой добавления карточки

function submitNewCard(evt) {
  evt.preventDefault();

  const button = formAddCard.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  const cardName = cardAddName.value;
  const url = cardAddImage.value;

  apiSubmitNewCard(cardName, url)
    .then(newCardData => {
      const newCard = createCard(newCardData, deleteCard, likeAction, handleImageClick, currentUserId);
      cardList.prepend(newCard);
      formAddCard.reset();
      closeModal(popupAddCard);
    })
    .catch(err => {
      console.error('Ошибка при добавлении новой карточки:', err);
    })
    .finally(() => {
      button.textContent = 'Сохранить';
    })
}

// Открытие попапа с изображением

function handleImageClick(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;

  openModal(popupImageView)
}

// Добавление слушателей кнопкам

userImageEditButton.addEventListener('click', () => {
  formEditUserImage.reset();
  clearValidation(formEditUserImage, validationConfig);
  openModal(popupEditUserImage)
});

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  clearValidation(formEditProfile, validationConfig);
  openModal(popupEditProfile);
});

profileAddButton.addEventListener('click', () => {
  formAddCard.reset();
  clearValidation(formAddCard, validationConfig);
  openModal(popupAddCard);
});

formEditProfile.addEventListener('submit', submitEditProfile);
formAddCard.addEventListener('submit', submitNewCard);
formEditUserImage.addEventListener('submit', submitEditUserImage);

setPopupEventListeners(popupEditProfile);
setPopupEventListeners(popupAddCard);
setPopupEventListeners(popupImageView);
setPopupEventListeners(popupEditUserImage)

// Добавление анимации попапам

popupsArr.forEach(popup => popup.classList.add('popup_is-animated'));

//Валидация форм

enableValidation(validationConfig);

// Добавление инфо профиля и карточек с сервера

let currentUserId;

Promise.all([apiGetUserInfo(), apiGetInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;

    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;

    cards.forEach(cardData => {
      const cardElement = createCard(cardData, deleteCard, likeAction, handleImageClick, currentUserId);
      cardList.append(cardElement);
    });
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных с сервера:', err);
  });


