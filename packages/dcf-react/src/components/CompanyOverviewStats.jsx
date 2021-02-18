import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import selectGeneral from "../selectors/fundamentalSelectors/selectGeneral";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import selectSharesOutstanding from "../selectors/fundamentalSelectors/selectSharesOutstanding";
import selectValuationCurrencyCode from "../selectors/fundamentalSelectors/selectValuationCurrencyCode";
import BoldValueLabel from "./BoldValueLabel";
import FormatRawNumber from "./FormatRawNumber";
import FormatRawNumberToMillion from "./FormatRawNumberToMillion";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";

const CompanyOverviewStats = ({ dateOfValuation }) => {
  const general = useSelector(selectGeneral);
  const price = useSelector(selectPrice);
  const sharesOutstanding = useSelector(selectSharesOutstanding);
  const valuationCurrencyCode = useSelector(selectValuationCurrencyCode);
  const theme = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gridGap: theme.spacing(1.5),
          flexWrap: "wrap",
          marginBottom: theme.spacing(1.5),
        }}
      >
        <Typography variant="h4" style={{ flex: 1 }}>
          {general.Name}
        </Typography>
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
        {general.Code}.{general.Exchange}
      </Typography>

      <Box sx={{ display: "flex", gap: theme.spacing(2) }}>
        <Box>
          <BoldValueLabel
            value={<FormatRawNumber value={price} decimalScale={2} />}
            label={valuationCurrencyCode}
          />
          <BoldValueLabel
            value={
              <FormatRawNumberToMillion
                value={sharesOutstanding}
                suffix="m"
                decimalScale={2}
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
