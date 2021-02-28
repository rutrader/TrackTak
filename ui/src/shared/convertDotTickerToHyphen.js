const convertDotTickerToHyphen = (ticker) => {
  return ticker.replace(/\./g, "-").toLowerCase();
};

export default convertDotTickerToHyphen;
