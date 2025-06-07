// Закрытие по клику на Esc

const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

// Открытие попапа

export const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscKeyUp);
  popup.addEventListener('mousedown', closeModalOverlay);
};

// Закрытие попапа

export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscKeyUp);
  popup.removeEventListener('mousedown', closeModalOverlay);
};

// Добавление слушателей попапам для закрытия по клику на крестик

export const setPopupEventListeners = (popup) => {
  const closeButton = popup.querySelector(".popup__close");

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      closeModal(popup);
    });
  }
};

// Закрытие попапа по клику на оверлей

export function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}
