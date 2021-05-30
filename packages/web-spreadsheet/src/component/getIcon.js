import { Element, h } from "./element";
import { cssPrefix } from "../config";

const iconClassPrefix = `${cssPrefix}-icon-img`;

const getIcon = (name) => {
  const el = new Element("div", `${cssPrefix}-icon`);
  const iconNameEl = h("div", `${iconClassPrefix} ${name}`);

  el.child(iconNameEl);

  const setName = (name) => {
    iconNameEl.className(`${iconClassPrefix} ${name}`);
  };

  return {
    el,
    setName,
  };
};
export default getIcon;
