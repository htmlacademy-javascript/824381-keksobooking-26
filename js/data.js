/**
 * Import data variables
 */
import {
  TITLES,
  TYPES,
  TIMES,
  FEATURES,
  DESCRIPTIONS,
  PHOTOS,
  LOCATION_LAT_MIN,
  LOCATION_LAT_MAX,
  LOCATION_LNG_MIN,
  LOCATION_LNG_MAX,
  SIMILAR_AD_COUNT,
} from './data-variables.js';

/**
 * Import helpers functions
 */
import {
  getRandomNumber,
  getFractionNumber,
  getRandomAvatar,
  getRandomArrayElem,
  getRandomArray,
} from './util.js';

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
      photos: getRandomArray(PHOTOS),
    },
    location,
  };
};

/**
 * Function that returns array of objects with random booking data
 * @returns array of objects
 */
const getSimilarAd = () => Array.from({ length: SIMILAR_AD_COUNT }, createAd);

export { getSimilarAd };
