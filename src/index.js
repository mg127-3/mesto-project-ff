import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { openModal, closeModal, setPopupEventListeners, closeModalOverlay } from './scripts/modal.js';
import { createCard, deleteCard, likeAction } from './scripts/card.js';
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

// Импорт изображений 

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
  { name: 'Logo', link: logo }
]

//  DOM узлы

// Карточки
const cardList = document.querySelector('.places__list');

// Кнопки
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// Элементы попапов
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImageView = document.querySelector('.popup_type_image');
const popupImageElement = popupImageView.querySelector('.popup__image');
const popupCaption = popupImageView.querySelector('.popup__caption')

// Элементы форм
const formEditProfile = document.forms['edit-profile'];
const formAddCard = document.forms['new-place'];
const nameInput = formEditProfile.elements['name'];
const jobInput = formEditProfile.elements['description'];
const cardAddName = formAddCard.elements['place-name'];
const cardAddImage = formAddCard.elements['link'];

// Массив карточек
const popupsArr = Array.from(document.querySelectorAll('.popup'));


// Добавление аватара и логотипа

document.querySelector('.profile__image').style.backgroundImage = `url(${avatar})`;
document.querySelector('.header__logo').src = logo;

// Вывод карточек на страницу

initialCards.forEach((item) => {
  const displayCard = createCard(item, deleteCard, likeAction, handleImageClick);
  cardList.append(displayCard);
});

// Работа с формой изменения профиля

function submitEditProfile(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const profileName = document.querySelector('.profile__title');
  const profileJob = document.querySelector('.profile__description');

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;

  formEditProfile.reset()
  closeModal(popupEditProfile)
}

// Работа с формой добавления карточки

function submitNewCard(evt) {
  evt.preventDefault();

  const item = {
    name: cardAddName.value,
    link: cardAddImage.value
  };

  const newCard = createCard(item, deleteCard, likeAction, handleImageClick);
  cardList.prepend(newCard);

  formAddCard.reset();
  closeModal(popupAddCard)
}

// Открытие попапа с изображением

function handleImageClick(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupCaption.textContent = name;

  openModal(popupImageView)
}

// Добавление слушателей кнопкам

profileEditButton.addEventListener('click', () => {
  let profileName = document.querySelector('.profile__title')
  let profileJob = document.querySelector('.profile__description')
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openModal(popupEditProfile);
});

profileAddButton.addEventListener('click', () => openModal(popupAddCard));
formEditProfile.addEventListener('submit', submitEditProfile);
formAddCard.addEventListener('submit', submitNewCard);

setPopupEventListeners(popupEditProfile);
setPopupEventListeners(popupAddCard);
setPopupEventListeners(popupImageView);

// Добавление анимации попапам

popupsArr.forEach(popup => popup.classList.add('popup_is-animated'));






