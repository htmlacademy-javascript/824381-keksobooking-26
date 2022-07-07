import { enableForms } from "./form.js";
import { getSimilarAd } from "./data.js";
import { generateAd } from "./ad-generator.js";

/**
 * Variables for map and form update
 */
const randomData = getSimilarAd();
const adressInput = document.querySelector("#address");
let mainAdress = {
  lat: 35.6895,
  lng: 139.692,
};

/**
 * Function that fill adress input
 * @param {*} adress - adress data
 * @returns - string with lat. and lng. values
 */
const fillInputValue = (adress) =>
  `${Object.keys(adress)[0]}: ${adress.lat}, ${Object.keys(adress)[1]}:${
    adress.lng
  }`;

adressInput.value = fillInputValue(mainAdress);

/**
 * Leaflet map setup
 */
const map = L.map("map-canvas")
  .on("load", () => {
    enableForms();
  })
  .setView(
    {
      lat: mainAdress.lat,
      lng: mainAdress.lng,
    },
    13
  );
L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  }
).addTo(map);

/**
 * Main pin setup
 */
const mainPinIcon = L.icon({
  iconUrl: "./img/main-pin.svg",
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: mainAdress.lat,
    lng: mainAdress.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  }
);

mainPinMarker.on("moveend", (evt) => {
  const updatedMainAdress = evt.target.getLatLng();

  Object.keys(updatedMainAdress).forEach(
    (key) =>
      (updatedMainAdress[key] = Number(updatedMainAdress[key].toFixed(5)))
  );
  adressInput.value = fillInputValue(updatedMainAdress);
});

mainPinMarker.addTo(map);

/**
 * Regular pin setup
 */
const regularPinIcon = L.icon({
  iconUrl: "./img/pin.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

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
  marker.addTo(map).bindPopup(generateAd(item.author, item.offer));
};

randomData.forEach((dataPin) => {
  createRegularPin(dataPin);
});
