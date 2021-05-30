import { isNil } from "lodash-es";
import { useEffect, useState } from "react";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import {
  probabilityOfFailureLabel,
  proceedsAsPercentageOfBookValueLabel,
} from "../components/OptionalInputs";
import { TableNumberFormatter } from "../components/TableFormatters";
import {
  cagrInYears_1_5Label,
  ebitTargetMarginInYear_10Label,
  salesToCapitalRatioLabel,
  yearOfConvergenceLabel,
} from "../components/ValueDrivingInputs";
import { allInputNameTypeMappings } from "../discountedCashFlow/scopeNameTypeMapping";
import roundDecimal from "../shared/roundDecimal";
import useInputQueryParams from "./useInputQueryParams";

export const getLowerUpperSliderHalves = (minPoint, midPoint) => {
  const lowerHalfPoint = (midPoint - minPoint) / 2 + minPoint;
  const upperHalfPoint = midPoint - lowerHalfPoint + midPoint;

  return { lowerHalfPoint, upperHalfPoint };
};

const fixData = (data) => {
  return data.map((datum) => roundDecimal(datum, 2));
};

export const getSliderValuesFromMinMax = (minPoint, maxPoint) => {
  const length = maxPoint - minPoint;
  const midPoint = length / 2 + minPoint;
  const { lowerHalfPoint, upperHalfPoint } = getLowerUpperSliderHalves(
    minPoint,
    midPoint,
  );

  const data = fixData([
    minPoint,
    lowerHalfPoint,
    midPoint,
    upperHalfPoint,
    maxPoint,
  ]);

  return data;
};

export const getSliderValuesFromMidPoint = (midPoint) => {
  const half = midPoint / 2;
  const minPoint = half;
  const maxPoint = midPoint + half;
  const { lowerHalfPoint, upperHalfPoint } = getLowerUpperSliderHalves(
    minPoint,
    midPoint,
  );

  const data = fixData([
    minPoint,
    lowerHalfPoint,
    midPoint,
    upperHalfPoint,
    maxPoint,
  ]);

  return data;
};

const getDynamicMinMaxRange = (name, inputQueryParams) => {
  if (isNil(inputQueryParams[name])) {
    return {
      min: -1,
      max: 1,
    };
  }

  const value = inputQueryParams[name] * 100;
  const quarter = value / 4;
  const half = value / 2;

  return {
    min: roundDecimal(quarter - 5, 2),
    max: roundDecimal(value + half + half + 5, 2),
  };
};

const getDynamicStep = (name, inputQueryParams) => {
  if (isNil(inputQueryParams[name])) {
    return 1;
  }

  const value = inputQueryParams[name];

  if ((value <= 0.1 && value >= 0) || (value >= -0.1 && value <= 0)) {
    return 0.5;
  }

  return 1;
};

const useSensitivityAnalysisDataTable = () => {
  const inputQueryParams = useInputQueryParams();
  const [dataTable, setDataTable] = useState([]);

  useEffect(() => {
    const cagrMinMax = getDynamicMinMaxRange(
      "cagrInYears_1_5",
      inputQueryParams,
    );
    const ebitMarginMinMax = getDynamicMinMaxRange(
      "ebitTargetMarginInYear_10",
      inputQueryParams,
    );

    const cagrInYears_1_5Value = inputQueryParams.cagrInYears_1_5 * 100;
    const ebitTargetMarginInYear_10Value =
      inputQueryParams.ebitTargetMarginInYear_10 * 100;

    setDataTable(
      [
        {
          label: cagrInYears_1_5Label,
          name: "cagrInYears_1_5",
          step: getDynamicStep("cagrInYears_1_5", inputQueryParams),
          marks: [
            { value: cagrMinMax.min, label: cagrMinMax.min },
            {
              value: cagrInYears_1_5Value,
              label: cagrInYears_1_5Value,
            },
            { value: cagrMinMax.max, label: cagrMinMax.max },
          ],
          ...cagrMinMax,
        },
        {
          label: ebitTargetMarginInYear_10Label,
          name: "ebitTargetMarginInYear_10",
          step: getDynamicStep("ebitTargetMarginInYear_10", inputQueryParams),
          marks: [
            {
              value: ebitMarginMinMax.min,
              label: ebitMarginMinMax.min,
            },
            {
              value: ebitTargetMarginInYear_10Value,
              label: ebitTargetMarginInYear_10Value,
            },
            {
              value: ebitMarginMinMax.max,
              label: ebitMarginMinMax.max,
            },
          ],
          ...ebitMarginMinMax,
        },
        {
          label: yearOfConvergenceLabel,
          name: "yearOfConvergence",
          marks: [
            { value: 0, label: "0" },
            { value: 5, label: "5" },
            { value: 10, label: "10" },
          ],
          step: 0.5,
          min: 0,
          max: 10,
        },
        {
          label: salesToCapitalRatioLabel,
          name: "salesToCapitalRatio",
          step: 0.1,
          min: -5,
          max: 7,
          marks: [
            { value: -5, label: "-5" },
            { value: 1, label: "1" },
            { value: 7, label: "7" },
          ],
        },
        {
          label: probabilityOfFailureLabel,
          name: "probabilityOfFailure",
          step: 1,
          min: 0,
          max: 100,
          marks: [
            { value: 0, label: "0" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
          ],
        },
        {
          label: proceedsAsPercentageOfBookValueLabel,
          name: "proceedsAsAPercentageOfBookValue",
          step: 1,
          min: 0,
          max: 100,
          marks: [
            { value: 0, label: "0" },
            { value: 50, label: "50" },
            { value: 100, label: "100" },
          ],
        },
      ].map((datum) => {
        const type = allInputNameTypeMappings[datum.name];
        const midPoint = inputQueryParams[datum.name];
        const extraData = {
          modifier: (value) => value,
        };

        if (type === "percent") {
          extraData.formatter = FormatRawNumberToPercent;
          extraData.modifier = (value) => {
            return isNil(value) ? value : roundDecimal(value * 100, 2);
          };
        }

        if (type === "year" || type === "number") {
          extraData.formatter = TableNumberFormatter;
        }

        return {
          ...datum,
          ...extraData,
          data: isNil(midPoint) ? [] : getSliderValuesFromMidPoint(midPoint),
        };
      }),
    );
  }, [inputQueryParams]);

  return [dataTable, setDataTable];
};

export default useSensitivityAnalysisDataTable;
