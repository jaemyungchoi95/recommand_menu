function pickRestaurants(list, count = 3) {
  return [...list].sort(() => Math.random() - 0.5).slice(0, count);
}

module.exports = { pickRestaurants };
