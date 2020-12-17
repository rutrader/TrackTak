import {
  Box,
  TextField,
  Typography,
  useTheme,
  withStyles,
} from "@material-ui/core";
import React from "react";
import SubSection from "./SubSection";
import parseInputQueryParams from "../shared/parseInputQueryParams";
import { useHistory, useLocation } from "react-router";
import setInputQueryParams from "../shared/setInputQueryParams";
import FormatInputToPercent from "./FormatInputToPercent";
import FormatInputToYear from "./FormatInputToYear";
import FormatInputToNumber from "./FormatInputToNumber";
import { textFieldRootStyles } from "../shared/utils";

const ValueDrivingTextField = withStyles({
  root: {
    ...textFieldRootStyles,
  },
})(TextField);

const ValueDrivingInputs = () => {
  const theme = useTheme();
  const location = useLocation();
  const inputQueryParams = parseInputQueryParams(location);
  const queryParams = new URLSearchParams(location.search);
  const history = useHistory();

  return (
    <SubSection>
      <Typography variant="h5" gutterBottom>
        Value Driving Inputs
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(2) }}>
        <ValueDrivingTextField
          label="CAGR in Years 1-5"
          defaultValue={inputQueryParams.cagrYearOneToFive}
          onBlur={(value) => {
            setInputQueryParams(queryParams, "cagrYearOneToFive", value);
            history.push({
              search: queryParams.toString(),
            });
          }}
          InputProps={{
            inputComponent: FormatInputToPercent,
          }}
        />
        <ValueDrivingTextField
          label="EBIT Target Margin in Year 10"
          defaultValue={inputQueryParams.ebitTargetMarginInYearTen}
          onBlur={(value) => {
            setInputQueryParams(
              queryParams,
              "ebitTargetMarginInYearTen",
              value
            );
            history.push({
              search: queryParams.toString(),
            });
          }}
          InputProps={{
            inputComponent: FormatInputToPercent,
          }}
        />
        <ValueDrivingTextField
          label="Year of Convergence"
          defaultValue={inputQueryParams.yearOfConvergence}
          onBlur={(value) => {
            setInputQueryParams(queryParams, "yearOfConvergence", value);
            history.push({
              search: queryParams.toString(),
            });
          }}
          InputProps={{
            inputComponent: FormatInputToYear,
          }}
        />
        <ValueDrivingTextField
          label="Sales to Capital Ratio"
          defaultValue={inputQueryParams.salesToCapitalRatio}
          onBlur={(value) => {
            setInputQueryParams(queryParams, "salesToCapitalRatio", value);
            history.push({
              search: queryParams.toString(),
            });
          }}
          InputProps={{
            inputComponent: FormatInputToNumber,
          }}
        />
        <ValueDrivingTextField
          label="Pre-tax Cost of Debt"
          defaultValue={inputQueryParams.pretaxCostOfDebt}
          onBlur={(value) => {
            setInputQueryParams(queryParams, "pretaxCostOfDebt", value);
            history.push({
              search: queryParams.toString(),
            });
          }}
          InputProps={{
            inputComponent: FormatInputToPercent,
          }}
        />
      </Box>
    </SubSection>
  );
};
export default ValueDrivingInputs;
