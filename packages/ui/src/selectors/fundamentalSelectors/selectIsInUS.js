const selectIsInUS = (state) => {
  return state.fundamentals.data?.General.CountryISO === "US";
};

export default selectIsInUS;
