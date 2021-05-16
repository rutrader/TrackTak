/* global window */

import Align from "./align";
import Valign from "./valign";
import Autofilter from "./autofilter";
import Bold from "./bold";
import Italic from "./italic";
import Strike from "./strike";
import Underline from "./underline";
import Border from "./border";
import Clearformat from "./clearformat";
import Paintformat from "./paintformat";
import TextColor from "./text_color";
import FillColor from "./fill_color";
import FontSize from "./font_size";
import Font from "./font";
import Format from "./format";
import Formula from "./formula";
import Freeze from "./freeze";
import Merge from "./merge";
import Redo from "./redo";
import Undo from "./undo";
import Print from "./print";
import Textwrap from "./textwrap";
import More from "./more";

import { h } from "../element";
import { cssPrefix } from "../../config";
import { bind } from "../event";

function buildDivider() {
  return h("div", `${cssPrefix}-toolbar-divider`);
}

function initBtns2() {
  this.btns2 = [];
  this.items.forEach((it) => {
    if (Array.isArray(it)) {
      it.forEach(({ el }) => {
        const rect = el.box();
        const { marginLeft, marginRight } = el.computedStyle();
        this.btns2.push([
          el,
          rect.width + parseInt(marginLeft, 10) + parseInt(marginRight, 10),
        ]);
      });
    } else {
      const rect = it.box();
      const { marginLeft, marginRight } = it.computedStyle();
      this.btns2.push([
        it,
        rect.width + parseInt(marginLeft, 10) + parseInt(marginRight, 10),
      ]);
    }
  });
}

function moreResize() {
  const { el, btns, moreEl, btns2 } = this;
  const { moreBtns, contentEl } = moreEl.dd;
  el.css("width", `${this.widthFn() - 60}px`);
  const elBox = el.box();

  let sumWidth = 160;
  let sumWidth2 = 12;
  const list1 = [];
  const list2 = [];
  btns2.forEach(([it, w], index) => {
    sumWidth += w;
    if (index === btns2.length - 1 || sumWidth < elBox.width) {
      list1.push(it);
    } else {
      sumWidth2 += w;
      list2.push(it);
    }
  });
  btns.html("").children(...list1);
  moreBtns.html("").children(...list2);
  contentEl.css("width", `${sumWidth2}px`);
  if (list2.length > 0) {
    moreEl.show();
  } else {
    moreEl.hide();
  }
}

export default class Toolbar {
  constructor(data, widthFn, formats, isHide = false) {
    this.data = data;
    this.change = () => {};
    this.widthFn = widthFn;
    this.isHide = isHide;
    const style = data.defaultStyle();
    this.items = [
      [
        (this.undoEl = new Undo(formats)),
        (this.redoEl = new Redo(formats)),
        new Print(formats),
        (this.paintformatEl = new Paintformat(formats)),
        (this.clearformatEl = new Clearformat(formats)),
      ],
      buildDivider(),
      [(this.formatEl = new Format(formats))],
      buildDivider(),
      [
        (this.fontEl = new Font(formats)),
        (this.fontSizeEl = new FontSize(formats)),
      ],
      buildDivider(),
      [
        (this.boldEl = new Bold(formats)),
        (this.italicEl = new Italic(formats)),
        (this.underlineEl = new Underline(formats)),
        (this.strikeEl = new Strike(formats)),
        (this.textColorEl = new TextColor(formats, style.color)),
      ],
      buildDivider(),
      [
        (this.fillColorEl = new FillColor(formats, style.bgcolor)),
        (this.borderEl = new Border(formats)),
        (this.mergeEl = new Merge(formats)),
      ],
      buildDivider(),
      [
        (this.alignEl = new Align(formats, style.align)),
        (this.valignEl = new Valign(formats, style.valign)),
        (this.textwrapEl = new Textwrap(formats)),
      ],
      buildDivider(),
      [
        (this.freezeEl = new Freeze(formats)),
        (this.autofilterEl = new Autofilter(formats)),
        (this.formulaEl = new Formula(formats)),
        (this.moreEl = new More(formats)),
      ],
    ];

    this.el = h("div", `${cssPrefix}-toolbar`);
    this.btns = h("div", `${cssPrefix}-toolbar-btns`);

    this.items.forEach((it) => {
      if (Array.isArray(it)) {
        it.forEach((i) => {
          this.btns.child(i.el);
          i.change = (...args) => {
            this.change(...args);
          };
        });
      } else {
        this.btns.child(it.el);
      }
    });

    this.el.child(this.btns);
    if (isHide) {
      this.el.hide();
    } else {
      this.reset();
      setTimeout(() => {
        initBtns2.call(this);
        moreResize.call(this);
      }, 0);
      bind(window, "resize", () => {
        moreResize.call(this);
      });
    }
  }

  paintformatActive() {
    return this.paintformatEl.active();
  }

  paintformatToggle() {
    this.paintformatEl.toggle();
  }

  trigger(type) {
    this[`${type}El`].click();
  }

  resetData(data) {
    this.data = data;
    this.reset();
  }

  reset() {
    if (this.isHide) return;
    const { data } = this;
    const style = data.getSelectedCellStyle();
    // console.log('canUndo:', data.canUndo());
    this.undoEl.setState(!data.canUndo());
    this.redoEl.setState(!data.canRedo());
    this.mergeEl.setState(data.canUnmerge(), !data.selector.multiple());
    this.autofilterEl.setState(!data.canAutofilter());
    // this.mergeEl.disabled();
    // console.log('selectedCell:', style, cell);
    const { font, format } = style;
    this.formatEl.setState(format);
    this.fontEl.setState(font.name);
    this.fontSizeEl.setState(font.size);
    this.boldEl.setState(font.bold);
    this.italicEl.setState(font.italic);
    this.underlineEl.setState(style.underline);
    this.strikeEl.setState(style.strike);
    this.textColorEl.setState(style.color);
    this.fillColorEl.setState(style.bgcolor);
    this.alignEl.setState(style.align);
    this.valignEl.setState(style.valign);
    this.textwrapEl.setState(style.textwrap);
    // console.log('freeze is Active:', data.freezeIsActive());
    this.freezeEl.setState(data.freezeIsActive());
  }
}
