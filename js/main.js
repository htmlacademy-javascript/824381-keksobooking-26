//Random digit helper
function getRandomNumber(min, max) {
  return min < max && min >= 0
    ? Math.round(Math.random() * (max - min) + min)
    : false;
}
getRandomNumber(0, 3);

//Random fraction digit helper
function getFractionNumber(min, max, fractionLength) {
  return min < max && min >= 0
    ? Number((Math.random() * (max - min) + min).toFixed(fractionLength))
    : false;
}

getFractionNumber(1.1, 1.2, 2);
