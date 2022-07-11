/**
 * Ad variables
 */
const ADS_ADRESS = 'https://26.javascript.pages.academy/keksobooking/data';

/**
 * Get ads data from serever
 */
const getSimilarAds = (onSuccess, onFail) => {
  fetch(ADS_ADRESS)
    .then((response) => (response.ok ? response.json() : onFail))
    .then((data) => onSuccess(data))
    .catch(() => onFail('Не загружаются объявления'));
};

export { getSimilarAds };
