import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import BoldValueLabel from "./BoldValueLabel";
import FormatRawNumberToPercent from "./FormatRawNumberToPercent";

const IndustryAverages = () => {
  const theme = useTheme();
  const isInUS = useSelector((state) => state.fundamentals.isInUS);
  const currentIndustry = useSelector(
    (state) => state.fundamentals.currentIndustry
  );

  return (
    <>
      <Typography variant="h5">
        Industry Averages ({isInUS ? "US" : "Global"})
      </Typography>
      <Typography
        gutterBottom
        style={{ fontWeight: theme.typography.fontWeightBold }}
      >
        {currentIndustry.industryName}
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
                value={currentIndustry.annualAverageRevenueGrowthLastFiveYears}
              />
            }
            label="CAGR Past Five Years"
          />
          <BoldValueLabel
            value={
              <FormatRawNumberToPercent
                value={currentIndustry.preTaxOperatingMarginUnadjusted}
              />
            }
            label="Pre-tax Operating Margin (TTM)"
          />
          <BoldValueLabel
            value={
              <FormatRawNumberToPercent
                value={currentIndustry.afterTaxReturnOnCapital}
              />
            }
            label="ROIC (TTM)"
          />
          <BoldValueLabel
            value={currentIndustry.salesToCapital}
            label="Sales to Capital Ratio"
          />
        </Box>
        <Box>
          <BoldValueLabel
            value={
              <FormatRawNumberToPercent value={currentIndustry.costOfCapital} />
            }
            label="Cost of Capital"
          />
          <BoldValueLabel
            value={currentIndustry.unleveredBeta}
            label="Unlevered Beta"
          />
          <BoldValueLabel
            value={currentIndustry.equityLeveredBeta}
            label="Levered Beta"
          />
        </Box>
      </Box>
    </>
  );
};

export default IndustryAverages;
