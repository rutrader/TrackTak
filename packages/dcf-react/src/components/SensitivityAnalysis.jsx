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
    label: "-50%",
  },
  {
    value: 0,
    label: "0%",
  },
  {
    value: 50,
    label: "50%",
  },
];

const valueText = (value) => {
  return `${value}%`;
};

const SensitivityAnalysis = () => {
  const classes = useStyles();
  const inputQueryParams = useInputQueryParams();
  const [dataTable, setDataTable] = useState([
    {
      label: cagrInYearsOneToFiveLabel,
      value: "cagrYearOneToFive",
      checked: !isNil(inputQueryParams.cagrYearOneToFive),
      data: [
        { dataFieldTwo: "20%", value: 1 },
        { dataFieldTwo: "25%", value: 2 },
        { dataFieldTwo: "30%", value: 3 },
        { dataFieldTwo: "35%", value: 4 },
        { dataFieldTwo: "40%", value: 5 },
      ],
    },
    {
      label: ebitTargetMarginInYearTenLabel,
      value: "ebitTargetMarginInYearTen",
      checked: !isNil(inputQueryParams.ebitTargetMarginInYearTen),
      data: [
        { dataFieldTwo: "20%", value: 1 },
        { dataFieldTwo: "25%", value: 2 },
        { dataFieldTwo: "30%", value: 3 },
        { dataFieldTwo: "35%", value: 4 },
        { dataFieldTwo: "40%", value: 5 },
      ],
    },
    {
      label: yearOfConvergenceLabel,
      value: "yearOfConvergence",
      data: [
        { dataFieldTwo: "0", value: 1 },
        { dataFieldTwo: "1", value: 2 },
        { dataFieldTwo: "2", value: 3 },
        { dataFieldTwo: "3", value: 4 },
        { dataFieldTwo: "4", value: 5 },
      ],
    },
    {
      label: salesToCapitalRatioLabel,
      value: "salesToCapitalRatio",
      data: [
        { dataFieldTwo: "0", value: 1 },
        { dataFieldTwo: "1", value: 2 },
        { dataFieldTwo: "2", value: 3 },
        { dataFieldTwo: "3", value: 4 },
        { dataFieldTwo: "4", value: 5 },
      ],
    },
    {
      label: probabilityOfFailureLabel,
      value: "probabilityOfFailure",
      data: [
        { dataFieldTwo: "20%", value: 1 },
        { dataFieldTwo: "25%", value: 2 },
        { dataFieldTwo: "30%", value: 3 },
        { dataFieldTwo: "35%", value: 4 },
        { dataFieldTwo: "40%", value: 5 },
      ],
    },
    {
      label: proceedsAsPercentageOfBookValueLabel,
      value: "proceedsAsAPercentageOfBookValue",
      data: [
        { dataFieldTwo: "20%", value: 1 },
        { dataFieldTwo: "25%", value: 2 },
        { dataFieldTwo: "30%", value: 3 },
        { dataFieldTwo: "35%", value: 4 },
        { dataFieldTwo: "40%", value: 5 },
      ],
    },
  ]);

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
      accessor: "dataFieldTwo",
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
          Header: statement.dataFieldTwo,
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
            <TTTable columns={columns} data={yElement.data} />
          </Box>
        </Box>
      )}
      <FormGroup aria-label="position" column className={classes.slider}>
        {dataTable.map((dataLabel) => (
          <FormGroupSlider
            marks={marks}
            setChecked={setChecked}
            dataLabel={dataLabel}
            valueText={valueText}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default SensitivityAnalysis;
