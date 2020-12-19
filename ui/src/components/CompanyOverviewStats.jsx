import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import FormatRawNumber from "./FormatRawNumber";
import FormatRawNumberToMillion from "./FormatRawNumberToMillion";

const CompanyOverviewStats = ({ dateOfValuation }) => {
  const fundamentals = useSelector((state) => state.fundamentals);
  const industryAverages = useSelector((state) => state.industryAverages);
  const { General, SharesStats } = fundamentals.data;
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">{General.Name}</Typography>
        {dateOfValuation && <Typography>{dateOfValuation}</Typography>}
      </Box>
      <Typography color="textSecondary" style={{ textTransform: "uppercase" }}>
        {General.Exchange}:{General.Code}
      </Typography>
      <Typography gutterBottom>
        {industryAverages.currentIndustry.industryName}
      </Typography>
      <Box sx={{ display: "flex", gap: theme.spacing(2) }}>
        <Box>
          <Typography>
            <Box
              component="span"
              sx={{ fontWeight: theme.typography.fontWeightBold }}
            >
              <FormatRawNumber value={fundamentals.price} decimalScale={2} />
            </Box>
            &nbsp;{fundamentals.valuationCurrencyCode}
          </Typography>
          <Typography>
            <Box
              component="span"
              sx={{ fontWeight: theme.typography.fontWeightBold }}
            >
              <FormatRawNumberToMillion
                value={SharesStats.SharesOutstanding}
                suffix="M"
              />
            </Box>
            &nbsp;Shares Outstanding
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyOverviewStats;
