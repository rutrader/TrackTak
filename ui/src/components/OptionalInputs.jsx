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
import { useHistory, useLocation } from "react-router";
import parseInputQueryParams from "../shared/parseInputQueryParams";
import { textFieldRootStyles } from "../shared/utils";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import setInputQueryParams from "../shared/setInputQueryParams";
import FormatInputToYear from "./FormatInputToYear";
import FormatInputToCurrency from "./FormatInputToCurrency";
import FormatInputToMillion from "./FormatInputToMillion";

const CostOfCapitalTextField = withStyles({
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

const OptionalInputs = () => {
  const theme = useTheme();
  const location = useLocation();
  const inputQueryParams = parseInputQueryParams(location);
  const queryParams = new URLSearchParams(location.search);
  const history = useHistory();

  return (
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
          <Typography variant="h6">Normal Debt</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: theme.spacing(2),
            }}
          >
            <CostOfCapitalTextField
              label="Average Maturity of Debt"
              defaultValue={inputQueryParams.averageMaturityOfDebt}
              onBlur={(value) => {
                setInputQueryParams(
                  queryParams,
                  "averageMaturityOfDebt",
                  value
                );
                history.push({
                  search: queryParams.toString(),
                });
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
          <Typography variant="h6">Convertible Debt</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(2) }}
          >
            <CostOfCapitalTextField
              label="Book Value of Convertible Debt"
              defaultValue={inputQueryParams.bookValueOfConvertibleDebt}
              onBlur={(value) => {
                setInputQueryParams(
                  queryParams,
                  "bookValueOfConvertibleDebt",
                  value
                );
                history.push({
                  search: queryParams.toString(),
                });
              }}
              InputProps={{
                inputComponent: FormatInputToCurrency,
              }}
            />
            <CostOfCapitalTextField
              label="Interest Expense on Convertible Debt"
              defaultValue={inputQueryParams.interestExpenseOnConvertibleDebt}
              onBlur={(value) => {
                setInputQueryParams(
                  queryParams,
                  "interestExpenseOnConvertibleDebt",
                  value
                );
                history.push({
                  search: queryParams.toString(),
                });
              }}
              InputProps={{
                inputComponent: FormatInputToCurrency,
              }}
            />
            <CostOfCapitalTextField
              label="Maturity of Convertible Debt"
              defaultValue={inputQueryParams.maturityOfConvertibleDebt}
              onBlur={(value) => {
                setInputQueryParams(
                  queryParams,
                  "maturityOfConvertibleDebt",
                  value
                );
                history.push({
                  search: queryParams.toString(),
                });
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
          <Typography variant="h6">Preferred Stock</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", gap: theme.spacing(2) }}
          >
            <CostOfCapitalTextField
              label="Number of Preferred Shares"
              defaultValue={inputQueryParams.numberOfPreferredShares}
              onBlur={(value) => {
                setInputQueryParams(
                  queryParams,
                  "numberOfPreferredShares",
                  value
                );
                history.push({
                  search: queryParams.toString(),
                });
              }}
              InputProps={{
                inputComponent: FormatInputToMillion,
              }}
            />
            <CostOfCapitalTextField
              label="Market Price Per Share"
              defaultValue={inputQueryParams.marketPricePerShare}
              onBlur={(value) => {
                setInputQueryParams(queryParams, "marketPricePerShare", value);
                history.push({
                  search: queryParams.toString(),
                });
              }}
              InputProps={{
                inputComponent: FormatInputToCurrency,
              }}
            />
            <CostOfCapitalTextField
              label="Annual Dividend Per Share"
              defaultValue={inputQueryParams.annualDividendPerShare}
              onBlur={(value) => {
                setInputQueryParams(
                  queryParams,
                  "annualDividendPerShare",
                  value
                );
                history.push({
                  search: queryParams.toString(),
                });
              }}
              InputProps={{
                inputComponent: FormatInputToCurrency,
              }}
            />
          </Box>
        </AccordionDetails>
      </OptionalInputAccordion>
    </Box>
  );
};
export default OptionalInputs;
