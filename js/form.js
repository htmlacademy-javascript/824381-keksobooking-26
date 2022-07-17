import { addClass, removeClass, setItemsAttribute, removeItemsAttribute, addPopup } from './util.js';
import { setMainPinDefault, closeMapPopup } from './map.js';
import { sendData } from './server.js';

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
  const adForm = document.querySelector('.ad-form');
  const roomsInput = adForm.querySelector('#room_number');
  const guestsInput = adForm.querySelector('#capacity');
  const typesInput = adForm.querySelector('#type');
  const priceInput = adForm.querySelector('#price');
  const priceSlider = adForm.querySelector('.ad-form__slider');
  const timeInInput = adForm.querySelector('#timein');
  const timeOutInput = adForm.querySelector('#timeout');
  const submitButton = adForm.querySelector('.ad-form__submit');
  const resetButton = adForm.querySelector('.ad-form__reset');
  const photoAvatarChoser = adForm.querySelector('.ad-form-header__input');
  const photoAvatarPreview = adForm.querySelector('.ad-form-header__preview');
  const photoHousingChoser = adForm.querySelector('.ad-form__input');
  const photoHousingPreview = adForm.querySelector('.ad-form__photo');
  /**
   * Data variables
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
  const IMAGE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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
    const roomValue = roomsInput.value;
    return ROOMS_GUESTS[roomValue];
  };

  /**
   * Add validator for Prestine
   */
  pristine.addValidator(guestsInput, validateGuests, getGuestsErrorMessage);

  /**
   * Function that bind guestsInput and roomsInput for correct validation
   */
  const onRoomsChange = () => pristine.validate(guestsInput);

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
   * Function that block submit button
   */
  const blockSubmitButton = () => {
    submitButton.disabled = true;
    submitButton.textContent = SUBMIT_BUTTON_BLOCKED_TXT;
  };

  /**
   * Function that unblock submit button
   */
  const unblockSubmitButton = () => {
    submitButton.disabled = false;
    submitButton.textContent = SUBMIT_BUTTON_TXT;
  };

  /**
   * Function that set photo to preview element
   * @param {*} choser - input element for choose image
   * @param {*} preview - container element for preview
   */
  const setPhotoPreview = (choser, preview) => {
    const file = choser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = IMAGE_TYPES.some((format) => fileName.endsWith(format));
    if (matches) {
      const image = document.createElement('div');
      if (preview.querySelector('img')) {
        image.classList.add('preview-container', 'preview-container_small');
      } else {
        image.classList.add('preview-container');
      }
      image.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
      preview.append(image);
    }
  };

  /**
   * Function that remove previews images
   */
  const removePhotoPreviews = () => {
    const photoPreviews = adForm.querySelectorAll('.preview-container ');
    if (photoPreviews) {
      photoPreviews.forEach((item) => item.remove());
    }
  };

  /**
   * Function that reset the form to default values
   */
  const resetForm = () => {
    adForm.reset();
    priceSlider.noUiSlider.set(TYPES_LIST.flat);
    setMainPinDefault();
    removePhotoPreviews();
    closeMapPopup();
  };

  /**
   * Adform event listeners
   */
  roomsInput.addEventListener('change', onRoomsChange);

  typesInput.addEventListener('change', (evt) => {
    changeSiblingInputValue(evt, TYPES_LIST, priceInput);
    priceSlider.noUiSlider.set(TYPES_LIST[evt.target.value]);
  });

  timeInInput.addEventListener('change', (evt) => {
    setSimilarOption(evt, timeOutInput);
  });

  timeOutInput.addEventListener('change', (evt) => {
    setSimilarOption(evt, timeInInput);
  });

  priceInput.addEventListener('change', function () {
    priceSlider.noUiSlider.set(this.value);
  });

  photoAvatarChoser.addEventListener('change', (e) => {
    setPhotoPreview(e.target, photoAvatarPreview);
  });

  photoHousingChoser.addEventListener('change', (e) => {
    setPhotoPreview(e.target, photoHousingPreview);
  });

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const valid = pristine.validate();
    if (valid) {
      blockSubmitButton();
      sendData(
        () => {
          addPopup('success');
          unblockSubmitButton();
          resetForm();
        },
        () => {
          addPopup('error');
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });
};

export { disableForms, enableForms, validateAdForm };
