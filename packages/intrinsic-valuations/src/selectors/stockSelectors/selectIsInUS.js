const selectIsInUS = (state) => {
  return state.stock.fundamentals?.general?.countryISO === "US";
};

export default selectIsInUS;
