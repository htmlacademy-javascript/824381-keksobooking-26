/**
 * Helpers variables
 */
const ERROR_SHOW_TIME = 5000;
const TIMEOUT_DELAY = 500;

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

/**
 * Helper function that add popup
 * @param {*} name - name of the popup selector
 */
const addPopup = (name) => {
  /**
   * Variables for creating popup
   */
  const body = document.querySelector('body');
  const popupClone = body.querySelector(`#${name}`).content.querySelector(`.${name}`).cloneNode(true);
  const popupFragment = document.createDocumentFragment();

  popupFragment.append(popupClone);
  body.append(popupFragment);

  /**
   * Function that remove popup and event listeners
   * @param {*} e - event
   */
  const removePopup = (e) => {
    if (e.button === 0 || e.key === 'Escape') {
      const popup = document.querySelector(`.${name}`);
      popup.remove();
      body.removeEventListener('click', removePopup);
      body.removeEventListener('keydown', removePopup);
    }
  };

  /**
   * Event listeners
   */
  body.addEventListener('click', removePopup);
  body.addEventListener('keydown', removePopup);
};

/**
 * Helper function that debounce function call when too many requests
 * @param {*} callback - function callback
 * @param {*} timeoutDelay - delay for next request
 * @returns - debounced function
 */
const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { addClass, removeClass, setItemsAttribute, removeItemsAttribute, showError, addPopup, debounce };
