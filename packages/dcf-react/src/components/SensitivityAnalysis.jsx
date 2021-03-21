import React from "react";
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
  weightedAverageCostOfCapitalLabel,
} from "../components/OptionalInputs";
import TTTable from "./TTTable";
import FormGroupSlider from "./FormGroupSlider";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  slider: {
    maxWidth: 800,
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
    value: -40,
    label: "-40%",
  },
  {
    value: -30,
    label: "-30%",
  },
  {
    value: -20,
    label: "-20%",
  },
  {
    value: -10,
    label: "-10%",
  },
  {
    value: 0,
    label: "0%",
  },
  {
    value: 10,
    label: "10%",
  },
  {
    value: 20,
    label: "20%",
  },
  {
    value: 30,
    label: "30%",
  },
  {
    value: 40,
    label: "40%",
  },
  {
    value: 50,
    label: "50%",
  },
];

const valueText = (value) => {
  return `${value}%`;
};

const data = [
  { dataField: "20%", value: 1 },
  { dataField: "25%", value: 2 },
  { dataField: "30%", value: 3 },
  { dataField: "35%", value: 4 },
  { dataField: "40%", value: 5 },
];

const datumHeaders = [
  { name: "5%", accessor: 0 },
  { name: "10%", accessor: 1 },
  { name: "15%", accessor: 2 },
  { name: "20%", accessor: 3 },
  { name: "25%", accessor: 4 },
];

const columns = [
  {
    Header: "",
    accessor: "dataField",
  },
];

columns.push(
  ...datumHeaders.map((statement) => {
    return {
      Header: statement.name,
      accessor: statement.id,
    };
  }),
);

const dataLabels = [
  {
    label: cagrInYearsOneToFiveLabel,
    value: "cagrInYearsOneToFive",
  },
  {
    label: ebitTargetMarginInYearTenLabel,
    value: "ebitTargetMarginInYearTen",
  },
  {
    label: yearOfConvergenceLabel,
    value: "yearOfConvergence",
  },
  {
    label: salesToCapitalRatioLabel,
    value: "salesToCapitalRatio",
  },
  {
    label: probabilityOfFailureLabel,
    value: "probabilityOfFailure",
  },
  {
    label: proceedsAsPercentageOfBookValueLabel,
    value: "proceedsAsPercentageOfBookValue",
  },
  {
    label: weightedAverageCostOfCapitalLabel,
    value: "weightedAverageCostOfCapital",
  },
];

const SensitivityAnalysis = () => {
  const classes = useStyles();
  return (
    <Box sx={{ overflow: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Sensitivity Analysis
      </Typography>
      <TTTable columns={columns} data={data} />
      <FormGroup aria-label="position" column className={classes.slider}>
        {dataLabels.map((dataLabel) => (
          <FormGroupSlider
            marks={marks}
            dataLabel={dataLabel}
            valueText={valueText}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default SensitivityAnalysis;
