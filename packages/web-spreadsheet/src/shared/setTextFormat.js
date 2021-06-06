import { isNil } from "lodash";

const setTextFormat = (text, format, formats, state) => {
  let newText = text;
  const editRender = format ? formats[format]?.editRender : null;

  if (!isNil(newText) && editRender) {
    newText = editRender(newText, state);
  }

  return newText;
};

export default setTextFormat;
