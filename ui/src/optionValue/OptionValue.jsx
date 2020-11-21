import { Box, Typography, withStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFinancials } from "../redux/actions/financialsActions";

const StyledBox = ({ sx, ...props }) => (
  <Box sx={{ marginLeft: "auto", ...sx }} {...props} />
);

const StyledMinWidthBox = ({ sx, ...props }) => (
  <Box sx={{ marginRight: "10px", minWidth: "300px", ...sx }} {...props} />
);

const StyledTypography = withStyles((theme) => ({
  root: {
    display: "flex",
    fontSize: "0.999rem",
    margin: theme.spacing(0.5),
  },
}))(({ ...props }) => <Typography color="textSecondary" {...props} />);

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
      <Box sx={{ mt: 5 }}></Box>
      <Box
        sx={{
          maxWidth: "400px",
        }}
      >
        <Typography variant="h4">Options Valuation</Typography>
        <Box sx={{ mt: 5 }}></Box>
        <Typography variant="h5">Employee Options</Typography>
        <Box sx={{ mt: 3 }}></Box>
        <StyledTypography>
          Number of options outstanding
          <StyledBox>
            {
              annualDilutedAverageShares[annualDilutedAverageShares.length - 1]
                .reportedValue.fmt
            }
          </StyledBox>
        </StyledTypography>
        <StyledTypography>
          Average strike price <StyledBox>504.00M</StyledBox>
        </StyledTypography>
        <StyledTypography>
          Average maturity <StyledBox>504.00M</StyledBox>
        </StyledTypography>
        <StyledTypography>
          Standard deviation on stock price <StyledBox>504.00M</StyledBox>
        </StyledTypography>
        <StyledTypography>
          Annualized dividend yield on stock <StyledBox>504.00M</StyledBox>
        </StyledTypography>
        <Box sx={{ mt: 3 }}></Box>
        <Typography variant="h5">
          Dilution Effect of Options Valuation
        </Typography>
        <Box sx={{ mt: 3 }}></Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <StyledTypography>
            <StyledMinWidthBox>Adjusted S</StyledMinWidthBox>
            504.00M
          </StyledTypography>
          <StyledTypography>
            <StyledMinWidthBox>Variance</StyledMinWidthBox>
            504.00M
          </StyledTypography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <StyledTypography>
            <StyledMinWidthBox>Adjusted K</StyledMinWidthBox>
            504.00M
          </StyledTypography>
          <StyledTypography>
            <StyledMinWidthBox>
              Dividend Adjusted Interest rate
            </StyledMinWidthBox>
            504.00M
          </StyledTypography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <StyledTypography>
            <StyledMinWidthBox>d1</StyledMinWidthBox>
            504.00M
          </StyledTypography>
          <StyledTypography>
            <StyledMinWidthBox>d2</StyledMinWidthBox>
            504.00M
          </StyledTypography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <StyledTypography>
            <StyledMinWidthBox>N(d1)</StyledMinWidthBox>
            504.00M
          </StyledTypography>
          <StyledTypography>
            <StyledMinWidthBox>N(d2)</StyledMinWidthBox>
            504.00M
          </StyledTypography>
        </Box>
        <Box sx={{ mt: 3 }}></Box>
        <StyledTypography>
          <StyledMinWidthBox> Value per Option</StyledMinWidthBox>
          504.00M
        </StyledTypography>
        <StyledTypography>
          <StyledMinWidthBox>
            Value of all Options Outstanding
          </StyledMinWidthBox>
          504.00M
        </StyledTypography>
      </Box>
    </>
  );
};

export default OptionValue;
