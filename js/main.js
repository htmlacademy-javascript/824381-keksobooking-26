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
