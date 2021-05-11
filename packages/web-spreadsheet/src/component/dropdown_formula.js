import Dropdown from "./dropdown";
import Icon from "./icon";
import { h } from "./element";
import { cssPrefix } from "../config";

import { HyperFormula } from "hyperformula";

export default class DropdownFormula extends Dropdown {
  constructor() {
    const nformulas = HyperFormula.getRegisteredFunctionNames("enGB").map(
      (it) =>
        h("div", `${cssPrefix}-item`)
          .on("click", () => {
            this.hide();
            this.change(it);
          })
          .child(it),
    );
    super(new Icon("formula"), "180px", true, "bottom-left", ...nformulas);
  }
}
