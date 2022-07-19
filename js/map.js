import { generateAd } from './ad-generator.js';

/**
 * Variables for map
 */
const MAIN_ADDRESS = {
  lat: 35.65947,
  lng: 139.74611,
};
const SIMILAR_ADS_COUNT = 10;

/**
 * Variable for form input
 */
const addressElement = document.querySelector('#address');

/**
 * Function that fill address input
 * @param {*} address - address data
 * @returns - string with lat. and lng. values
 */
const fillInputValue = (address) => `${address.lat}, ${address.lng}`;
addressElement.value = fillInputValue(MAIN_ADDRESS);

/**
 * Leaflet map setup
 */
const map = L.map('map-canvas').setView(
  {
    lat: MAIN_ADDRESS.lat,
    lng: MAIN_ADDRESS.lng,
  },
  12
);
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  attribution:
    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
}).addTo(map);

/**
 * Main pin setup
 */
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: MAIN_ADDRESS.lat,
    lng: MAIN_ADDRESS.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.on('moveend', (evt) => {
  const updatedMainAddress = evt.target.getLatLng();

  Object.keys(updatedMainAddress).forEach(
    (key) => (updatedMainAddress[key] = Number(updatedMainAddress[key].toFixed(5)))
  );
  addressElement.value = fillInputValue(updatedMainAddress);
});

mainPinMarker.addTo(map);

/**
 * Regular pin setup
 */
const regularPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

/**
 * Map layer for regular markers
 */
const regularMarkersLayer = L.layerGroup().addTo(map);

/**
 * Function that create regular pin
 * @param {*} item - data for regular pin
 */
const createRegularPin = (item) => {
  const lat = item.location.lat;
  const lng = item.location.lng;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: regularPinIcon,
    }
  );
  marker.addTo(regularMarkersLayer).bindPopup(generateAd(item.author, item.offer));
};

/**
 * Function that create regular pins
 * @param {*} items - data for regular pins
 */
const createRegularPins = (items) => {
  const adsData = items.slice(0, SIMILAR_ADS_COUNT);
  adsData.forEach((point) => {
    createRegularPin(point);
  });
};

/**
 * Function that clear regular merkers layer
 */
const clearRegularPins = () => {
  regularMarkersLayer.clearLayers();
};

/**
 * Function that close baloon for regular pin
 */
const closeMapPopup = () => {
  map.closePopup();
};

/**
 * Function that set main pin to default values
 */
const setMainPinDefault = () => {
  mainPinMarker.setLatLng([MAIN_ADDRESS.lat, MAIN_ADDRESS.lng]);
  addressElement.value = fillInputValue(MAIN_ADDRESS);
};

export { setMainPinDefault, closeMapPopup, createRegularPin, createRegularPins, clearRegularPins };
