const shuffle = (array) => {
  return array.sort(() => 0.5 - Math.random());
};

module.exports = shuffle;
