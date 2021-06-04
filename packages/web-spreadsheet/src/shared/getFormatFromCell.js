import { isNil } from "lodash";

const getFormatFromCell = (cell, getData) => {
  const styleKey = cell?.style;
  const styles = getData()?.styles;

  if (!isNil(styleKey) && styles) {
    const formatKey = styles[styleKey].format;

    return formatKey;
  }
  return null;
};

export default getFormatFromCell;
