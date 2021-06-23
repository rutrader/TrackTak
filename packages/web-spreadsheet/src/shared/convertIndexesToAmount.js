const convertIndexesToAmount = (startIndex, endIndex) => {
  const amount = endIndex - startIndex + 1;

  return amount;
};

export default convertIndexesToAmount;
