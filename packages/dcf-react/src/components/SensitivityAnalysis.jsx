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
import useInputQueryParams from "../hooks/useInputQueryParams";
import FormatRawNumberToPercent from "./FormatRawNumberToPercent";
import FormatRawNumber from "./FormatRawNumber";

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

const SensitivityAnalysis = () => {
  const classes = useStyles();
  const inputQueryParams = useInputQueryParams();
  const [sliderValue, setSliderValue] = useState([10, 40]);
  const [dataTable, setDataTable] = useState([
    {
      label: cagrInYearsOneToFiveLabel,
      value: "cagrYearOneToFive",
      checked: !isNil(inputQueryParams.cagrYearOneToFive),
      step: 1,
      min: -50,
      max: 50,
      formatter: FormatRawNumberToPercent,
    },
    {
      label: ebitTargetMarginInYearTenLabel,
      value: "ebitTargetMarginInYearTen",
      checked: !isNil(inputQueryParams.ebitTargetMarginInYearTen),
      step: 1,
      min: -50,
      max: 50,
      formatter: FormatRawNumberToPercent,
    },
    {
      label: yearOfConvergenceLabel,
      value: "yearOfConvergence",
      step: 1,
      min: -50,
      max: 50,
      formatter: FormatRawNumber,
    },
    {
      label: salesToCapitalRatioLabel,
      value: "salesToCapitalRatio",
      step: 1,
      min: -50,
      max: 50,
      formatter: FormatRawNumber,
    },
    {
      label: probabilityOfFailureLabel,
      value: "probabilityOfFailure",
      step: 1,
      min: -50,
      max: 50,
      formatter: FormatRawNumberToPercent,
    },
    {
      label: proceedsAsPercentageOfBookValueLabel,
      value: "proceedsAsAPercentageOfBookValue",
      step: 1,
      min: -50,
      max: 50,
      formatter: FormatRawNumberToPercent,
    },
  ]);

  const onSliderChange = (value, sliderValue, Formatter) => {
    const newSliderValue = dataTable.map((datum) => {
      if (value === datum.value) {
        const minPoint = sliderValue[0];
        const maxPoint = sliderValue[1];
        const length = maxPoint - minPoint;
        const midPoint = length / 2 + minPoint;
        const lowerHalfPoint = (midPoint - minPoint) / 2 + minPoint;
        const upperHalfPoint = midPoint - lowerHalfPoint + midPoint;

        const data = [
          minPoint,
          lowerHalfPoint,
          midPoint,
          upperHalfPoint,
          maxPoint,
        ];

        return {
          ...datum,
          data,
        };
      }
      return datum;
    });
    setSliderValue(newSliderValue);
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
      ...yElement.data.map((statement) => {
        return {
          Header: statement.dataField,
          //accessor: statement.value,
        };
      }),
    );
  }

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
            <TTTable columns={columns} data={xElement.data} />
          </Box>
        </Box>
      )}
      <FormGroup aria-label="position" column className={classes.slider}>
        {dataTable.map((datum) => (
          <FormGroupSlider
            marks={marks}
            setChecked={setChecked}
            onChange={onSliderChange}
            datum={datum}
            sliderValue={sliderValue}
            valueText={valueText}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default SensitivityAnalysis;
