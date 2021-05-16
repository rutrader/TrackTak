import { cssPrefix } from "../config";
import { t } from "../locale/locale";
import { Element } from "./element";

const getButton = (title, type = "") => {
  const element = new Element("div", `${cssPrefix}-button ${type}`);

  element.child(t(`button.${title}`));

  return {
    element,
  };
};

export default getButton;
