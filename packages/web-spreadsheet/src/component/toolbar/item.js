import { cssPrefix } from "../../config";
import tooltip from "../tooltip";
import { h } from "../element";
import { t } from "../../locale/locale";

export const getItem = (tag) => {
  const tip = t(`toolbar.${tag.replace(/-[a-z]/g, (c) => c[1].toUpperCase())}`);
  const el = h("div", `${cssPrefix}-toolbar-btn`)
    .on("mouseenter", (evt) => {
      tooltip(tip, evt.target);
    })
    .attr("data-tooltip", tip);

  return {
    tip,
    el,
  };
};
