const selectIsInUS = (state) => {
  return state.fundamentals.general?.countryISO === "US";
};

export default selectIsInUS;
