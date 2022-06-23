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

export { disableForms, enableForms };
