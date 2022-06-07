//Random digit helper
function getRandomNumer(min, max) {
  return min < max && min >= 0
    ? Math.round(Math.random() * (max - min) + min)
    : console.log("wrong number range");
}
getFractionNumer(0, 3);

//Random fraction digit helper
function getFractionNumer(min, max, fractionLength) {
  return min < max && min >= 0
    ? Number((Math.random() * (max - min) + min).toFixed(fractionLength))
    : console.log("wrong number range");
}

getFractionNumer(1.1, 1.2, 2);
