/* global window */

import Align from "./align";
import Valign from "./valign";
import Autofilter, { getAutofilter } from "./autofilter";
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
import Formula, { getFormula } from "./formula";
import Freeze, { getFreeze } from "./freeze";
import Merge, { getMerge } from "./merge";
import Redo, { getRedo } from "./redo";
import Undo, { getUndo } from "./undo";
import Print, { getPrint } from "./print";
import Textwrap, { getTextWrap } from "./textwrap";
import More, { getMore } from "./more";

import { h } from "../element";
import { cssPrefix } from "../../config";
import { bind } from "../event";
import getAlign from "./align";
import getVAlign from "./valign";
import spreadsheetEvents from "../../core/spreadsheetEvents";
import { makeIconItem } from "./makeIconItem";
import { makeToggleItem } from "./makeToggleItem";
import { getDropdownItem } from "./getDropdownItem";
import makeDropdownBorder from "../dropdown_border";
import { makeDropdownColor } from "../dropdown_color";
import { makeDropdownFontSize } from "../dropdown_fontsize";
import { makeDropdownFont } from "../dropdown_font";
import { makeDropdownFormat } from "../dropdown_format";
import { makeDropdownFormula } from "../dropdown_formula";
import { makeDropdownAlign } from "../dropdown_align";

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
  moreEl.dropdownMore.moreBtns.html("").children(...list2);
  moreEl.dropdownMore.dropdown.contentEl.css("width", `${sumWidth2}px`);
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

    const getIconItem = makeIconItem(eventEmitter);
    const getToggleItem = makeToggleItem(eventEmitter);

    this.items = [
      [
        (this.undoEl = getIconItem("undo", "Ctrl+Z")),
        (this.redoEl = getIconItem("redo", "Ctrl+Y")),
        getIconItem("print", "Ctrl+P"),
        (this.paintformatEl = getToggleItem("paintformat")),
        getIconItem("clearformat"),
      ],
      buildDivider(),
      [
        (this.formatEl = getDropdownItem(
          "format",
          makeDropdownFormat(formats, eventEmitter),
        )),
      ],
      buildDivider(),
      [
        (this.fontEl = getDropdownItem(
          "font-name",
          makeDropdownFont(eventEmitter),
        )),
        (this.fontSizeEl = getDropdownItem(
          "font-size",
          makeDropdownFontSize(eventEmitter),
        )),
      ],
      buildDivider(),
      [
        (this.boldEl = getToggleItem("font-bold", "Ctrl+B")),
        (this.italicEl = getToggleItem("font-italic", "Ctrl+I")),
        (this.underlineEl = getToggleItem("underline", "Ctrl+U")),
        (this.strikeEl = getToggleItem("strike", "Ctrl+S")),
        (this.textColorEl = getDropdownItem(
          "color",
          makeDropdownColor("color", style.color, eventEmitter),
        )),
      ],
      buildDivider(),
      [
        (this.fillColorEl = getDropdownItem(
          "bgcolor",
          makeDropdownColor("bgcolor", style.bgcolor, eventEmitter),
        )),
        getDropdownItem("border", makeDropdownBorder(eventEmitter)),
        (this.mergeEl = getToggleItem("merge")),
      ],
      buildDivider(),
      [
        (this.alignEl = getDropdownItem(
          "align",
          makeDropdownAlign(
            ["left", "center", "right"],
            style.align,
            eventEmitter,
          ),
        )),
        (this.valignEl = getDropdownItem(
          "valign",
          makeDropdownAlign(
            ["top", "middle", "bottom"],
            style.valign,
            eventEmitter,
          ),
        )),
        (this.textwrapEl = getToggleItem("textwrap")),
      ],
      buildDivider(),
      [
        (this.freezeEl = getToggleItem("freeze")),
        (this.autofilterEl = getToggleItem("autofilter")),
        getDropdownItem("formula", makeDropdownFormula(eventEmitter)),
        (this.moreEl = getMore()),
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
    this.mergeEl.item.el.disabled(!data.selector.multiple());
    this.autofilterEl.toggleItem.setActive(!data.canAutofilter());
    // console.log('selectedCell:', style, cell);
    const { font, format } = style;
    this.formatEl.dropdown.setTitle(format);
    this.fontEl.dropdown.dropdown.setTitle(font.name);
    this.fontSizeEl.dropdown.dropdown.setTitle(font.size);
    this.boldEl.toggleItem.setActive(font.bold);
    this.italicEl.toggleItem.setActive(font.italic);
    this.underlineEl.toggleItem.setActive(style.underline);
    this.strikeEl.toggleItem.setActive(style.strike);
    this.textColorEl.dropdown.setTitle(style.color);
    this.fillColorEl.dropdown.setTitle(style.bgcolor);
    this.alignEl.dropdown.setTitle(style.align);
    this.valignEl.dropdown.setTitle(style.valign);
    this.textwrapEl.toggleItem.setActive(style.textwrap);
    // console.log('freeze is Active:', data.freezeIsActive());
    this.freezeEl.toggleItem.setActive(data.freezeIsActive());
  }
}
