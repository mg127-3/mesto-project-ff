
//  Функция создания карточки

export function createCard(item, deleteCard, likeAction, handleImageClick) {

  const card = document.querySelector('#card-template').content;
  const cardElement = card.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  likeButton.addEventListener('click', likeAction);

  cardImage.addEventListener('click', () => {
    handleImageClick(item.name, item.link);
  });

  return cardElement;
}

// Функция удаления карточки

export function deleteCard(cardElement) {
  cardElement.remove();
}

// Работа с "лайком"

export function likeAction(evt) {
  const button = evt.target;
  button.classList.toggle('card__like-button_is-active');
}