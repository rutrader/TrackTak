import { Element, h } from "./element";
import { cssPrefix } from "../config";

const iconClassPrefix = `${cssPrefix}-icon-img`;

const getIcon = (name) => {
  const element = new Element("div", `${cssPrefix}-icon`);
  const iconNameEl = h("div", `${iconClassPrefix} ${name}`);

  element.child(iconNameEl);

  const setName = (name) => {
    iconNameEl.className(`${iconClassPrefix} ${name}`);
  };

  return {
    element,
    setName,
  };
};
export default getIcon;
