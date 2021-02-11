import { Box, Typography, useTheme } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import selectGeneral from "../selectors/fundamentalSelectors/selectGeneral";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import selectSharesStats from "../selectors/fundamentalSelectors/selectSharesStats";
import selectValuationCurrencyCode from "../selectors/fundamentalSelectors/selectValuationCurrencyCode";
import selectIsIframe from "../selectors/routerSelectors/selectIsIframe";
import BoldValueLabel from "./BoldValueLabel";
import FormatRawNumber from "./FormatRawNumber";
import FormatRawNumberToMillion from "./FormatRawNumberToMillion";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";

const CompanyOverviewStats = ({ dateOfValuation }) => {
  const general = useSelector(selectGeneral);
  const price = useSelector(selectPrice);
  const sharesStats = useSelector(selectSharesStats);
  const isIframe = useSelector(selectIsIframe);
  const valuationCurrencyCode = useSelector(selectValuationCurrencyCode);
  const theme = useTheme();

  return isIframe ? null : (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gridColumnGap: theme.spacing(2.5),
        }}
      >
        <Typography variant="h4">{general.Name}</Typography>
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
                value={sharesStats.SharesOutstanding}
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
