import { isNil } from "lodash-es";
import getDefaultFormatFromText from "./getDefaultFormatFromText";

const getFormatFromCell = (text, cell, styles) => {
  const styleKey = cell?.style;

  if (!isNil(styleKey) && styles.length) {
    const formatKey = styles[styleKey]?.format;

    return formatKey;
  }

  if (!text) return null;

  return getDefaultFormatFromText(text);
};

export default getFormatFromCell;
