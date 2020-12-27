import {
  Box,
  TextField,
  Typography,
  useTheme,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import setInputQueryParams from "../shared/setInputQueryParams";
import FormatInputToPercent from "./FormatInputToPercent";
import FormatInputToYear from "./FormatInputToYear";
import FormatInputToNumber from "./FormatInputToNumber";
import { textFieldRootStyles } from "../shared/utils";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";
import { InfoTextValueDrivingInputs } from "./InfoText";
import { selectQueryParams } from "../selectors/getInputQueryParams";
import { useSelector } from "react-redux";

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
  const queryParams = useSelector(selectQueryParams);
  const history = useHistory();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        <InfoOutlinedIconWrapper text={<InfoTextValueDrivingInputs />}>
          Value Driving Inputs
        </InfoOutlinedIconWrapper>
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(2) }}>
        <ValueDrivingTextField
          label={cagrInYearsOneToFiveLabel}
          defaultValue={queryParams.cagrYearOneToFive}
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
          defaultValue={queryParams.ebitTargetMarginInYearTen}
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
          label={yearOfConvergenceLabel}
          defaultValue={queryParams.yearOfConvergence}
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
          defaultValue={queryParams.salesToCapitalRatio}
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
          defaultValue={queryParams.pretaxCostOfDebt}
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
    </>
  );
};
export default ValueDrivingInputs;
