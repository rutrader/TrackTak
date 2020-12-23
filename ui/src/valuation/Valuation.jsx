import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import ContainerDimensions from "react-container-dimensions";
import YouTube from "react-youtube";
import { Link as RouterLink } from "react-router-dom";

import axios from "../axios/axios";
import { setFundamentals } from "../redux/actions/fundamentalsActions";
import CompanyOverviewStats from "../components/CompanyOverviewStats";
import { Box, Link, Typography, useTheme } from "@material-ui/core";
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
import FormatRawNumberToCurrency from "../components/FormatRawNumberToCurrency";
import * as styles from "./Valuation.module.scss";
import CostOfCapitalResults from "../components/CostOfCapitalResults";

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { fields } = node.data.target;
      const { file } = fields;

      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 2,
          }}
        >
          <ContainerDimensions>
            {({ width }) => (
              <img src={`${file.url}?w=${width}`} alt={fields.title} />
            )}
          </ContainerDimensions>
        </Box>
      );
    },
    [INLINES.HYPERLINK]: (node) => {
      if (node.data.uri.includes("youtube.com")) {
        const videoId = node.data.uri.split("v=")[1];
        console.log(styles);
        return (
          <Box sx={{ mt: 2 }}>
            <YouTube
              containerClassName={styles.videoWrapper}
              videoId={videoId}
              opts={{
                width: 1500,
                height: 600,
              }}
            />
          </Box>
        );
      }
      return node;
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
        dispatch(setFundamentals(contentfulData.data.fields.data));
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
  const { fields } = contentfulData;

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
  // TODO: share this with the B38 cell calculation
  const marginOfSafety =
    (fields.estimatedValuePerShare - fundamentals.price) /
    fields.estimatedValuePerShare;

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
            <FormatRawNumberToPercent value={fields.cagrYearOneToFive} />
          </NumberSpan>
          {fields.cagrYearOneToFiveDescription}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {ebitTargetMarginInYearTenLabel}
        </Typography>
        <Typography paragraph>
          <NumberSpan>
            <FormatRawNumberToPercent
              value={fields.ebitTargetMarginInYearTen}
            />
          </NumberSpan>
          {fields.ebitTargetMarginInYearTenDescription}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {yearOfConvergenceLabel}
        </Typography>
        <Typography paragraph>
          <NumberSpan>
            <FormatRawNumberToYear value={fields.yearOfConvergence} />
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
              value={fields.salesToCapitalRatio}
            />
          </NumberSpan>
          {fields.salesToCapitalRatioDescription}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {pretaxCostOfDebtLabel}
        </Typography>
        <Typography paragraph>
          <NumberSpan>
            <FormatRawNumberToPercent value={fields.pretaxCostOfDebt} />
          </NumberSpan>
          {fields.pretaxCostOfDebtDescription}
        </Typography>
      </Section>
      <Section>
        <CostOfCapitalResults />
      </Section>
      <Section>
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
        <Typography paragraph gutterBottom>
          I have estimated the shares to have a share price of
          <b>
            &nbsp;
            <FormatRawNumberToCurrency value={fields.estimatedValuePerShare} />
          </b>
          &nbsp;per share.
          <Box>
            They currently trade for&nbsp;
            <b>
              <FormatRawNumberToCurrency value={fundamentals.price} />
            </b>
            &nbsp;a share which gives a margin of safety of&nbsp;
            <b>
              <FormatRawNumberToPercent value={marginOfSafety} />
            </b>
            .
          </Box>
        </Typography>
        <Typography>
          <Link component={RouterLink} to="/">
            <b>
              Click here to do your own Automated DCF for any company you want.
            </b>
          </Link>
        </Typography>
      </Section>
      <Section sx={{ display: "flex", mt: 4 }}>
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
