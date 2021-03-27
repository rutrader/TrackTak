import { isSSR } from "@tracktak/dcf-react";

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

  const item = localStorage.getItem(key);

  if (item === "true") return true;
  if (item === "false") return false;

  return item;
};
