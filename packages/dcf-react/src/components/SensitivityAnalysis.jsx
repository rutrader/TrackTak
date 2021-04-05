import React, { useState } from "react";
import { Box, FormGroup, Typography } from "@material-ui/core";
import {
  cagrInYearsOneToFiveLabel,
  ebitTargetMarginInYearTenLabel,
  yearOfConvergenceLabel,
  salesToCapitalRatioLabel,
} from "../components/ValueDrivingInputs";
import {
  probabilityOfFailureLabel,
  proceedsAsPercentageOfBookValueLabel,
} from "../components/OptionalInputs";
import TTTable from "./TTTable";
import FormGroupSlider from "./FormGroupSlider";
import { makeStyles } from "@material-ui/core/styles";
import { isNil } from "lodash";
import FormatRawNumberToPercent from "./FormatRawNumberToPercent";
import { TableNumberFormatter } from "./TableFormatters";
import useInputQueryParams, {
  inputQueries,
} from "../hooks/useInputQueryParams";
import calculateDCFModel from "../shared/calculateDCFModel";
import { useSelector } from "react-redux";
import selectCells from "../selectors/dcfSelectors/selectCells";
import selectScope from "../selectors/dcfSelectors/selectScope";
import FormatRawNumberToCurrency from "./FormatRawNumberToCurrency";

const useStyles = makeStyles((theme) => ({
  slider: {
    maxWidth: 400,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: -50,
    label: "-50",
  },
  {
    value: 0,
    label: "0",
  },
  {
    value: 50,
    label: "50",
  },
];

const valueText = (value) => {
  return `${value}`;
};

const getLowerUpperSliderHalves = (minPoint, midPoint) => {
  const lowerHalfPoint = (midPoint - minPoint) / 2 + minPoint;
  const upperHalfPoint = midPoint - lowerHalfPoint + midPoint;

  return { lowerHalfPoint, upperHalfPoint };
};

const getSliderValuesFromMinMax = (minPoint, maxPoint) => {
  const length = maxPoint - minPoint;
  const midPoint = length / 2 + minPoint;
  const { lowerHalfPoint, upperHalfPoint } = getLowerUpperSliderHalves(
    minPoint,
    midPoint,
  );

  const data = [minPoint, lowerHalfPoint, midPoint, upperHalfPoint, maxPoint];

  return data;
};

const getSliderValuesFromMidPoint = (midPoint) => {
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

const findType = (inputQueries, name) =>
  inputQueries.find((x) => x.name === name).type;

const SensitivityAnalysis = () => {
  const classes = useStyles();
  const inputQueryParams = useInputQueryParams();
  const cells = useSelector(selectCells);
  const scope = useSelector(selectScope);
  const [dataTable, setDataTable] = useState(
    [
      {
        label: cagrInYearsOneToFiveLabel,
        value: "cagrYearOneToFive",
        checked: !isNil(inputQueryParams.cagrYearOneToFive),
        step: 1,
        min: -50,
        max: 50,
      },
      {
        label: ebitTargetMarginInYearTenLabel,
        value: "ebitTargetMarginInYearTen",
        checked: !isNil(inputQueryParams.ebitTargetMarginInYearTen),
        step: 1,
        min: -50,
        max: 50,
      },
      {
        label: yearOfConvergenceLabel,
        value: "yearOfConvergence",
        step: 1,
        min: -50,
        max: 50,
      },
      {
        label: salesToCapitalRatioLabel,
        value: "salesToCapitalRatio",
        step: 1,
        min: -50,
        max: 50,
      },
      {
        label: probabilityOfFailureLabel,
        value: "probabilityOfFailure",
        step: 1,
        min: -50,
        max: 50,
      },
      {
        label: proceedsAsPercentageOfBookValueLabel,
        value: "proceedsAsAPercentageOfBookValue",
        step: 1,
        min: -50,
        max: 50,
      },
    ].map((datum) => {
      const type = findType(inputQueries, datum.value);
      const value = inputQueryParams[datum.value];
      const extraData = {};

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
        data: getSliderValuesFromMidPoint(value),
      };
    }),
  );

  const onSliderChange = (value, sliderValue) => {
    const type = findType(inputQueries, value);

    let minPoint = sliderValue[0];
    let maxPoint = sliderValue[1];

    if (type === "percent") {
      minPoint /= 100;
      maxPoint /= 100;
    }

    const newDataTable = dataTable.map((datum) => {
      if (value === datum.value) {
        return {
          ...datum,
          data: getSliderValuesFromMinMax(minPoint, maxPoint),
        };
      }
      return datum;
    });

    setDataTable(newDataTable);
  };

  const setChecked = (value, checked) => {
    const newDataTable = dataTable.map((datum) => {
      if (value === datum.value) {
        return {
          ...datum,
          checked,
        };
      }

      return datum;
    });

    setDataTable(newDataTable);
  };

  const columns = [
    {
      Header: "",
      accessor: "dataField",
    },
  ];

  const newDataTable = [...dataTable];
  const checkedValues = newDataTable.filter((x) => x.checked);
  const xElement = checkedValues.length === 2 ? checkedValues[0] : null;
  const yElement = checkedValues.length === 2 ? checkedValues[1] : null;

  if (yElement) {
    columns.push(
      ...yElement.data.map((value, i) => {
        const Formatter = yElement.formatter;

        return {
          Header: <Formatter value={value} />,
          accessor: i.toString(),
        };
      }),
    );
  }

  const getData = () => {
    const doesScopeExist =
      !isNil(scope[xElement.value]) && !isNil(scope[yElement.value]);

    if (!doesScopeExist) return [];

    const XFormatter = xElement.formatter;

    const data = xElement.data.map((xElementValue) => {
      const row = {
        dataField: <XFormatter value={xElementValue} />,
      };

      yElement.data.forEach((yElementValue, i) => {
        const currentScope = {
          [xElement.value]: xElementValue,
          [yElement.value]: yElementValue,
        };
        const model = calculateDCFModel(cells, currentScope, scope);

        // B36 => Estimated Value Per Share
        row[i.toString()] = (
          <FormatRawNumberToCurrency value={model.B36.value} />
        );
      });

      return row;
    });

    return data;
  };

  return (
    <Box sx={{ overflow: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Sensitivity Analysis
      </Typography>
      {xElement && yElement && (
        <Box>
          <Typography
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            variant="h6"
            component="div"
          >
            {yElement.label}
          </Typography>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" component="div">
              {xElement.label}
            </Typography>
            <TTTable sx={{ flex: 1 }} columns={columns} data={getData()} />
          </Box>
        </Box>
      )}
      <FormGroup column className={classes.slider}>
        {dataTable.map((datum) => (
          <FormGroupSlider
            {...datum}
            marks={marks}
            setChecked={setChecked}
            onChange={onSliderChange}
            valueText={valueText}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default SensitivityAnalysis;
