/**
 * Ad data variable
 */
const TYPES_TRANSLATE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

/**
 * Variables for creating ad generator
 */
const templateElement = document.querySelector('#card').content.querySelector('.popup');
const cardsListFragment = document.createDocumentFragment();

/**
 * Function that create ad
 */
const generateAd = (author, offer) => {
  /**
   * Variables for creating ad
   */
  const cardElement = templateElement.cloneNode(true);
  const featuresListElements = cardElement.querySelectorAll('.popup__feature');
  const photoContainerElement = cardElement.querySelector('.popup__photos');
  const photoElement = photoContainerElement.querySelector('.popup__photo');

  /**
   *  Helpper function that hide element
   * @param {*} elem - element we want to hide
   */
  const hideElem = (elem) => {
    cardElement.querySelector(elem).classList.add('hidden');
  };

  /**
   * Helper function that fill text in card item
   * @param {*} elem - element of card
   * @param {*} content - text content for item
   * @returns - card item with text
   */
  const fillTextElem = (elem, content) =>
    content ? (cardElement.querySelector(elem).textContent = content) : hideElem(elem);

  /**
   * Helper function that fill attribute in card item
   * @param {*} elem - element of card
   * @param {*} attribute - attribute name
   * @param {*} content - content for items attribute
   * @returns - card item with attribute
   */
  const fillAttributeElem = (elem, attribute, content) =>
    content ? cardElement.querySelector(elem).setAttribute(attribute, content) : hideElem(elem);

  fillTextElem('.popup__title', offer.title);
  fillTextElem('.popup__text--address', offer.address);
  fillTextElem('.popup__text--price', `${offer.price} ₽/ночь`);
  fillTextElem('.popup__text--capacity', `${offer.rooms} комнаты для ${offer.guests} гостей`);
  fillTextElem('.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  fillTextElem('.popup__description', offer.description);
  fillTextElem('.popup__type', TYPES_TRANSLATE[offer.type]);
  fillAttributeElem('.popup__avatar', 'src', author.avatar);

  if (offer.features) {
    featuresListElements.forEach((item) => {
      if (!offer.features.some((feature) => item.classList.contains(`popup__feature--${feature}`))) {
        item.remove();
      }
    });
  }

  if (offer.photos) {
    fillAttributeElem('.popup__photo', 'src', offer.photos[0]);
    /**
     * Check if there more than 1 photo, then clone photo element
     */
    if (offer.photos.length > 1) {
      for (let i = 1; i < offer.photos.length; i++) {
        const photoNewElement = photoElement.cloneNode(true);
        photoNewElement.setAttribute('src', offer.photos[i]);
        photoContainerElement.append(photoNewElement);
      }
    }
  } else {
    photoContainerElement.remove();
  }

  /**
   * Append generating card in fragment element
   */
  cardsListFragment.append(cardElement);

  return cardElement;
};

export { generateAd };
