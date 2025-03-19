// @todo: Темплейт карточки
const card = document.querySelector('#card-template').content;
const cardList = document.querySelector('.places__list');

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(item, deleteCard) {
 
    const cardElement = card.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
  
    cardList.append(cardElement);

    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement);
      });
  }
// @todo: Функция удаления карточки

function deleteCard(cardElement) {
    cardElement.remove();
  }

// @todo: Вывести карточки на страницу

initialCards.forEach((item) => {
    createCard(item, deleteCard);
  });


