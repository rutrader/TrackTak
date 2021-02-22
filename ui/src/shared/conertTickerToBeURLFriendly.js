const conertTickerToBeURLFriendly = (ticker) => {
  return ticker.replace(/\./g, "-").toLowerCase();
};

export default conertTickerToBeURLFriendly;
