const convertHyphenTickerToDot = (ticker) => {
  return ticker.replace(/-/g, ".").toLowerCase();
};

export default convertHyphenTickerToDot;
