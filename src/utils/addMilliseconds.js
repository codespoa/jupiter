module.exports = (milliseconds) => {
  const date = new Date();
  date.setMilliseconds(date.getMilliseconds() + milliseconds);

  return date;
};
