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
import { useSelector } from "react-redux";
import useSetURLInput from "../hooks/useSetURLInput";
import selectQueryParams from "../selectors/routerSelectors/selectQueryParams";
import FormatInputToPercent from "./FormatInputToPercent";
import { textFieldRootStyles } from "../shared/utils";
import OptionalInput from "./OptionalInput";

export const pretaxCostOfDebtLabel = "Pre-tax Cost of Debt";

const OptionalTextField = withStyles({
  root: {
    ...textFieldRootStyles,
  },
})(TextField);

const OptionalInputs = () => {
  const queryParams = useSelector(selectQueryParams);
  const setURLInput = useSetURLInput();
  const theme = useTheme();

  const optionalInputs = [
    {
      title: "Normal Debt",
      tooltipTextNode: <InfoTextNormalDebt />,
      children: (
        <>
          <OptionalTextField
            label={pretaxCostOfDebtLabel}
            defaultValue={queryParams.pretaxCostOfDebt}
            onBlur={(value) => {
              setURLInput("pretaxCostOfDebt", value);
            }}
            InputProps={{
              inputComponent: FormatInputToPercent,
            }}
          />
          <OptionalTextField
            label="Average Maturity of Debt"
            defaultValue={queryParams.averageMaturityOfDebt}
            onBlur={(value) => {
              setURLInput("averageMaturityOfDebt", value);
            }}
            InputProps={{
              inputComponent: FormatInputToYear,
            }}
          />
        </>
      ),
    },
    {
      title: "Convertible Debt",
      tooltipTextNode: <InfoTextConvertibleDebt />,
      children: (
        <>
          <OptionalTextField
            label="Book Value of Convertible Debt"
            defaultValue={queryParams.bookValueOfConvertibleDebt}
            onBlur={(value) => {
              setURLInput("bookValueOfConvertibleDebt", value);
            }}
            InputProps={{
              inputComponent: FormatInputToMillionCurrency,
            }}
          />
          <OptionalTextField
            label="Interest Expense on Convertible Debt"
            defaultValue={queryParams.interestExpenseOnConvertibleDebt}
            onBlur={(value) => {
              setURLInput("interestExpenseOnConvertibleDebt", value);
            }}
            InputProps={{
              inputComponent: FormatInputToMillionCurrency,
            }}
          />
          <OptionalTextField
            label="Maturity of Convertible Debt"
            defaultValue={queryParams.maturityOfConvertibleDebt}
            onBlur={(value) => {
              setURLInput("maturityOfConvertibleDebt", value);
            }}
            InputProps={{
              inputComponent: FormatInputToYear,
            }}
          />
        </>
      ),
    },
    {
      title: "Preferred Stock",
      tooltipTextNode: <InfoTextPreferredStock />,
      children: (
        <>
          <OptionalTextField
            label="Number of Preferred Shares"
            defaultValue={queryParams.numberOfPreferredShares}
            onBlur={(value) => {
              setURLInput("numberOfPreferredShares", value);
            }}
            InputProps={{
              inputComponent: FormatInputToMillion,
            }}
          />
          <OptionalTextField
            label="Market Price Per Share"
            defaultValue={queryParams.marketPricePerShare}
            onBlur={(value) => {
              setURLInput("marketPricePerShare", value);
            }}
            InputProps={{
              inputComponent: FormatInputToCurrency,
            }}
          />
          <OptionalTextField
            label="Annual Dividend Per Share"
            defaultValue={queryParams.annualDividendPerShare}
            onBlur={(value) => {
              setURLInput("annualDividendPerShare", value);
            }}
            InputProps={{
              inputComponent: FormatInputToCurrency,
            }}
          />
        </>
      ),
    },
    {
      title: "Employee Options",
      tooltipTextNode: <InfoTextEmployeeOptions />,
      children: (
        <>
          <OptionalTextField
            label="Employee Options Oustanding"
            defaultValue={queryParams.numberOfEmployeeOptionsOutstanding}
            onBlur={(value) => {
              setURLInput("numberOfEmployeeOptionsOutstanding", value);
            }}
            InputProps={{
              inputComponent: FormatInputToMillion,
            }}
          />
          <OptionalTextField
            label="Average Strike Price"
            defaultValue={queryParams.averageStrikePrice}
            onBlur={(value) => {
              setURLInput("averageStrikePrice", value);
            }}
            InputProps={{
              inputComponent: FormatInputToCurrency,
            }}
          />
          <OptionalTextField
            label="Average Maturity"
            defaultValue={queryParams.averageMaturityOfOptions}
            onBlur={(value) => {
              setURLInput("averageMaturityOfOptions", value);
            }}
            InputProps={{
              inputComponent: FormatInputToYear,
            }}
          />
        </>
      ),
    },
    {
      title: "Other",
      tooltipTextNode: <InfoTextOther />,
      children: (
        // TODO: Automate this by default but still keep this input
        // to allow overriding
        <>
          <OptionalTextField
            label="Net Operating Loss"
            defaultValue={queryParams.netOperatingLoss}
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
            defaultValue={queryParams.probabilityOfFailure}
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
            defaultValue={queryParams.proceedsAsAPercentageOfBookValue}
            onBlur={(value) => {
              setURLInput("proceedsAsAPercentageOfBookValue", value);
            }}
            InputProps={{
              inputComponent: FormatInputToPercent,
            }}
          />
        </>
      ),
    },
  ];

  return (
    <>
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
    </>
  );
};
export default OptionalInputs;
