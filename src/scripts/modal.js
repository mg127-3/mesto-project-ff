const handleEscKeyUp = (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
};

export const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keyup', handleEscKeyUp);
  popup.addEventListener('mousedown', closeModalOverlay);
};

export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', handleEscKeyUp);
  popup.removeEventListener('mousedown', closeModalOverlay);
};

export const setPopupEventListeners = (popup) => {
  const closeButton = popup.querySelector(".popup__close");

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      closeModal(popup);
    });
  }
};

export function closeModalOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}
