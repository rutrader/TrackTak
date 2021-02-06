import selectQueryParams from "./selectQueryParams";

const selectIsIframe = (state) => {
  const isIframe = selectQueryParams(state).isIframe;

  return isIframe === "true";
};

export default selectIsIframe;
