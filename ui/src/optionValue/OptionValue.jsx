import { Box, Typography, withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFinancials } from "../redux/actions/financialsActions";
import Section from "../components/Section";

const StyledBox = ({ sx, ...props }) => (
  <Box sx={{ ml: "auto", ...sx }} {...props} />
);

const StyledMinWidthBox = ({ sx, ...props }) => (
  <Box sx={{ marginRight: 1, minWidth: 300, ...sx }} {...props} />
);

const TypographyLabel = withStyles({
  root: {
    display: "flex",
  },
})(({ ...props }) => (
  <Typography color="textSecondary" gutterBottom {...props} />
));

const OptionValue = () => {
  const financialsData = useSelector((state) => state.financials.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFinancials("AMZN"));
  }, [dispatch]);

  if (!financialsData) return null;

  const {
    timeSeries: { annualDilutedAverageShares },
  } = financialsData;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Options Valuation
      </Typography>
      <Section sx={{ maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom>
          Employee Options
        </Typography>
        <TypographyLabel>
          Number of options outstanding
          <StyledBox>
            {
              annualDilutedAverageShares[annualDilutedAverageShares.length - 1]
                .reportedValue.fmt
            }
          </StyledBox>
        </TypographyLabel>
        <TypographyLabel>
          Average Strike Price <StyledBox>504.00M</StyledBox>
        </TypographyLabel>
        <TypographyLabel>
          Average Maturity <StyledBox>504.00M</StyledBox>
        </TypographyLabel>
        <TypographyLabel>
          Standard Deviation on Stock Price <StyledBox>504.00M</StyledBox>
        </TypographyLabel>
        <TypographyLabel>
          Annualized Dividend Yield on Stock <StyledBox>504.00M</StyledBox>
        </TypographyLabel>
      </Section>
      <Section>
        <Typography variant="h5" gutterBottom>
          Dilution Effect of Options Valuation
        </Typography>
        <Box sx={{ display: "flex" }}>
          <TypographyLabel>
            <StyledMinWidthBox sx={{ minWidth: 120 }}>
              Adjusted S
            </StyledMinWidthBox>
            504.00M
          </TypographyLabel>
          <TypographyLabel>
            <StyledMinWidthBox sx={{ ml: 13.5 }}>Variance</StyledMinWidthBox>
            504.00M
          </TypographyLabel>
        </Box>
        <Box sx={{ display: "flex" }}>
          <TypographyLabel>
            <StyledMinWidthBox sx={{ minWidth: 120 }}>
              Adjusted K
            </StyledMinWidthBox>
            504.00M
          </TypographyLabel>
          <TypographyLabel>
            <StyledMinWidthBox sx={{ ml: 13.6 }}>
              Dividend Adjusted Interest rate
            </StyledMinWidthBox>
            504.00M
          </TypographyLabel>
        </Box>
        <Box my={2}>
          <Box sx={{ display: "flex" }}>
            <TypographyLabel>
              <StyledMinWidthBox sx={{ minWidth: 120 }}>d1</StyledMinWidthBox>
              504.00M
            </TypographyLabel>
            <TypographyLabel>
              <StyledMinWidthBox sx={{ ml: 13.6 }}>d2</StyledMinWidthBox>
              504.00M
            </TypographyLabel>
          </Box>
          <Box sx={{ display: "flex" }}>
            <TypographyLabel>
              <StyledMinWidthBox sx={{ minWidth: 120 }}>
                N(d1)
              </StyledMinWidthBox>
              504.00M
            </TypographyLabel>
            <TypographyLabel>
              <StyledMinWidthBox sx={{ ml: 13.6 }}>N(d2)</StyledMinWidthBox>
              504.00M
            </TypographyLabel>
          </Box>
        </Box>
        <Box my={2}>
          <TypographyLabel>
            <StyledMinWidthBox>Value Per Option</StyledMinWidthBox>
            504.00M
          </TypographyLabel>
          <TypographyLabel>
            <StyledMinWidthBox>
              Value of All Options Outstanding
            </StyledMinWidthBox>
            504.00M
          </TypographyLabel>
        </Box>
      </Section>
    </>
  );
};

export default OptionValue;
