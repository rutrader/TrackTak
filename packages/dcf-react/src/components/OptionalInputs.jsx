import {
  Box,
  TextField,
  Typography,
  useTheme,
  withStyles,
} from "@material-ui/core";
import React from "react";
import FormatInputToYear from "./FormatInputToYear";
import FormatInputToCurrency from "./FormatInputToCurrency";
import FormatInputToMillion, {
  FormatInputToMillionCurrency,
} from "./FormatInputToMillion";
import {
  InfoTextConvertibleDebt,
  InfoTextEmployeeOptions,
  InfoTextNormalDebt,
  InfoTextPreferredStock,
  InfoTextOther,
} from "./InfoText";
import useSetURLInput from "../hooks/useSetURLInput";
import FormatInputToPercent from "./FormatInputToPercent";
import { textFieldRootStyles } from "../shared/utils";
import OptionalInput from "./OptionalInput";
import useInputQueryParams from "../hooks/useInputQueryParams";

export const pretaxCostOfDebtLabel = "Pre-tax Cost of Debt";

const OptionalTextField = withStyles({
  root: {
    ...textFieldRootStyles,
  },
})(TextField);

const OptionalInputs = () => {
  const inputQueryParams = useInputQueryParams();
  const setURLInput = useSetURLInput();
  const theme = useTheme();

  const optionalInputs = [
    {
      title: "Normal Debt",
      tooltipTextNode: <InfoTextNormalDebt />,
      children: (
        <React.Fragment>
          <OptionalTextField
            label={pretaxCostOfDebtLabel}
            defaultValue={inputQueryParams.pretaxCostOfDebt}
            onBlur={(value) => {
              setURLInput("pretaxCostOfDebt", value);
            }}
            InputProps={{
              inputComponent: FormatInputToPercent,
            }}
          />
          <OptionalTextField
            label="Average Maturity of Debt"
            defaultValue={inputQueryParams.averageMaturityOfDebt}
            onBlur={(value) => {
              setURLInput("averageMaturityOfDebt", value);
            }}
            InputProps={{
              inputComponent: FormatInputToYear,
            }}
          />
        </React.Fragment>
      ),
    },
    {
      title: "Convertible Debt",
      tooltipTextNode: <InfoTextConvertibleDebt />,
      children: (
        <React.Fragment>
          <OptionalTextField
            label="Book Value of Convertible Debt"
            defaultValue={inputQueryParams.bookValueOfConvertibleDebt}
            onBlur={(value) => {
              setURLInput("bookValueOfConvertibleDebt", value);
            }}
            InputProps={{
              inputComponent: FormatInputToMillionCurrency,
            }}
          />
          <OptionalTextField
            label="Interest Expense on Convertible Debt"
            defaultValue={inputQueryParams.interestExpenseOnConvertibleDebt}
            onBlur={(value) => {
              setURLInput("interestExpenseOnConvertibleDebt", value);
            }}
            InputProps={{
              inputComponent: FormatInputToMillionCurrency,
            }}
          />
          <OptionalTextField
            label="Maturity of Convertible Debt"
            defaultValue={inputQueryParams.maturityOfConvertibleDebt}
            onBlur={(value) => {
              setURLInput("maturityOfConvertibleDebt", value);
            }}
            InputProps={{
              inputComponent: FormatInputToYear,
            }}
          />
        </React.Fragment>
      ),
    },
    {
      title: "Preferred Stock",
      tooltipTextNode: <InfoTextPreferredStock />,
      children: (
        <React.Fragment>
          <OptionalTextField
            label="Number of Preferred Shares"
            defaultValue={inputQueryParams.numberOfPreferredShares}
            onBlur={(value) => {
              setURLInput("numberOfPreferredShares", value);
            }}
            InputProps={{
              inputComponent: FormatInputToMillion,
            }}
          />
          <OptionalTextField
            label="Market Price Per Share"
            defaultValue={inputQueryParams.marketPricePerShare}
            onBlur={(value) => {
              setURLInput("marketPricePerShare", value);
            }}
            InputProps={{
              inputComponent: FormatInputToCurrency,
            }}
          />
          <OptionalTextField
            label="Annual Dividend Per Share"
            defaultValue={inputQueryParams.annualDividendPerShare}
            onBlur={(value) => {
              setURLInput("annualDividendPerShare", value);
            }}
            InputProps={{
              inputComponent: FormatInputToCurrency,
            }}
          />
        </React.Fragment>
      ),
    },
    {
      title: "Employee Options",
      tooltipTextNode: <InfoTextEmployeeOptions />,
      children: (
        <React.Fragment>
          <OptionalTextField
            label="Employee Options Oustanding"
            defaultValue={inputQueryParams.numberOfEmployeeOptionsOutstanding}
            onBlur={(value) => {
              setURLInput("numberOfEmployeeOptionsOutstanding", value);
            }}
            InputProps={{
              inputComponent: FormatInputToMillion,
            }}
          />
          <OptionalTextField
            label="Average Strike Price"
            defaultValue={inputQueryParams.averageStrikePrice}
            onBlur={(value) => {
              setURLInput("averageStrikePrice", value);
            }}
            InputProps={{
              inputComponent: FormatInputToCurrency,
            }}
          />
          <OptionalTextField
            label="Average Maturity"
            defaultValue={inputQueryParams.averageMaturityOfOptions}
            onBlur={(value) => {
              setURLInput("averageMaturityOfOptions", value);
            }}
            InputProps={{
              inputComponent: FormatInputToYear,
            }}
          />
        </React.Fragment>
      ),
    },
    {
      title: "Other",
      tooltipTextNode: <InfoTextOther />,
      children: (
        // TODO: Automate this by default but still keep this input
        // to allow overriding
        <React.Fragment>
          <OptionalTextField
            label="Net Operating Loss"
            defaultValue={inputQueryParams.netOperatingLoss}
            onBlur={(value) => {
              setURLInput("netOperatingLoss", value);
            }}
            InputProps={{
              inputComponent: FormatInputToMillionCurrency,
            }}
          />
          {/* TODO: Attempt to automate this by default but allow this override anyway */}
          <OptionalTextField
            label="Probability of Failure"
            defaultValue={inputQueryParams.probabilityOfFailure}
            onBlur={(value) => {
              setURLInput("probabilityOfFailure", value);
            }}
            InputProps={{
              inputComponent: FormatInputToPercent,
            }}
          />
          {/* TODO: Add fair value option as well later */}
          <OptionalTextField
            label="Proceeds as a Percentage of Book value"
            defaultValue={inputQueryParams.proceedsAsAPercentageOfBookValue}
            onBlur={(value) => {
              setURLInput("proceedsAsAPercentageOfBookValue", value);
            }}
            InputProps={{
              inputComponent: FormatInputToPercent,
            }}
          />
        </React.Fragment>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Optional Inputs
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: theme.spacing(2),
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        {optionalInputs.map((optionalInput) => (
          <OptionalInput {...optionalInput} />
        ))}
      </Box>
    </React.Fragment>
  );
};
export default OptionalInputs;
