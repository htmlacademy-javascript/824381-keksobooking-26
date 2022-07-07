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
  const typesInput = adForm.querySelector('#type');
  const priceInput = adForm.querySelector('#price');
  const priceSlider = adForm.querySelector('.ad-form__slider');
  const timeInInput = adForm.querySelector('#timein');
  const timeOutInput = adForm.querySelector('#timeout');
  const roomsGuests = {
    1: 'Не больше 1 гостя',
    2: 'Не больше 2 гостей',
    3: 'Не больше 3 гостей',
    100: 'Не для гостей',
  };
  const typesList = {
    bungalow: '0',
    flat: '1000',
    hotel: '3000',
    house: '5000',
    palace: '10000',
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
    if (roomValue === Object.keys(roomsGuests)[3]) {
      roomValue = roomValue.substr(2);
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
    const similarOption = select.querySelector(`option[value="${e.target.value}"]`);
    similarOption.selected = true;
  };

  /**
   * Nouislider setup
   */
  noUiSlider.create(priceSlider, {
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
  priceSlider.noUiSlider.on('update', () => {
    priceInput.value = priceSlider.noUiSlider.get();
  });

  /**
   * Adform event listeners
   */
  typesInput.addEventListener('change', (evt) => {
    changeSiblingInputValue(evt, typesList, priceInput);
    priceSlider.noUiSlider.set(typesList[evt.target.value]);
  });

  timeInInput.addEventListener('change', (evt) => {
    setSimilarOption(evt, timeOutInput);
  });

  timeOutInput.addEventListener('change', (evt) => {
    setSimilarOption(evt, timeInInput);
  });

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });

  priceInput.addEventListener('change', function () {
    priceSlider.noUiSlider.set(this.value);
  });
};

export { disableForms, enableForms, validateAdForm };
