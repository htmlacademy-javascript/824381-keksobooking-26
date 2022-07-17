/**
 * Variables for creating ad generator
 */
const template = document.querySelector('#card').content.querySelector('.popup');
const cardsListFragment = document.createDocumentFragment();

/**
 * Function that create ad
 */
const generateAd = (author, offer) => {
  /**
   * Variables for creating ad
   */
  const card = template.cloneNode(true);
  const featuresListItems = card.querySelectorAll('.popup__feature');
  const photoContainer = card.querySelector('.popup__photos');
  const photoImg = photoContainer.querySelector('.popup__photo');
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
   *  Helpper function that hide element
   * @param {*} elem - element we want to hide
   */
  const hideElem = (elem) => {
    card.querySelector(elem).classList.add('hidden');
  };

  /**
   * Helper function that fill text in card item
   * @param {*} elem - element of card
   * @param {*} content - text content for item
   * @returns - card item with text
   */
  const fillTextElem = (elem, content) => (content ? (card.querySelector(elem).textContent = content) : hideElem(elem));

  /**
   * Helper function that fill attribute in card item
   * @param {*} elem - element of card
   * @param {*} attribute - attribute name
   * @param {*} content - content for items attribute
   * @returns - card item with attribute
   */
  const fillAttributeElem = (elem, attribute, content) =>
    content ? card.querySelector(elem).setAttribute(attribute, content) : hideElem(elem);

  fillTextElem('.popup__title', offer.title);
  fillTextElem('.popup__text--address', offer.address);
  fillTextElem('.popup__text--price', `${offer.price} ₽/ночь`);
  fillTextElem('.popup__text--capacity', `${offer.rooms} комнаты для ${offer.guests} гостей`);
  fillTextElem('.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  fillTextElem('.popup__description', offer.description);
  fillTextElem('.popup__type', TYPES_TRANSLATE[offer.type]);
  fillAttributeElem('.popup__avatar', 'src', author.avatar);

  if (offer.features) {
    featuresListItems.forEach((item) => {
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
        const photoElem = photoImg.cloneNode(true);
        photoElem.setAttribute('src', offer.photos[i]);
        photoContainer.append(photoElem);
      }
    }
  } else {
    photoContainer.remove();
  }

  /**
   * Append generating card in fragment element
   */
  cardsListFragment.append(card);

  return card;
};

export { generateAd };
