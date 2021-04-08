import { useState } from "react";
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
import useInputQueryParams, { inputQueries } from "./useInputQueryParams";

export const getLowerUpperSliderHalves = (minPoint, midPoint) => {
  const lowerHalfPoint = (midPoint - minPoint) / 2 + minPoint;
  const upperHalfPoint = midPoint - lowerHalfPoint + midPoint;

  return { lowerHalfPoint, upperHalfPoint };
};

export const getSliderValuesFromMinMax = (minPoint, maxPoint) => {
  const length = maxPoint - minPoint;
  const midPoint = length / 2 + minPoint;
  const { lowerHalfPoint, upperHalfPoint } = getLowerUpperSliderHalves(
    minPoint,
    midPoint,
  );

  const data = [minPoint, lowerHalfPoint, midPoint, upperHalfPoint, maxPoint];

  return data;
};

export const getSliderValuesFromMidPoint = (midPoint) => {
  const half = midPoint / 2;
  const minPoint = midPoint - half;
  const maxPoint = midPoint + half;
  const { lowerHalfPoint, upperHalfPoint } = getLowerUpperSliderHalves(
    minPoint,
    midPoint,
  );

  const data = [minPoint, lowerHalfPoint, midPoint, upperHalfPoint, maxPoint];

  return data;
};

export const findType = (inputQueries, name) =>
  inputQueries.find((x) => x.name === name).type;

const getMinMaxRange = (name, inputQueryParams) => {
  const value = inputQueryParams[name];

  return {
    min: value - 40,
    max: value + 40,
  };
};

const useSensitivityAnalysisDataTable = () => {
  const inputQueryParams = useInputQueryParams();
  const cagrMinMax = getMinMaxRange("cagrYearOneToFive", inputQueryParams);
  const ebitMarginMinMax = getMinMaxRange(
    "ebitTargetMarginInYearTen",
    inputQueryParams,
  );

  const [dataTable, setDataTable] = useState(
    [
      {
        label: cagrInYearsOneToFiveLabel,
        name: "cagrYearOneToFive",
        step: 1,
        marks: [
          { value: cagrMinMax.min, label: cagrMinMax.min },
          {
            value: inputQueryParams.cagrYearOneToFive,
            label: inputQueryParams.cagrYearOneToFive,
          },
          { value: cagrMinMax.max, label: cagrMinMax.max },
        ],
        ...cagrMinMax,
      },
      {
        label: ebitTargetMarginInYearTenLabel,
        name: "ebitTargetMarginInYearTen",
        step: 1,
        marks: [
          {
            value: ebitMarginMinMax.min,
            label: ebitMarginMinMax.min,
          },
          {
            value: inputQueryParams.ebitTargetMarginInYearTen,
            label: inputQueryParams.ebitTargetMarginInYearTen,
          },
          {
            value: ebitMarginMinMax.max,
            label: ebitMarginMinMax.max,
          },
        ],
        ...getMinMaxRange("ebitTargetMarginInYearTen", inputQueryParams),
      },
      {
        label: yearOfConvergenceLabel,
        name: "yearOfConvergence",
        marks: [
          { value: 0, label: "0" },
          { value: 5, label: "5" },
          { value: 10, label: "10" },
        ],
        step: 1,
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
      const name = inputQueryParams[datum.name];
      const extraData = {
        modifier: (value) => value,
      };

      if (type === "percent") {
        extraData.formatter = FormatRawNumberToPercent;
        extraData.modifier = (value) => value * 100;
      }

      if (type === "year" || type === "number") {
        extraData.formatter = TableNumberFormatter;
      }

      return {
        ...datum,
        ...extraData,
        data: getSliderValuesFromMidPoint(name),
      };
    }),
  );

  return [dataTable, setDataTable];
};

export default useSensitivityAnalysisDataTable;
