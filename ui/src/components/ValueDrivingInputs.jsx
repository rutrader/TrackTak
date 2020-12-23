import { Box, TextField, useTheme, withStyles } from "@material-ui/core";
import React from "react";
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

export const cagrInYearsOneToFiveLabel = "CAGR in Years 1-5";
export const ebitTargetMarginInYearTenLabel = "EBIT Target Margin in Year 10";
export const yearOfConvergenceLabel = "Year of Convergence";
export const salesToCapitalRatioLabel = "Sales to Capital Ratio";
export const pretaxCostOfDebtLabel = "Pre-tax Cost of Debt";

const ValueDrivingInputs = () => {
  const theme = useTheme();
  const location = useLocation();
  const inputQueryParams = parseInputQueryParams(location);
  const queryParams = new URLSearchParams(location.search);
  const history = useHistory();

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(2) }}>
      <ValueDrivingTextField
        label={cagrInYearsOneToFiveLabel}
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
        label={ebitTargetMarginInYearTenLabel}
        defaultValue={inputQueryParams.ebitTargetMarginInYearTen}
        onBlur={(value) => {
          setInputQueryParams(queryParams, "ebitTargetMarginInYearTen", value);
          history.push({
            search: queryParams.toString(),
          });
        }}
        InputProps={{
          inputComponent: FormatInputToPercent,
        }}
      />
      <ValueDrivingTextField
        label={yearOfConvergenceLabel}
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
        label={salesToCapitalRatioLabel}
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
        label={pretaxCostOfDebtLabel}
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
  );
};
export default ValueDrivingInputs;
