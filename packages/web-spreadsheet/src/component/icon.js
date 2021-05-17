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

export class Icon extends Element {
  constructor(name) {
    super("div", `${cssPrefix}-icon`);
    this.iconNameEl = h("div", `${cssPrefix}-icon-img ${name}`);
    this.child(this.iconNameEl);
  }

  setName(name) {
    this.iconNameEl.className(`${cssPrefix}-icon-img ${name}`);
  }
}
