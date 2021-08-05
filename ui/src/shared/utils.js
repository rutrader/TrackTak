export const noop = () => {};

export const trackingFormatDate = "DD/MM/YYYY HH:mm";

export const removeQueryParams = () => {
  window.history.replaceState(
    null,
    "",
    "/" +
      window.location.href
        .substring(window.location.href.lastIndexOf("/") + 1)
        .split("?")[0],
  );
};
