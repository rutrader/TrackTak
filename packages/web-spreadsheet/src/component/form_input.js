import { h } from "./element";
import { cssPrefix } from "../config";

export const getFormInput = (width, hintText) => {
  const el = h("div", `${cssPrefix}-form-input`);
  const input = h("input", "")
    .css("width", width)
    .attr("placeholder", hintText);

  el.child(input);

  const focus = () => {
    setTimeout(() => {
      input.el.focus();
    }, 10);
  };

  const hint = (v) => {
    input.attr("placeholder", v);
  };

  const val = (v) => {
    return input.val(v);
  };

  return {
    el,
    input,
    focus,
    hint,
    val,
  };
};

export default class FormInput {
  constructor(width, hint) {
    this.vchange = () => {};
    this.el = h("div", `${cssPrefix}-form-input`);
    this.input = h("input", "")
      .css("width", width)
      .on("input", (evt) => {
        this.vchange(evt);
      })
      .attr("placeholder", hint);
    this.el.child(this.input);
  }

  focus() {
    setTimeout(() => {
      this.input.el.focus();
    }, 10);
  }

  hint(v) {
    this.input.attr("placeholder", v);
  }

  val(v) {
    return this.input.val(v);
  }
}
