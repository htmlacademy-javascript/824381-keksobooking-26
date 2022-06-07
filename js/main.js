//Random digit helper
function getRandomNumber(min, max) {
  return min < max && min >= 0
    ? Math.round(Math.random() * (max - min) + min)
    : console.log("wrong number range");
}
getRandomNumber(0, 3);

//Random fraction digit helper
function getFractionNumber(min, max, fractionLength) {
  return min < max && min >= 0
    ? Number((Math.random() * (max - min) + min).toFixed(fractionLength))
    : console.log("wrong number range");
}

getFractionNumber(1.1, 1.2, 2);
