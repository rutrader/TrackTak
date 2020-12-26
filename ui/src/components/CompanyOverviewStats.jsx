import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import FormatRawNumber from "./FormatRawNumber";
import FormatRawNumberToMillion from "./FormatRawNumberToMillion";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";

const CompanyOverviewStats = ({ dateOfValuation }) => {
  const fundamentals = useSelector((state) => state.fundamentals);
  const { General, SharesStats } = fundamentals.data;
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gridColumnGap: theme.spacing(2.5),
        }}
      >
        <Typography variant="h4">{General.Name}</Typography>
        {dateOfValuation && (
          <Typography>
            <b>This valuation was done on the {dateOfValuation}</b>
          </Typography>
        )}
      </Box>
      <Typography color="textSecondary" style={{ textTransform: "uppercase" }}>
        {General.Code}.{General.Exchange}
      </Typography>
      <Typography gutterBottom>
        {fundamentals.currentIndustry.industryName}
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
            <Box sx={{ display: "flex" }}>
              <Box
                component="span"
                sx={{ fontWeight: theme.typography.fontWeightBold }}
              >
                <FormatRawNumberToMillion
                  value={SharesStats.SharesOutstanding}
                  suffix="M"
                />
              </Box>
              &nbsp;
              <InfoOutlinedIconWrapper text="Refers to a company's total stock currently held by public investors, including share blocks held by institutional investors and restricted shares owned by the company’s officers and insiders.">
                Shares Outstanding
              </InfoOutlinedIconWrapper>
            </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyOverviewStats;
