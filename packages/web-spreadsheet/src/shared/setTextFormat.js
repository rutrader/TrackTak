import { isNil } from "lodash";

const setTextFormat = (text, format, isDecimal) => {
  let newText = text;

  if (format === "percent" && !isNil(newText)) {
    if (isDecimal && typeof newText === "number") {
      newText = newText * 100;
    }
    newText = newText.toString();

    if (!newText.includes("%") && !isNaN(parseFloat(newText))) {
      newText += "%";
    }
  }

  return newText;
};

export default setTextFormat;
