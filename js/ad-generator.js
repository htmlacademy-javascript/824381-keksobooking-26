import { getSimilarAd } from './data.js';
/**
 * Variables for creating ad generator
 */
const randomData = getSimilarAd();
const template = document.querySelector('#card').content.querySelector('.popup');
const cardsListFragment = document.createDocumentFragment();
const map = document.querySelector('#map-canvas');

/**
 * Loop for random data. Creating some ad items.
 */
randomData.forEach(({ author, offer }, index) => {
  const card = template.cloneNode(true);
  const featuresListItems = card.querySelectorAll('.popup__feature');
  const typesTranslate = {
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
  const fillTextElem = (elem, content) =>
    content ? (card.querySelector(elem).textContent = content) : hideElem(elem);

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
  fillTextElem('.popup__text--time', `Заезд после ${offer.checkIn}, выезд до ${offer.checkOut} гостей`);
  fillTextElem('.popup__description', offer.description);
  fillTextElem('.popup__type', typesTranslate[offer.type]);
  fillAttributeElem('.popup__avatar', 'src', author.avatar);

  featuresListItems.forEach((item) => {
    if (!offer.features.some((feature) => item.classList.contains(`popup__feature--${feature}`))) {
      item.remove();
    }
  });

  fillAttributeElem('.popup__photo', 'src', offer.photos[0]);
  /**
   * Check if there more than 1 photo, then clone photo element
   */
  if (offer.photos.length > 1) {
    const photoContainer = card.querySelector('.popup__photos');
    const photoImg = photoContainer.querySelector('.popup__photo');
    for (let i = 1; i < offer.photos.length; i++) {
      const photoElem = photoImg.cloneNode(true);
      photoElem.setAttribute('src', offer.photos[i]);
      photoContainer.append(photoElem);
    }
  }

  /**
   * Append generating test-card in fragment element
   */
  if (index === 0) {
    cardsListFragment.append(card);
  }
});

/**
 * Append fragment in map element
 */
map.append(cardsListFragment);
