/**
 * Constant variables to create 10 random objects with booking data
 */
const TITLES = [
  'Big apartment',
  'Regular apartment',
  'Small apartment',
  'A private house',
  'Luxury cottage',
  'Townhouse on the lake',
];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = [
  'Very nice apartments',
  'Good shelter from bad weather',
  'Great castle for knights',
  'Grandmas cottage with pies',
  'Lounge paradise',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const LOCATION_LAT_MIN = 35.65;
const LOCATION_LAT_MAX = 35.7;
const LOCATION_LNG_MIN = 139.7;
const LOCATION_LNG_MAX = 139.8;

const SIMILAR_AD_COUNT = 10;

/**
 * Helper function that returns random number from specified range value
 * @param {*} min - min range value
 * @param {*} max - max range value
 * @returns - random number
 * @example
 * getRandomNumber(1, 3);
 * // => 2
 */
const getRandomNumber = (min, max) =>
  min < max && min >= 0 ? Math.round(Math.random() * (max - min) + min) : false;
getRandomNumber(0, 3);

/**
 * Helper function that returns random fraction number from specified range value
 * @param {*} min - min range value
 * @param {*} max - max range value
 * @param {*} fractionLength - number of digits after the fraction point
 * @returns - random fraction number
 * @example
 * getFractionNumber(1.1, 1.2, 2);
 * // => 1.12
 */
const getFractionNumber = (min, max, fractionLength) =>
  min < max && min >= 0 ? Number((Math.random() * (max - min) + min).toFixed(fractionLength)) : false;
getFractionNumber(1.1, 1.2, 2);

/**
 * Helper function that returns src adress for image
 * @param {*} url - part of src adress
 * @param {*} format - format of image
 * @param {*} pictureNumber - number of picture
 * @returns - url adress
 * // => img/avatars/user05.png
 */
const getRandomAvatar = (url, format, pictureNumber) => {
  const randomNumber = getRandomNumber(1, pictureNumber);
  return randomNumber < 10 ? `${url}0${randomNumber}.${format}` : `${url}${randomNumber}.${format}`;
};

/**
 * Helper function that returns random element in array
 * @param {*} items - array of elements
 * @returns random element
 */
const getRandomArrayElem = (items) => items[getRandomNumber(0, items.length - 1)];

/**
 * Helper function that returns array with random length values
 * @param {*} items - array of elements
 * @param {*} randomItems - empty array
 * @returns returns array
 */
const getRandomArray = (items, randomItems = []) => {
  for (let i = 0; i <= getRandomNumber(0, items.length); i++) {
    randomItems.push(items[i]);
  }
  return randomItems;
};

/**
 * Function that return object with random booking data
 * @returns object
 */
const createAd = () => {
  const location = {
    lat: getFractionNumber(LOCATION_LAT_MIN, LOCATION_LAT_MAX, 5),
    lng: getFractionNumber(LOCATION_LNG_MIN, LOCATION_LNG_MAX, 5),
  };
  return {
    author: {
      avatar: getRandomAvatar('img/avatars/user', 'png', 10),
    },
    offer: {
      title: getRandomArrayElem(TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomNumber(1000, 20000),
      type: getRandomArrayElem(TYPES),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkIn: getRandomArrayElem(TIMES),
      checkOut: getRandomArrayElem(TIMES),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElem(DESCRIPTIONS),
      photo: getRandomArrayElem(PHOTOS),
    },
    location,
  };
};

/**
 * Function that returns array of objects with random booking data
 * @param {*} numberOfObjects - number of objects in array
 * @returns array of objects
 */
const getSimilarAd = (numberOfObjects) => Array.from({ length: numberOfObjects }, createAd);
getSimilarAd(SIMILAR_AD_COUNT);
