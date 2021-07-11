import { tf } from "../locale/locale";

 const menuItems = [
  { key: "comment", title: tf("contextmenu.comment"), label: "Ctrl+Alt+M" },
  { key: "copy", title: tf("contextmenu.copy"), label: "Ctrl+C" },
  { key: "cut", title: tf("contextmenu.cut"), label: "Ctrl+X" },
  { key: "paste", title: tf("contextmenu.paste"), label: "Ctrl+V" },
  {
    key: "pasteValue",
    title: tf("contextmenu.pasteValue"),
    label: "Ctrl+Shift+V",
  },
  {
    key: "pasteFormat",
    title: tf("contextmenu.pasteFormat"),
    label: "Ctrl+Alt+V",
  },
  { key: "divider" },
  { key: "insertRow", title: tf("contextmenu.insertRow") },
  { key: "insertColumn", title: tf("contextmenu.insertColumn") },
  { key: "divider" },
  { key: "deleteRow", title: tf("contextmenu.deleteRow") },
  { key: "deleteColumn", title: tf("contextmenu.deleteColumn") },
  { key: "deleteCellText", title: tf("contextmenu.deleteCellText") },
  { key: "hide", title: tf("contextmenu.hide") },
  { key: "divider" },
  { key: "validation", title: tf("contextmenu.validation") },
  { key: "divider" },
  { key: "cellPrintable", title: tf("contextmenu.cellprintable") },
  { key: "cellNonPrintable", title: tf("contextmenu.cellnonprintable") },
  { key: "divider" },
  { key: "cellEditable", title: tf("contextmenu.celleditable") },
  { key: "cellNonEditable", title: tf("contextmenu.cellnoneditable") },
];

export default menuItems;
