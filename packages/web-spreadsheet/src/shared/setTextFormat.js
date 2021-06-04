import { isNil } from "lodash";

const setTextFormat = (text, format, formats, finishedEditing) => {
  let newText = text;
  const editRender = format ? formats[format]?.editRender : null;

  if (!isNil(newText) && editRender) {
    newText = editRender(newText, finishedEditing);
  }

  return newText;
};

export default setTextFormat;
