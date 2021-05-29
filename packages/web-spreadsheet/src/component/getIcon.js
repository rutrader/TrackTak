import { Element, h } from "./element";
import { cssPrefix } from "../config";

const getIcon = (name, iconClassPrefix = `${cssPrefix}-icon-img`) => {
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
