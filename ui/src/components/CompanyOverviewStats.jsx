import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import BoldValueLabel from "./BoldValueLabel";
import FormatRawNumber from "./FormatRawNumber";
import FormatRawNumberToMillion from "./FormatRawNumberToMillion";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";

const CompanyOverviewStats = ({ dateOfValuation }) => {
  const {
    data: { General, SharesStats },
    ...fundamentals
  } = useSelector((state) => state.fundamentals);
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
      <Typography
        gutterBottom
        color="textSecondary"
        style={{ textTransform: "uppercase" }}
      >
        {General.Code}.{General.Exchange}
      </Typography>

      <Box sx={{ display: "flex", gap: theme.spacing(2) }}>
        <Box>
          <BoldValueLabel
            value={
              <FormatRawNumber value={fundamentals.price} decimalScale={2} />
            }
            label={fundamentals.valuationCurrencyCode}
          />
          <BoldValueLabel
            value={
              <FormatRawNumberToMillion
                value={SharesStats.SharesOutstanding}
                suffix="m"
              />
            }
            label={
              <InfoOutlinedIconWrapper text="Refers to a company's total stock currently held by public investors, including share blocks held by institutional investors and restricted shares owned by the company’s officers and insiders.">
                Shares Outstanding
              </InfoOutlinedIconWrapper>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CompanyOverviewStats;
