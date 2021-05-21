import { cssPrefix } from "../config";
import { t } from "../locale/locale";
import { Element } from "./element";

const getButton = (title, type = "") => {
  const el = new Element("div", `${cssPrefix}-button ${type}`);

  el.child(t(`button.${title}`));

  return {
    el,
  };
};

export default getButton;
