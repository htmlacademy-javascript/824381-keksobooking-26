import { clearRegularPins, createRegularPin, createRegularPins } from './map.js';
import { debounce } from './util.js';

/**
 * Filter data variable
 */
const PRICE_VALUE = {
  low: 0,
  middle: 10000,
  high: 50000,
};
const SIMILAR_ADS_COUNT = 10;

/**
 * Variables for filter form
 */
const filtersFormElement = document.querySelector('.map__filters');
const housingTypeElement = filtersFormElement.querySelector('#housing-type');
const housingRoomsElement = filtersFormElement.querySelector('#housing-rooms');
const housingGuestsElement = filtersFormElement.querySelector('#housing-guests');
const housingPriceElement = filtersFormElement.querySelector('#housing-price');
const housingFeaturesElements = filtersFormElement.querySelectorAll('.map__checkbox');

/**
 * Function that enable filters
 * @param {*} data - data from server
 * @param {*} counter - counter for ads
 */
const enableFilters = (data) => {
  /**
   * Function that filters by value
   * @param {*} item - data from ads object
   * @param {*} value - value of choosen input
   * @returns - if value matches return true
   */
  const filterByValue = (item, value) => value === 'any' || item === value;

  /**
   * Function that filters by price value
   * @param {*} item - data from ads object
   * @param {*} value - value of choosen input
   * @returns - if value matches return true
   */
  const filterByPrice = (item, value) =>
    value === 'any' ||
    (value === Object.keys(PRICE_VALUE)[0] && item >= PRICE_VALUE.low && item <= PRICE_VALUE.middle) ||
    (value === Object.keys(PRICE_VALUE)[1] && item >= PRICE_VALUE.middle && item <= PRICE_VALUE.high) ||
    (value === Object.keys(PRICE_VALUE)[2] && item >= PRICE_VALUE.high);

  /**
   * Function that filters by features
   * @param {*} item - data from ads object
   * @param {*} values - array of values of choosen feature checkbox
   * @returns - if value matches return true
   */
  const filterByFeatures = (item, values) => {
    if (item) {
      return values.every((feature) => item.includes(feature));
    }
  };

  /**
   * Form filter event listener
   */
  filtersFormElement.addEventListener('change', () => {
    clearRegularPins();
    /**
     * An empty array to fill with features for check
     */
    const featuresValues = [];
    housingFeaturesElements.forEach((item) => {
      if (item.checked) {
        featuresValues.push(item.value);
      }
    });

    /**
     * An empty array to fill with the appropriate object data
     */
    const filteredAds = [];
    for (const ad of data) {
      if (filteredAds.length >= SIMILAR_ADS_COUNT) {
        break;
      }
      if (
        filterByValue(ad.offer.type, housingTypeElement.value) &&
        filterByValue(String(ad.offer.rooms), housingRoomsElement.value) &&
        filterByValue(String(ad.offer.guests), housingGuestsElement.value) &&
        filterByPrice(String(ad.offer.price), housingPriceElement.value) &&
        filterByFeatures(ad.offer.features, featuresValues)
      ) {
        filteredAds.push(ad);
      }
    }
    debounce(() => {
      filteredAds.forEach((point) => {
        createRegularPin(point);
      });
    })();
  });

  filtersFormElement.addEventListener('reset', () => {
    clearRegularPins();
    createRegularPins(data);
  });
};

export { enableFilters };
