import isSSR from "./isSSR";

export const setItem = (key, value) => {
  if (isSSR) {
    return;
  }

  localStorage.setItem(key, value);
};

export const getItem = (key) => {
  if (isSSR) {
    return null;
  }

  return localStorage.getItem(key);
};
