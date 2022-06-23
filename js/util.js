/**
 * Helper function that returns random number from specified range value
 * @param {*} min - min range value
 * @param {*} max - max range value
 * @returns - random number
 * @example
 * getRandomNumber(1, 3);
 * // => 2
 */
const getRandomNumber = (min, max) => (min < max && min >= 0 ? Math.round(Math.random() * (max - min) + min) : false);
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
  for (let i = 0; i <= getRandomNumber(0, items.length - 1); i++) {
    randomItems.push(items[i]);
  }
  return randomItems;
};

/**
 * Helper function that adding class to element
 * @param {*} element - chosen element
 * @param {*} className - class name to add
 */
const addClass = (element, className) => {
  document.querySelector(element).classList.add(className);
};

/**
 * Helper function that removing class from element
 * @param {*} element - chosen element
 * @param {*} className - class name to remove
 */
const removeClass = (element, className) => {
  document.querySelector(element).classList.remove(className);
};

/**
 * Helper function that setting attribute to elements
 * @param {*} elements - chosen elements
 * @param {*} attributeName - attribute name to set
 * @param {*} attributeValue  - attribute value to set
 * @returns
 */
const setItemsAttribute = (elements, attributeName, attributeValue) =>
  document.querySelectorAll(elements).forEach((element) => element.setAttribute(attributeName, attributeValue));

/**
 * Helper function that removing attribute from elements
 * @param {*} elements - chosen elements
 * @param {*} attributeName - attribute to remove
 * @returns
 */
const removeItemsAttribute = (elements, attributeName) =>
  document.querySelectorAll(elements).forEach((element) => element.removeAttribute(attributeName));

export {
  getRandomNumber,
  getFractionNumber,
  getRandomAvatar,
  getRandomArrayElem,
  getRandomArray,
  addClass,
  removeClass,
  setItemsAttribute,
  removeItemsAttribute,
};
