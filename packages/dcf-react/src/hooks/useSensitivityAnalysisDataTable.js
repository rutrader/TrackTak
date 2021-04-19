import isNil from "lodash/isNil";
import { useEffect, useState } from "react";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import {
  probabilityOfFailureLabel,
  proceedsAsPercentageOfBookValueLabel,
} from "../components/OptionalInputs";
import { TableNumberFormatter } from "../components/TableFormatters";
import {
  cagrInYearsOneToFiveLabel,
  ebitTargetMarginInYearTenLabel,
  salesToCapitalRatioLabel,
  yearOfConvergenceLabel,
} from "../components/ValueDrivingInputs";
import roundDecimal from "../shared/roundDecimal";
import useInputQueryParams, { inputQueries } from "./useInputQueryParams";

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

export const findType = (inputQueries, name) =>
  inputQueries.find((x) => x.name === name).type;

const getDynamicMinMaxRange = (name, inputQueryParams) => {
  if (isNil(inputQueryParams[name])) {
    return {
      min: 0,
      max: 0,
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
      "cagrYearOneToFive",
      inputQueryParams,
    );
    const ebitMarginMinMax = getDynamicMinMaxRange(
      "ebitTargetMarginInYearTen",
      inputQueryParams,
    );

    const cagrYearOneToFiveValue = inputQueryParams.cagrYearOneToFive * 100;
    const ebitTargetMarginInYearTenValue =
      inputQueryParams.ebitTargetMarginInYearTen * 100;

    setDataTable(
      [
        {
          label: cagrInYearsOneToFiveLabel,
          name: "cagrYearOneToFive",
          step: getDynamicStep("cagrYearOneToFive", inputQueryParams),
          marks: [
            { value: cagrMinMax.min, label: cagrMinMax.min },
            {
              value: cagrYearOneToFiveValue,
              label: cagrYearOneToFiveValue,
            },
            { value: cagrMinMax.max, label: cagrMinMax.max },
          ],
          ...cagrMinMax,
        },
        {
          label: ebitTargetMarginInYearTenLabel,
          name: "ebitTargetMarginInYearTen",
          step: getDynamicStep("ebitTargetMarginInYearTen", inputQueryParams),
          marks: [
            {
              value: ebitMarginMinMax.min,
              label: ebitMarginMinMax.min,
            },
            {
              value: ebitTargetMarginInYearTenValue,
              label: ebitTargetMarginInYearTenValue,
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
        const type = findType(inputQueries, datum.name);
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