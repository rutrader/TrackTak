import React from "react";
import TTTable from "../components/TTTable";
import { Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import FormatRawNumberToMillion from "../components/FormatRawNumberToMillion";
import BoldValueLabel from "../components/BoldValueLabel";
import selectThresholdMarketCap from "../selectors/fundamentalSelectors/selectThresholdMarketCap";
import selectInterestCoverage from "../selectors/fundamentalSelectors/selectInterestCoverage";
import FormatRawNumber from "../components/FormatRawNumber";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import selectIsLargeCompany from "../selectors/fundamentalSelectors/selectIsLargeCompany";
import selectEstimatedCostOfDebt from "../selectors/fundamentalSelectors/selectEstimatedCostOfDebt";
import selectInterestSpread from "../selectors/fundamentalSelectors/selectInterestSpread";
import { InfoSyntheticRating } from "../components/InfoText";
import { InfoOutlinedIconWrapper } from "../components/InfoOutlinedIconWrapper";
import companiesInterestSpreads from "../shared/companiesInterestSpreads";
import SubSection from "../components/SubSection";
import getTableRowBackgroundOpacity from "../shared/getTableRowBackgroundOpacity";
import selectCurrentEquityRiskPremium from "../selectors/fundamentalSelectors/selectCurrentEquityRiskPremium";
import withFundamentalsLoaded from "../hoc/withFundamentalsLoaded";
import CompanyHeading from "../components/CompanyHeading";

const SyntheticCreditRating = () => {
  const currentEquityRiskPremiumCountry = useSelector(
    selectCurrentEquityRiskPremium,
  );
  const thresholdMarketCap = useSelector(selectThresholdMarketCap);
  const interestCoverage = useSelector(selectInterestCoverage);
  const isLargeCompany = useSelector(selectIsLargeCompany);
  const interestSpread = useSelector(selectInterestSpread);
  const estimatedCostOfDebt = useSelector(selectEstimatedCostOfDebt);
  const currentCompanyInterestIndex = companiesInterestSpreads.indexOf(
    interestSpread,
  );
  const syntheticRatingColumns = [
    {
      Header: (
        <Typography variant="h6">
          Large Companies (&gt;=&nbsp;
          <FormatRawNumberToMillion
            useCurrencySymbol
            value={thresholdMarketCap}
            suffix="m"
          />
          &nbsp;Market Capitalization)
        </Typography>
      ),
      columns: [
        {
          Header: "Interest Coverage From",
          accessor: "large.from",
        },
        {
          Header: "Interest Coverage To",
          accessor: "large.to",
        },
      ],
      id: "large",
    },
    {
      Header: (
        <Typography variant="h6">
          Smaller &amp; Riskier Companies (&lt;&nbsp;
          <FormatRawNumberToMillion
            useCurrencySymbol
            value={thresholdMarketCap}
            suffix="m"
          />
          &nbsp;Market Capitalization)
        </Typography>
      ),
      columns: [
        {
          Header: "Interest Coverage From",
          accessor: "small.from",
        },
        {
          Header: "Interest Coverage To",
          accessor: "small.to",
        },
      ],
      id: "small",
    },
    {
      Header: "Rating",
      accessor: "rating",
    },
    {
      Header: "Spread",
      accessor: "spread",
    },
  ];

  // TODO: Calculate whether riskier firm based on these fields as well:
  // - Past Volatile Earnings
  // - Risky industry
  return (
    <React.Fragment>
      <CompanyHeading />
      <SubSection>
        <Typography variant="h5" gutterBottom>
          <InfoOutlinedIconWrapper text={<InfoSyntheticRating />}>
            Synthetic Credit Rating Results
          </InfoOutlinedIconWrapper>
        </Typography>
        <Box>
          <BoldValueLabel
            value={isLargeCompany ? "Large Company" : "Small Company"}
            label="Size"
          />
          <BoldValueLabel
            value={
              interestCoverage === Infinity ||
              interestCoverage === -Infinity ? (
                interestCoverage
              ) : (
                <FormatRawNumber value={interestCoverage} />
              )
            }
            label="Interest Coverage"
          />
          <BoldValueLabel
            value={interestSpread.rating}
            label="Estimated Bond Rating"
          />
          <BoldValueLabel
            value={<FormatRawNumberToPercent value={interestSpread.spread} />}
            label="Estimated Company Default Spread"
          />
          <BoldValueLabel
            value={
              <FormatRawNumberToPercent
                value={currentEquityRiskPremiumCountry.adjDefaultSpread}
              />
            }
            label="Estimated Country Default Spread"
          />
          <BoldValueLabel
            value={<FormatRawNumberToPercent value={estimatedCostOfDebt} />}
            label="Estimated Pre-tax Cost of Debt"
          />
        </Box>
        <TTTable
          sx={{
            overflow: "auto",
            [`& .MuiTableBody-root .MuiTableRow-root.table_row_${currentCompanyInterestIndex}`]: {
              backgroundColor: (theme) =>
                getTableRowBackgroundOpacity(theme.palette.primary.light),
            },
          }}
          columns={syntheticRatingColumns}
          data={companiesInterestSpreads.map((companiesInterestSpread) => {
            return {
              ...companiesInterestSpread,
              spread: (
                <FormatRawNumberToPercent
                  value={companiesInterestSpread.spread}
                />
              ),
            };
          })}
        />
      </SubSection>
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(SyntheticCreditRating);
