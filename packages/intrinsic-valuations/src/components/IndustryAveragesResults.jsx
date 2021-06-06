import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import selectCurrentIndustry from "../selectors/fundamentalSelectors/selectCurrentIndustry";
import selectIsInUS from "../selectors/fundamentalSelectors/selectIsInUS";
import StatsContainer from "./StatsContainer";
import BoldValueLabel from "./BoldValueLabel";
import FormatRawNumberToPercent from "./FormatRawNumberToPercent";
import withFundamentalsLoaded from "../hoc/withFundamentalsLoaded";

const IndustryAveragesResults = () => {
  const theme = useTheme();
  const isInUS = useSelector(selectIsInUS);
  const currentIndustry = useSelector(selectCurrentIndustry);

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Industry Averages ({isInUS ? "US" : "Global"})
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gridColumnGap: theme.spacing(3),
        }}
      >
        <StatsContainer>
          <Typography style={{ fontWeight: theme.typography.fontWeightBold }}>
            {currentIndustry.industryName}
          </Typography>
          <BoldValueLabel
            value={
              <FormatRawNumberToPercent
                value={currentIndustry.annualAverageCAGRLastFiveYears}
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
              <FormatRawNumberToPercent value={currentIndustry.afterTaxROIC} />
            }
            label="ROIC (TTM)"
          />
          <BoldValueLabel
            value={currentIndustry["sales/Capital"]}
            label="Sales to Capital Ratio"
          />
        </StatsContainer>
        <StatsContainer>
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
        </StatsContainer>
      </Box>
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(IndustryAveragesResults);
