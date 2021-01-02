import industryAveragesGlobalJson from "../data/industryAveragesGlobal.json";
import industryAveragesUSJson from "../data/industryAveragesUS.json";

const getConvertedIndustryAverages = (industryAverages) => {
  return industryAverages.map((industryAverage) => {
    const industryAverageObject = {};

    Object.keys(industryAverage).forEach((key) => {
      const value = industryAverage[key];

      if (typeof value === "string") {
        const parsedNumber = parseFloat(value);

        industryAverageObject[key] = isNaN(parsedNumber)
          ? value
          : parsedNumber / 100;
      } else {
        industryAverageObject[key] = value;
      }
    });

    return industryAverageObject;
  });
};

const industryAverage = {
  global: getConvertedIndustryAverages(industryAveragesGlobalJson),
  US: getConvertedIndustryAverages(industryAveragesUSJson),
};

export default industryAverage;
