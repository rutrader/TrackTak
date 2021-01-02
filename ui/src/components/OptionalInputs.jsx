import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  Typography,
  useTheme,
  withStyles,
} from "@material-ui/core";
import React from "react";
import { textFieldRootStyles } from "../shared/utils";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormatInputToYear from "./FormatInputToYear";
import FormatInputToCurrency from "./FormatInputToCurrency";
import FormatInputToMillion from "./FormatInputToMillion";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";
import {
  InfoTextConvertibleDebt,
  InfoTextEmployeeOptions,
  InfoTextNormalDebt,
  InfoTextPreferredStock,
} from "./InfoText";
import { useSelector } from "react-redux";
import useSetURLInput from "../hooks/useSetURLInput";
import selectQueryParams from "../selectors/selectQueryParams";
import FormatInputToPercent from "./FormatInputToPercent";

const OptionalTextField = withStyles({
  root: {
    ...textFieldRootStyles,
  },
})(TextField);

const OptionalInputAccordion = withStyles({
  root: {
    "&.Mui-expanded": {
      margin: 0,
    },
    "& .MuiAccordionSummary-root": {
      padding: 0,
    },
    "& .MuiAccordionDetails-root": {
      padding: 0,
    },
  },
})((props) => <Accordion elevation={0} {...props} />);

export const pretaxCostOfDebtLabel = "Pre-tax Cost of Debt";

const OptionalInputs = () => {
  const theme = useTheme();
  const queryParams = useSelector(selectQueryParams);
  const setURLInput = useSetURLInput();

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
        <OptionalInputAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              <InfoOutlinedIconWrapper text={<InfoTextNormalDebt />}>
                Normal Debt
              </InfoOutlinedIconWrapper>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: theme.spacing(2),
              }}
            >
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
            </Box>
          </AccordionDetails>
        </OptionalInputAccordion>
        <OptionalInputAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              <InfoOutlinedIconWrapper text={<InfoTextConvertibleDebt />}>
                Convertible Debt
              </InfoOutlinedIconWrapper>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(2) }}
            >
              <OptionalTextField
                label="Book Value of Convertible Debt"
                defaultValue={queryParams.bookValueOfConvertibleDebt}
                onBlur={(value) => {
                  setURLInput("bookValueOfConvertibleDebt", value);
                }}
                InputProps={{
                  inputComponent: FormatInputToCurrency,
                }}
              />
              <OptionalTextField
                label="Interest Expense on Convertible Debt"
                defaultValue={queryParams.interestExpenseOnConvertibleDebt}
                onBlur={(value) => {
                  setURLInput("interestExpenseOnConvertibleDebt", value);
                }}
                InputProps={{
                  inputComponent: FormatInputToCurrency,
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
            </Box>
          </AccordionDetails>
        </OptionalInputAccordion>
        <OptionalInputAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              <InfoOutlinedIconWrapper text={<InfoTextPreferredStock />}>
                Preferred Stock
              </InfoOutlinedIconWrapper>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(2) }}
            >
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
            </Box>
          </AccordionDetails>
        </OptionalInputAccordion>
        <OptionalInputAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">
              <InfoOutlinedIconWrapper text={<InfoTextEmployeeOptions />}>
                Employee Options
              </InfoOutlinedIconWrapper>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(2) }}
            >
              <OptionalTextField
                label="Employee Options Oustanding"
                defaultValue={queryParams.numberOfOptionsOutstanding}
                onBlur={(value) => {
                  setURLInput("numberOfOptionsOutstanding", value);
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
            </Box>
          </AccordionDetails>
        </OptionalInputAccordion>
      </Box>
    </>
  );
};
export default OptionalInputs;
