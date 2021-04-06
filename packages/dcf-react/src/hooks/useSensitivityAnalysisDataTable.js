import isNil from "lodash/isNil";
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

const useSensitivityAnalysisDataTable = () => {
  const inputQueryParams = useInputQueryParams();
  const [dataTable, setDataTable] = useState(
    [
      {
        label: cagrInYearsOneToFiveLabel,
        name: "cagrYearOneToFive",
        checked: !isNil(inputQueryParams.cagrYearOneToFive),
        step: 1,
        min: -50,
        max: 50,
      },
      {
        label: ebitTargetMarginInYearTenLabel,
        name: "ebitTargetMarginInYearTen",
        checked: !isNil(inputQueryParams.ebitTargetMarginInYearTen),
        step: 1,
        min: -50,
        max: 50,
      },
      {
        label: yearOfConvergenceLabel,
        name: "yearOfConvergence",
        step: 1,
        min: -50,
        max: 50,
      },
      {
        label: salesToCapitalRatioLabel,
        name: "salesToCapitalRatio",
        step: 1,
        min: -50,
        max: 50,
      },
      {
        label: probabilityOfFailureLabel,
        name: "probabilityOfFailure",
        step: 1,
        min: -50,
        max: 50,
      },
      {
        label: proceedsAsPercentageOfBookValueLabel,
        name: "proceedsAsAPercentageOfBookValue",
        step: 1,
        min: -50,
        max: 50,
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
