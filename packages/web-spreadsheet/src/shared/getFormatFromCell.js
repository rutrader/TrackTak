import { isNil } from "lodash-es";

const getFormatFromCell = (cell, styles) => {
  const styleKey = cell?.style;

  if (!isNil(styleKey) && styles.length) {
    const formatKey = styles[styleKey]?.format;

    return formatKey;
  }
  return null;
};

export default getFormatFromCell;
