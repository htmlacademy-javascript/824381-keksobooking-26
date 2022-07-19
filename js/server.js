/**
 * Ads variables
 */
const GET_ADS_ADDRESS = 'https://26.javascript.pages.academy/keksobooking/data';
const SET_FORM_ADDRESS = 'https://26.javascript.pages.academy/keksobooking';
const ERROR_MESSAGE = 'Не загружаются объявления';

/**
 * Function to get ads data from serever
 * @param {*} onSuccess - function on success
 * @param {*} onFail - function on fail
 */
const getData = (onSuccess, onFail) => {
  fetch(GET_ADS_ADDRESS)
    .then((response) => (response.ok ? response.json() : onFail(ERROR_MESSAGE)))
    .catch(() => onFail(ERROR_MESSAGE))
    .then((data) => onSuccess(data));
};

/**
 * Function the send form data to serever
 * @param {*} onSuccess - function on success
 * @param {*} onFail - function on fail
 * @param {*} body - body of request
 */
const sendData = (onSuccess, onFail, body) => {
  fetch(SET_FORM_ADDRESS, {
    method: 'POST',
    body,
  })
    .then((response) => (response.ok ? onSuccess() : onFail()))
    .catch(() => onFail());
};

export { getData, sendData };
