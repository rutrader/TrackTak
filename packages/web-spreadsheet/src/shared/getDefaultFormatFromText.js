import { defaultOptions } from "../core/defaultOptions";

// Google Sheets only handles percents and $ automatically
// it seems. We can add others later
const getDefaultFormatFromText = (text) => {
  if (text?.toString().includes("%")) {
    return defaultOptions.formats.percent.key;
  }

  if (text?.toString().includes("$")) {
    return defaultOptions.formats.percent.key;
  }

  return null;
};

export default getDefaultFormatFromText;