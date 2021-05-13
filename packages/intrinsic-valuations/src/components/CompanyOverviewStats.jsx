import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import withFundamentalsLoaded from "../hoc/withFundamentalsLoaded";
import selectGeneral from "../selectors/fundamentalSelectors/selectGeneral";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import selectSharesOutstanding from "../selectors/fundamentalSelectors/selectSharesOutstanding";
import selectValuationCurrencyCode from "../selectors/fundamentalSelectors/selectValuationCurrencyCode";
import BoldValueLabel from "./BoldValueLabel";
import FormatRawNumber from "./FormatRawNumber";
import FormatRawNumberToMillion from "./FormatRawNumberToMillion";
import { InfoOutlinedIconWrapper } from "./InfoOutlinedIconWrapper";
import SubSection from "../components/SubSection";
import ShowMore from "react-show-more";
import CompanyHeading from "./CompanyHeading";

const CompanyOverviewStats = ({ extraDescription, useDescriptionShowMore }) => {
  const general = useSelector(selectGeneral);
  const price = useSelector(selectPrice);
  const sharesOutstanding = useSelector(selectSharesOutstanding);
  const valuationCurrencyCode = useSelector(selectValuationCurrencyCode);

  return (
    <React.Fragment>
      <CompanyHeading />
      <SubSection>
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
      </SubSection>
      <Box>
        <Typography variant="h5" gutterBottom>
          Business Description
        </Typography>
        <Typography component="div" paragraph>
          {useDescriptionShowMore ? (
            <ShowMore lines={8} more="Show more" less="Show less">
              {general.description}
            </ShowMore>
          ) : (
            general.description
          )}
        </Typography>
        {extraDescription}
      </Box>
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(CompanyOverviewStats);
