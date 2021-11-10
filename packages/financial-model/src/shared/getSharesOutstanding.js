const getSharesOutstanding = (fundamentals, price) => {
  return fundamentals.highlights.marketCapitalization / price;
};

export default getSharesOutstanding;
