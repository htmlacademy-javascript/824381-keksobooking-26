/**
 * Helpers variable
 */
const ERROR_SHOW_TIME = 5000;

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

/**
 * Helper function that show eror message
 * @param {*} message - text message to fill
 */
const showError = (message) => {
  const errorContainer = document.createElement('div');
  errorContainer.classList.add('error-baloon');
  errorContainer.textContent = message;
  document.body.append(errorContainer);
  setTimeout(() => {
    errorContainer.remove();
  }, ERROR_SHOW_TIME);
};

export { addClass, removeClass, setItemsAttribute, removeItemsAttribute, showError };
