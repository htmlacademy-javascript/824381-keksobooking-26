import { addClass, removeClass, setItemsAttribute, removeItemsAttribute } from './util.js';
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
   * Variables for form validation
   */
  const adForm = document.querySelector('.ad-form');
  const roomsInput = adForm.querySelector('#room_number');
  const guestsInput = adForm.querySelector('#capacity');
  const roomsGuests = {
    1: 'Не больше 1 гостя',
    2: 'Не больше 2 гостей',
    3: 'Не больше 3 гостей',
    100: 'Не для гостей',
  };

  /**
   * Prisitne library setup
   */
  const pristine = new Pristine(adForm, {
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
    let roomValue = roomsInput.value;
    if (roomValue === '100') {
      roomValue = '0';
    }
    return value !== '0' ? Number(value) <= Number(roomValue) : Number(value) === Number(roomValue);
  };

  /**
   * Function that fill error message for "Guests field"
   * @returns error message
   */
  const getGuestsErrorMessage = () => {
    const roomValue = roomsInput.value;
    return roomsGuests[roomValue];
  };

  /**
   * Add validator for Prestine
   */
  pristine.addValidator(guestsInput, validateGuests, getGuestsErrorMessage);

  /**
   * Bind guestsInput and roomsInput for correct validation
   */
  const onRoomsChange = () => pristine.validate(guestsInput);
  roomsInput.addEventListener('change', onRoomsChange);

  /**
   * Adform event listener for Prestine
   */
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export { disableForms, enableForms, validateAdForm };
