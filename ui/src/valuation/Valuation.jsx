import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

import axios from "../axios/axios";
import { getFundamentals } from "../redux/actions/fundamentalsActions";
import CompanyOverviewStats from "../components/CompanyOverviewStats";
import { Box, Typography, useTheme } from "@material-ui/core";
import ValueDrivingInputs, {
  cagrInYearsOneToFiveLabel,
  ebitTargetMarginInYearTenLabel,
  pretaxCostOfDebtLabel,
  salesToCapitalRatioLabel,
  yearOfConvergenceLabel,
} from "../components/ValueDrivingInputs";
import parseInputQueryParams from "../shared/parseInputQueryParams";
import Section from "../components/Section";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import FormatRawNumberToYear from "../components/FormatRawNumberToYear";
import FormatRawNumber from "../components/FormatRawNumber";
import DiscountedCashFlowSheet from "../discountedCashFlow/DiscountedCashFlowSheet";
import calculateCostOfCapital from "../shared/calculateCostOfCapital";
import blackScholes from "../shared/blackScholesModel";
import SubscribeMailingList from "../components/SubscribeMailingList";

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { fields } = node.data.target;
      const { file } = fields;
      const { image } = file.details;

      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 2,
          }}
        >
          <img
            width={image.width}
            height={image.height}
            src={file.url}
            alt={fields.title}
          />
        </Box>
      );
    },
  },
};

const NumberSpan = ({ children, ...props }) => {
  return (
    <>
      <Box component="span" style={{ fontWeight: "bold" }} {...props}>
        {children}
      </Box>
      &nbsp;-&nbsp;
    </>
  );
};

const Valuation = () => {
  const params = useParams();
  const location = useLocation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [contentfulData, setContentfulData] = useState();
  const fundamentals = useSelector((state) => state.fundamentals);
  const queryParams = parseInputQueryParams(location);
  const economicData = useSelector((state) => state.economicData);
  const equityRiskPremium = useSelector((state) => state.equityRiskPremium);
  const industryAverages = useSelector((state) => state.industryAverages);
  const inputQueryParams = parseInputQueryParams(location);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const contentfulData = await axios.get(
          `/api/v1/contentful/getEntry/${params.id}`
        );
        dispatch(getFundamentals(contentfulData.data.fields.ticker));
        setContentfulData(contentfulData.data);
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    fetchStockData();
  }, [dispatch, params.id]);

  if (!fundamentals.data || !contentfulData) return null;

  const { SharesStats, General } = fundamentals.data;

  const riskFreeRate =
    economicData.governmentBondTenYearLastClose / 100 -
    equityRiskPremium.currentCountry.adjDefaultSpread;
  const valuePerOption = blackScholes(
    "call",
    fundamentals.price,
    inputQueryParams.averageStrikePrice,
    inputQueryParams.averageMaturityOfOptions,
    riskFreeRate,
    industryAverages.currentIndustry.standardDeviationInStockPrices
  );
  const { fields } = contentfulData;
  const { costOfCapital } = calculateCostOfCapital(
    fundamentals,
    inputQueryParams,
    SharesStats,
    equityRiskPremium,
    riskFreeRate,
    industryAverages.currentIndustry
  );
  const valueOfAllOptionsOutstanding =
    valuePerOption * inputQueryParams.numberOfOptionsOutstanding;

  return (
    <>
      <CompanyOverviewStats dateOfValuation={fields.dateOfValuation} />
      <Section>
        <Typography variant="h5" gutterBottom>
          Business Description
        </Typography>
        <Typography paragraph>{General.Description}</Typography>
      </Section>
      <Section>
        <Typography variant="h5" gutterBottom>
          Competitors
        </Typography>
        <Typography paragraph>
          {documentToReactComponents(fields.competitors, options)}
        </Typography>
      </Section>
      <Section>
        <Typography variant="h5" gutterBottom>
          The input values I chose for the DCF
        </Typography>
        <Typography variant="h6" gutterBottom>
          {cagrInYearsOneToFiveLabel}
        </Typography>
        <Typography paragraph>
          <NumberSpan>
            <FormatRawNumberToPercent value={queryParams.cagrYearOneToFive} />
          </NumberSpan>
          {fields.cagrYearOneToFiveDescription}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {ebitTargetMarginInYearTenLabel}
        </Typography>
        <Typography paragraph>
          <NumberSpan>
            <FormatRawNumberToPercent
              value={queryParams.ebitTargetMarginInYearTen}
            />
          </NumberSpan>
          {fields.ebitTargetMarginInYearTenDescription}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {yearOfConvergenceLabel}
        </Typography>
        <Typography paragraph>
          <NumberSpan>
            <FormatRawNumberToYear value={queryParams.yearOfConvergence} />
          </NumberSpan>
          {fields.yearOfConvergenceDescription}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {salesToCapitalRatioLabel}
        </Typography>
        <Typography paragraph>
          <NumberSpan>
            <FormatRawNumber
              decimalScale={2}
              value={queryParams.salesToCapitalRatio}
            />
          </NumberSpan>
          {fields.salesToCapitalRatioDescription}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {pretaxCostOfDebtLabel}
        </Typography>
        <Typography paragraph>
          <NumberSpan>
            <FormatRawNumberToPercent value={queryParams.pretaxCostOfDebt} />
          </NumberSpan>
          {fields.pretaxCostOfDebtDescription}
        </Typography>
      </Section>
      <Section>
        <Typography variant="h5" gutterBottom>
          Value Driving Inputs
        </Typography>
        <ValueDrivingInputs />
        <Box sx={{ mt: 1 }}>
          <Typography paragraph>
            <b>Hint:</b> Have a play with the above inputs yourself and see how
            the valuation changes.
          </Typography>
        </Box>
      </Section>
      <Section>
        <Typography variant="h5" gutterBottom>
          DCF Valuation
        </Typography>
        {/* TODO: Add an expand button to see it full screen */}
        <DiscountedCashFlowSheet
          columnWidths={{
            B: 90,
          }}
          riskFreeRate={riskFreeRate}
          costOfCapital={costOfCapital}
          valueOfAllOptionsOutstanding={valueOfAllOptionsOutstanding}
        />
      </Section>
      <Section>
        <Typography variant="h5" gutterBottom>
          Conclusion
        </Typography>
        <Typography paragraph>
          I have estimated the shares to have a share price of $127.57 per
          share. They currently trade for $83.05 a share which gives a margin of
          safety of 34.9%.
        </Typography>
      </Section>
      <Section sx={{ display: "flex", mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{ fontWeight: theme.typography.fontWeightBold }}
          >
            Get notified immediately when we post a valuation.
          </Typography>
          <SubscribeMailingList subscribeText="Sign Up" />
        </Box>
      </Section>
    </>
  );
};

export default Valuation;
