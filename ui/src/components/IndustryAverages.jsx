import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import industryAverage from "../shared/industryAverage";
import BoldValueLabel from "./BoldValueLabel";
import FormatRawNumberToPercent from "./FormatRawNumberToPercent";

const IndustryAverages = () => {
  const theme = useTheme();
  const fundamentals = useSelector((state) => state.fundamentals);
  const industryAverages = fundamentals.isInUS
    ? industryAverage.US
    : industryAverage.global;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Industry Averages ({fundamentals.isInUS ? "US" : "Global"})
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gridColumnGap: theme.spacing(3),
        }}
      >
        <Box>
          <BoldValueLabel
            value={
              <FormatRawNumberToPercent
                decimalScale={2}
                value={industryAverages.annualAverageRevenueGrowthLastFiveYears}
              />
            }
            label="CAGR Past Five Years"
          />
        </Box>
      </Box>
    </>
  );
};

export default IndustryAverages;
