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
      ...yElement.data.map((value) => {
        const Formatter = yElement.formatter;

        return {
          Header: <Formatter value={value} />,
          accessor: value.toString(),
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
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mt: "56px",
                }}
              >
                {xElement.data.map((value) => {
                  const Formatter = xElement.formatter;

                  return (
                    <Typography
                      sx={{
                        padding: "16px",
                        fontSize: "0.875rem",
                        textAlign: "left",
                        color: "rgba(0, 0, 0, 0.87)",
                        fontWeight: 500,
                        lineHeight: "1.5rem",
                      }}
                    >
                      <Formatter key={value} value={value} />
                    </Typography>
                  );
                })}
              </Box>
              <TTTable columns={columns} data={[]} />
            </Box>
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
