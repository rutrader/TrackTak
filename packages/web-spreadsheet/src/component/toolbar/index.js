/* global window */

import Align from "./align";
import Valign from "./valign";
import Autofilter from "./autofilter";
import Bold, { getBold } from "./bold";
import Italic, { getItalic } from "./italic";
import Strike, { getStrike } from "./strike";
import Underline, { getUnderline } from "./underline";
import Border, { getBorder } from "./border";
import Clearformat, { getClearFormat } from "./clearformat";
import Paintformat, { getPaintFormat } from "./paintformat";
import TextColor, { getTextColor } from "./text_color";
import FillColor, { getFillColor } from "./fill_color";
import FontSize, { getFontSize } from "./font_size";
import Font, { getFont } from "./font";
import Format, { getFormat } from "./format";
import Formula from "./formula";
import Freeze from "./freeze";
import Merge, { getMerge } from "./merge";
import Redo, { getRedo } from "./redo";
import Undo, { getUndo } from "./undo";
import Print, { getPrint } from "./print";
import Textwrap, { getTextWrap } from "./textwrap";
import More from "./more";

import { h } from "../element";
import { cssPrefix } from "../../config";
import { bind } from "../event";
import getAlign from "./align";
import getVAlign from "./valign";
import spreadsheetEvents from "../../core/spreadsheetEvents";

function buildDivider() {
  return h("div", `${cssPrefix}-toolbar-divider`);
}

function initBtns2() {
  this.btns2 = [];
  this.items.forEach((it) => {
    if (Array.isArray(it)) {
      it.forEach(({ el, item }) => {
        let newEl = el ? el : item.el;
        const rect = newEl.box();
        const { marginLeft, marginRight } = newEl.computedStyle();
        this.btns2.push([
          newEl,
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
  constructor(data, widthFn, formats, eventEmitter, isHide = false) {
    this.data = data;
    this.eventEmitter = eventEmitter;
    this.change = () => {};
    this.widthFn = widthFn;
    this.isHide = isHide;
    const style = data.defaultStyle();
    this.items = [
      [
        (this.undoEl = getUndo(eventEmitter)),
        (this.redoEl = getRedo(eventEmitter)),
        getPrint(eventEmitter),
        (this.paintformatEl = getPaintFormat(eventEmitter)),
        getClearFormat(eventEmitter),
      ],
      buildDivider(),
      [(this.formatEl = getFormat(formats, eventEmitter))],
      buildDivider(),
      [
        (this.fontEl = getFont(eventEmitter)),
        (this.fontSizeEl = getFontSize(eventEmitter)),
      ],
      buildDivider(),
      [
        (this.boldEl = getBold(eventEmitter)),
        (this.italicEl = getItalic(eventEmitter)),
        (this.underlineEl = getUnderline(eventEmitter)),
        (this.strikeEl = getStrike(eventEmitter)),
        (this.textColorEl = getTextColor(style.color, eventEmitter)),
      ],
      buildDivider(),
      [
        (this.fillColorEl = getFillColor(style.bgcolor, eventEmitter)),
        getBorder(eventEmitter),
        (this.mergeEl = getMerge(eventEmitter)),
      ],
      buildDivider(),
      [
        (this.alignEl = getAlign(style.align, eventEmitter)),
        (this.valignEl = getVAlign(style.valign, eventEmitter)),
        (this.textwrapEl = getTextWrap(eventEmitter)),
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
          if (i.el) {
            this.btns.child(i.el);
            i.change = (...args) => {
              this.change(...args);
            };
          } else {
            this.btns.child(i.item.el);
          }
        });
      } else {
        if (it.el) {
          this.btns.child(it.el);
        } else {
          this.btns.child(it.item.el);
        }
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
    return this.paintformatEl.toggleItem.active();
  }

  paintformatToggle() {
    this.paintformatEl.toggleItem.toggle();
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
    this.undoEl.iconItem.setDisabled(!data.canUndo());
    this.redoEl.iconItem.setDisabled(!data.canRedo());
    this.mergeEl.toggleItem.setActive(data.canUnmerge());
    this.mergeEl.setDisabled(!data.selector.multiple());
    this.autofilterEl.setState(!data.canAutofilter());
    // console.log('selectedCell:', style, cell);
    const { font, format } = style;
    this.formatEl.setValue(format);
    this.fontEl.setValue(font.name);
    this.fontSizeEl.setValue(font.size);
    this.boldEl.toggleItem.setActive(font.bold);
    this.italicEl.toggleItem.setActive(font.italic);
    this.underlineEl.toggleItem.setActive(style.underline);
    this.strikeEl.toggleItem.setActive(style.strike);
    this.textColorEl.setValue(style.color);
    this.fillColorEl.setValue(style.bgcolor);
    this.alignEl.setValue(style.align);
    this.valignEl.setValue(style.valign);
    this.textwrapEl.toggleItem.setActive(style.textwrap);
    // console.log('freeze is Active:', data.freezeIsActive());
    this.freezeEl.setState(data.freezeIsActive());
  }
}
