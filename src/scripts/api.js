// Конфигурация API

const apiConfig = {
  baseURL: "https://mesto.nomoreparties.co/v1/wff-cohort-39",
  headers: {
    authorization: "f8289d03-f059-450c-bf00-a7c4f289d869",
    "Content-Type": "application/json",
  },
};

// Получение ответа от сервера

const apiGetResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  return res.json();
};

// Получение информации о юзере

const apiGetUserInfo = () => {
  return fetch(`${apiConfig.baseURL}/users/me`, {
    headers: apiConfig.headers,
  })
  .then((res) => {
    return apiGetResponseData(res);
  });
};

// Получение карточек с сервера

const apiGetInitialCards = () => {
  return fetch(`${apiConfig.baseURL}/cards`, {
    headers: apiConfig.headers,
  })
  .then((res) => {
    return apiGetResponseData(res);
  });
};

// Обновление аватара юзера

function apiUpdateUserImage(avatarUrl) {
  return fetch(`${apiConfig.baseURL}/users/me/avatar`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return apiGetResponseData(res)
  });
}

// Обновление профильной информации юзера

function apiUpdateUserProfile(newName, job) {
  return fetch(`${apiConfig.baseURL}/users/me`, {
    method: "PATCH",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: newName,
      about: job,
    }),
  })
  .then((res) => apiGetResponseData(res));
}

// Добавление новой карточки

function apiSubmitNewCard(cardName, url) {
  return fetch(`${apiConfig.baseURL}/cards`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      name: cardName,
      link: url,
    }),
  })
  .then((res) => apiGetResponseData(res));
}

// Удаление карточки

function apiDeleteCard(cardId) {
  return fetch(`${apiConfig.baseURL}/cards/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  })
  .then(apiGetResponseData);
}

// Добавление лайка карточке

function apiAddCardLike(cardId) {
  return fetch(`${apiConfig.baseURL}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: apiConfig.headers,
  })
  .then(apiGetResponseData);
}

// Удаление лайка у карточки

function apiDeleteCardLike(cardId) {
  return fetch(`${apiConfig.baseURL}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: apiConfig.headers,
  })
  .then(apiGetResponseData);
}

export {
  apiConfig,
  apiGetInitialCards,
  apiGetResponseData,
  apiGetUserInfo,
  apiSubmitNewCard,
  apiUpdateUserImage,
  apiUpdateUserProfile,
  apiDeleteCard,
  apiAddCardLike,
  apiDeleteCardLike,
};
