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

const SensitivityAnalysis = () => {
  const classes = useStyles();
  const inputQueryParams = useInputQueryParams();
  const [dataLabels, setDataLabels] = React.useState([
    {
      label: cagrInYearsOneToFiveLabel,
      value: "cagrYearOneToFive",
      checked: !isNil(inputQueryParams.cagrYearOneToFive),
    },
    {
      label: ebitTargetMarginInYearTenLabel,
      value: "ebitTargetMarginInYearTen",
      checked: !isNil(inputQueryParams.ebitTargetMarginInYearTen),
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
      value: "proceedsAsAPercentageOfBookValue",
    },
  ]);

  const setChecked = (value, checked) => {
    const newDataLabels = dataLabels.map((dataLabel) => {
      if (value === dataLabel.value) {
        return {
          ...dataLabel,
          checked,
        };
      }

      return dataLabel;
    });

    setDataLabels(newDataLabels);
  };

  const newDataLabels = [...dataLabels];
  const indexToRemove = newDataLabels.findIndex((x) => x.checked);
  const removedElement =
    indexToRemove !== -1
      ? newDataLabels.splice(indexToRemove, 1)[0]
      : undefined;

  const labelOne = removedElement?.label;
  const labelTwo = newDataLabels.find((x) => x.checked)?.label;

  return (
    <Box sx={{ overflow: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Sensitivity Analysis
      </Typography>
      <Box>
        {labelOne && (
          <Typography
            style={{
              display: "flex",
              justifyContent: "center",
            }}
            variant="h6"
            component="div"
          >
            {labelOne}
          </Typography>
        )}
        <Box style={{ display: "flex", alignItems: "center" }}>
          {labelTwo && (
            <Typography variant="h6" component="div">
              {labelTwo}
            </Typography>
          )}
          <TTTable columns={columns} data={data} />
        </Box>
      </Box>
      <FormGroup aria-label="position" column className={classes.slider}>
        {dataLabels.map((dataLabel) => (
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
