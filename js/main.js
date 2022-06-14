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
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
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
 * @param {*} array - array of elements
 * @returns random element
 */
const getRandomArrayElem = (array) => array[getRandomNumber(0, array.length - 1)];

/**
 * Helper function that returns array with random length values
 * @param {*} array - array of elements
 * @param {*} randomArray - empty array
 * @returns returns array
 */
const getRandomArray = (array, randomArray = []) => {
  for (let i = 0; i <= getRandomNumber(0, array.length); i++) {
    randomArray.push(array[i]);
  }
  return randomArray;
};

/**
 * Function that return object with random booking data
 * @returns object
 */
const createAd = () => {
  const locationLat = getFractionNumber(35.65, 35.7, 5);
  const locationLng = getFractionNumber(139.7, 139.8, 5);
  return {
    author: {
      avatar: getRandomAvatar('img/avatars/user', 'png', 10),
    },
    offer: {
      title: getRandomArrayElem(TITLES),
      address: `${locationLat}, ${locationLng}`,
      price: getRandomNumber(1000, 20000),
      type: getRandomArrayElem(TYPES),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkIn: getRandomArrayElem(CHECKIN),
      checkOut: getRandomArrayElem(CHECKOUT),
      features: getRandomArray(FEATURES),
      description: getRandomArrayElem(DESCRIPTIONS),
      photo: getRandomArrayElem(PHOTOS),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };
};

/**
 * Function that returns array of objects with random booking data
 * @param {*} numberOfObjects - number of objects in array
 * @returns array of objects
 */
const getSimilarAd = (numberOfObjects) => Array.from({ length: numberOfObjects }, createAd);
getSimilarAd(SIMILAR_AD_COUNT);
