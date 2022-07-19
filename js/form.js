import { addClass, removeClass, setItemsAttribute, removeItemsAttribute, addPopup } from './util.js';
import { setMainPinDefault, closeMapPopup } from './map.js';
import { sendData } from './server.js';
import { removeAvatarPreviews, enableAvatarPreviews } from './avatar.js';

/**
 * Form data variables
 */
const ROOMS_GUESTS = {
  1: 'Не больше 1 гостя',
  2: 'Не больше 2 гостей',
  3: 'Не больше 3 гостей',
  100: 'Не для гостей',
};
const TYPES_LIST = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};
const SUBMIT_BUTTON_BLOCKED_TXT = 'Публикую...';
const SUBMIT_BUTTON_TXT = 'Опубликовать';

/**
 * Function that disable page's forms and inputs
 */
const disableForms = () => {
  addClass('.ad-form', 'ad-form--disabled');
  addClass('.map__filters', 'map__filters--disabled');
  addClass('.ad-form__slider', 'hidden');
  setItemsAttribute('fieldset', 'disabled', 'disabled');
  setItemsAttribute('.map__filter', 'disabled', 'disabled');
};

/**
 * Function that enable page's forms and inputs
 */
const enableForms = () => {
  removeClass('.ad-form', 'ad-form--disabled');
  removeClass('.map__filters', 'map__filters--disabled');
  removeClass('.ad-form__slider', 'hidden');
  removeItemsAttribute('fieldset', 'disabled');
  removeItemsAttribute('.map__filter', 'disabled');
};

const validateAdForm = () => {
  /**
   * Form variables
   */
  const adFormElement = document.querySelector('.ad-form');
  const filterFormElement = document.querySelector('.map__filters');
  const roomsElement = adFormElement.querySelector('#room_number');
  const guestsElement = adFormElement.querySelector('#capacity');
  const typesElement = adFormElement.querySelector('#type');
  const priceElement = adFormElement.querySelector('#price');
  const priceSliderElement = adFormElement.querySelector('.ad-form__slider');
  const timeInElement = adFormElement.querySelector('#timein');
  const timeOutElement = adFormElement.querySelector('#timeout');
  const submitElement = adFormElement.querySelector('.ad-form__submit');
  const resetElement = adFormElement.querySelector('.ad-form__reset');

  /**
   * Prisitne library setup
   */
  const pristine = new Pristine(adFormElement, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__error',
  });

  /**
   * Function that helps with "Guests field" validatation
   * @param {*} value - value of input
   * @returns true or false
   */
  const validateGuests = (value) => {
    let roomValue = roomsElement.value;
    if (roomValue === Object.keys(ROOMS_GUESTS)[3]) {
      roomValue = roomValue.substr(2);
    }
    return value !== '0' ? Number(value) <= Number(roomValue) : Number(value) === Number(roomValue);
  };

  /**
   * Function that fill error message for "Guests field"
   * @returns error message
   */
  const getGuestsErrorMessage = () => {
    const roomValue = roomsElement.value;
    return ROOMS_GUESTS[roomValue];
  };

  /**
   * Add validator for Prestine
   */
  pristine.addValidator(guestsElement, validateGuests, getGuestsErrorMessage);

  /**
   * Function that bind guests input and rooms input for correct validation
   */
  const onRoomsChange = () => pristine.validate(guestsElement);

  /**
   * Function that change sibling input value from data
   * @param {*} e - event
   * @param {*} data - data with values
   * @param {*} input - element to change
   */
  const changeSiblingInputValue = (e, data, input) => {
    const value = data[e.target.value];
    input.placeholder = value;
    input.value = value;
  };

  /**
   * Function that change select with similar option value
   * @param {*} e - event
   * @param {*} select - select input with similar value
   */
  const setSimilarOption = (e, select) => {
    const similarOptionElement = select.querySelector(`option[value="${e.target.value}"]`);
    similarOptionElement.selected = true;
  };

  /**
   * Nouislider setup
   */
  noUiSlider.create(priceSliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 1000,
    step: 1000,
    connect: 'lower',
    format: {
      to: (value) => value.toFixed(0),
      from: (value) => parseFloat(value),
    },
  });
  priceSliderElement.noUiSlider.on('update', () => {
    priceElement.value = priceSliderElement.noUiSlider.get();
  });

  /**
   * Function that block submit button
   */
  const blockSubmitButton = () => {
    submitElement.disabled = true;
    submitElement.textContent = SUBMIT_BUTTON_BLOCKED_TXT;
  };

  /**
   * Function that unblock submit button
   */
  const unblockSubmitButton = () => {
    submitElement.disabled = false;
    submitElement.textContent = SUBMIT_BUTTON_TXT;
  };

  /**
   * Function that reset the form to default values
   */
  const resetForms = () => {
    adFormElement.reset();
    filterFormElement.reset();
    priceSliderElement.noUiSlider.set(TYPES_LIST.flat);
    setMainPinDefault();
    removeAvatarPreviews();
    closeMapPopup();
  };

  /**
   * Enable form avatar photo previews
   */
  enableAvatarPreviews();

  /**
   * Adform event listeners
   */
  roomsElement.addEventListener('change', onRoomsChange);

  typesElement.addEventListener('change', (evt) => {
    changeSiblingInputValue(evt, TYPES_LIST, priceElement);
    priceSliderElement.noUiSlider.set(TYPES_LIST[evt.target.value]);
  });

  timeInElement.addEventListener('change', (evt) => {
    setSimilarOption(evt, timeOutElement);
  });

  timeOutElement.addEventListener('change', (evt) => {
    setSimilarOption(evt, timeInElement);
  });

  priceElement.addEventListener('change', function () {
    priceSliderElement.noUiSlider.set(this.value);
  });

  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const valid = pristine.validate();
    if (valid) {
      blockSubmitButton();
      sendData(
        () => {
          addPopup('success');
          unblockSubmitButton();
          resetForms();
        },
        () => {
          addPopup('error');
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });

  resetElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForms();
  });
};

export { disableForms, enableForms, validateAdForm };
