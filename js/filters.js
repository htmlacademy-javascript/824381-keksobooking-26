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
const filtersForm = document.querySelector('.map__filters');
const housingTypeInput = filtersForm.querySelector('#housing-type');
const housingRoomsInput = filtersForm.querySelector('#housing-rooms');
const housingGuestsInput = filtersForm.querySelector('#housing-guests');
const housingPriceInput = filtersForm.querySelector('#housing-price');
const housingFeaturesInputs = filtersForm.querySelectorAll('.map__checkbox');

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
  filtersForm.addEventListener('change', () => {
    clearRegularPins();
    /**
     * An empty array to fill with features for check
     */
    const featuresValues = [];
    housingFeaturesInputs.forEach((item) => {
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
        filterByValue(ad.offer.type, housingTypeInput.value) &&
        filterByValue(String(ad.offer.rooms), housingRoomsInput.value) &&
        filterByValue(String(ad.offer.guests), housingGuestsInput.value) &&
        filterByPrice(String(ad.offer.price), housingPriceInput.value) &&
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

  filtersForm.addEventListener('reset', () => {
    clearRegularPins();
    createRegularPins(data);
  });
};

export { enableFilters };
