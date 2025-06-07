import { apiDeleteCard, apiAddCardLike, apiDeleteCardLike } from "./api";

//  Функция создания карточки

export function createCard(item, deleteCard, likeAction, handleImageClick, userId) {
  const card = document.querySelector("#card-template").content;
  const cardElement = card.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  likeCounter.textContent = item.likes.length;

  if (item.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCard(item._id, cardElement);
    });
  }

  if (item.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () => {
    likeAction(item._id, likeButton, likeCounter);
  });

  cardImage.addEventListener("click", () => {
    handleImageClick(item.name, item.link);
  });

  return cardElement;
}

// Функция удаления карточки

export function deleteCard(cardId, cardElement) {
  apiDeleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
}

// Работа с "лайком"

export function likeAction(cardId, likeButton, likeCounter) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const action = isLiked ? apiDeleteCardLike : apiAddCardLike;

  action(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.error("Ошибка при изменении лайка:", err);
    });
}
