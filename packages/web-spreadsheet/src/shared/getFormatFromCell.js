import { isNil } from "lodash-es";

const getFormatFromCell = (cell, getData) => {
  const styleKey = cell?.style;
  const styles = getData()?.styles;

  if (!isNil(styleKey) && styles.length) {
    const formatKey = styles[styleKey]?.format;

    return formatKey;
  }
  return null;
};

export default getFormatFromCell;
