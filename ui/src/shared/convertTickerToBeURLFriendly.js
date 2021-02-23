const convertTickerToBeURLFriendly = (ticker) => {
  return ticker.replace(/\./g, "-").toLowerCase();
};

export default convertTickerToBeURLFriendly;
