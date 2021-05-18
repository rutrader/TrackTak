import { Element, h } from "./element";
import { bindClickoutside, unbindClickoutside } from "./event";
import { cssPrefix } from "../config";

export const getDropdown = (
  title,
  width,
  showArrow,
  placement,
  ...children
) => {
  const el = new Element("div", `${cssPrefix}-dropdown ${placement}`);

  let _title = title;

  if (typeof _title === "string") {
    _title = h("div", `${cssPrefix}-dropdown-title`).child(_title);
  } else if (showArrow) {
    _title.el.addClass("arrow-left");
  }
  const contentEl = h("div", `${cssPrefix}-dropdown-content`)
    .css("width", width)
    .hide();

  const setContentChildren = (...children) => {
    contentEl.html("");
    if (children.length > 0) {
      contentEl.children(...children);
    }
  };

  const setTitle = (title) => {
    _title.html(title);
    hide();
  };

  const show = () => {
    contentEl.show();
    el.parent().active();
    bindClickoutside(el.parent(), () => {
      hide();
    });
  };

  const hide = () => {
    el.parent().active(false);
    contentEl.hide();
    unbindClickoutside(el.parent());
  };

  setContentChildren(...children);

  const headerEl = h("div", `${cssPrefix}-dropdown-header`);

  headerEl
    .on("click", () => {
      if (contentEl.css("display") !== "block") {
        show();
      } else {
        hide();
      }
    })
    .children(
      _title.el,
      showArrow
        ? h("div", `${cssPrefix}-icon arrow-right`).child(
            h("div", `${cssPrefix}-icon-img arrow-down`),
          )
        : "",
    );

  el.children(headerEl, contentEl);

  return {
    title: _title,
    el,
    contentEl,
    headerEl,
    setContentChildren,
    setTitle,
    show,
    hide,
  };
};
export default class Dropdown extends Element {
  constructor(title, width, showArrow, placement, ...children) {
    super("div", `${cssPrefix}-dropdown ${placement}`);
    this.title = title;

    this.change = () => {};
    this.headerClick = () => {};
    if (typeof this.title === "string") {
      this.title = h("div", `${cssPrefix}-dropdown-title`).child(this.title);
    } else if (showArrow) {
      if (this.title.el) {
        this.title.el.addClass("arrow-left");
      } else {
        this.title.addClass("arrow-left");
      }
    }
    this.contentEl = h("div", `${cssPrefix}-dropdown-content`)
      .css("width", width)
      .hide();

    this.setContentChildren(...children);

    this.headerEl = h("div", `${cssPrefix}-dropdown-header`);
    this.headerEl
      .on("click", () => {
        if (this.contentEl.css("display") !== "block") {
          this.show();
        } else {
          this.hide();
        }
      })
      .children(
        this.title,
        showArrow
          ? h("div", `${cssPrefix}-icon arrow-right`).child(
              h("div", `${cssPrefix}-icon-img arrow-down`),
            )
          : "",
      );
    this.children(this.headerEl, this.contentEl);
  }

  setContentChildren(...children) {
    this.contentEl.html("");
    if (children.length > 0) {
      this.contentEl.children(...children);
    }
  }

  setTitle(title) {
    this.title.html(title);
    this.hide();
  }

  show() {
    const { contentEl } = this;
    contentEl.show();
    this.parent().active();
    bindClickoutside(this.parent(), () => {
      this.hide();
    });
  }

  hide() {
    this.parent().active(false);
    this.contentEl.hide();
    unbindClickoutside(this.parent());
  }
}
