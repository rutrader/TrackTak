import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import ContainerDimensions from "react-container-dimensions";
import YouTube from "react-youtube";
import { Link as RouterLink } from "react-router-dom";

import {
  setFundamentalsDataThunk,
  setLastPriceClose,
} from "../redux/actions/fundamentalsActions";
import CompanyOverviewStats from "../components/CompanyOverviewStats";
import { Box, Link, Typography, useTheme } from "@material-ui/core";
import ValueDrivingInputs, {
  cagrInYearsOneToFiveLabel,
  ebitTargetMarginInYearTenLabel,
  salesToCapitalRatioLabel,
  yearOfConvergenceLabel,
} from "../components/ValueDrivingInputs";
import Section from "../components/Section";
import FormatRawNumberToPercent from "../components/FormatRawNumberToPercent";
import FormatRawNumberToYear from "../components/FormatRawNumberToYear";
import FormatRawNumber from "../components/FormatRawNumber";
import SubscribeMailingList from "../components/SubscribeMailingList";
import FormatRawNumberToCurrency from "../components/FormatRawNumberToCurrency";
import * as styles from "./Valuation.module.scss";
import CostOfCapitalResults from "../components/CostOfCapitalResults";
import dayjs from "dayjs";
import { getContentfulEntries, getPrices } from "../api/api";
import { pretaxCostOfDebtLabel } from "../components/OptionalInputs";
import DiscountedCashFlowSheet from "../discountedCashFlow/DiscountedCashFlowSheet";
import IndustryAverages from "../components/IndustryAverages";
import selectPrice from "../selectors/fundamentalSelectors/selectPrice";
import selectGeneral from "../selectors/fundamentalSelectors/selectGeneral";
import selectCells from "../selectors/dcfSelectors/selectCells";
import { Helmet } from "react-helmet";
import getTitle from "../shared/getTitle";
import resourceName from "../shared/resourceName";
import useVirtualExchange from "../hooks/useVirtualExchange";

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
  const [fields, setContentfulFields] = useState();
  const price = useSelector(selectPrice);
  const general = useSelector(selectGeneral);
  const estimatedValuePerShare = useSelector(
    (state) => selectCells(state).B36.value
  );
  const exchange = useVirtualExchange();

  useEffect(() => {
    const fetchStockData = async () => {
      const contentfulRes = await getContentfulEntries({
        "fields.ticker": params.ticker,
        content_type: "dcfTemplate",
      });
      const fields = contentfulRes.data.items.find(
        ({ fields }) => fields.ticker === params.ticker
      ).fields;
      const data = fields.data;
      const ticker = params.ticker;

      dispatch(
        setFundamentalsDataThunk({
          data,
          ticker,
          tenYearGovernmentBondLastCloseTo: fields.dateOfValuation,
        })
      );
      const res = await getPrices(ticker, {
        to: fields.dateOfValuation,
        filter: "last_close",
      });

      dispatch(setLastPriceClose(res.data.value));

      setContentfulFields(fields);
    };
    fetchStockData();
  }, [dispatch, params.ticker]);

  if (!general || !fields) return null;

  const marginOfSafety =
    (estimatedValuePerShare - price) / estimatedValuePerShare;
  const formattedDateOfValuation = dayjs(fields.dateOfValuation).format(
    "Do MMM. YYYY"
  );

  return (
    <>
      <Helmet>
        <title>{getTitle(`${general.Name} Valuation`)}</title>
        <link
          rel="canonical"
          href={`${resourceName}/stock-valuations/${general.Code}.${exchange}${location.search}`}
        />
      </Helmet>
      <CompanyOverviewStats dateOfValuation={formattedDateOfValuation} />
      <Section>
        <Typography variant="h5" gutterBottom>
          Business Description
        </Typography>
        <Typography paragraph>{general.Description}</Typography>
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
        {fields.pretaxCostOfDebt && (
          <>
            <Typography variant="h6" gutterBottom>
              {pretaxCostOfDebtLabel}
            </Typography>
            <Typography paragraph>
              <NumberSpan>
                <FormatRawNumberToPercent value={fields.pretaxCostOfDebt} />
              </NumberSpan>
              {fields.pretaxCostOfDebtDescription}
            </Typography>
          </>
        )}
      </Section>
      <Section>
        <IndustryAverages />
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
        <DiscountedCashFlowSheet
          columnWidths={{
            B: 90,
          }}
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
            <FormatRawNumberToCurrency value={estimatedValuePerShare} />
          </b>
          &nbsp;per share.
          <Box>
            On the <b>{formattedDateOfValuation}</b> they traded for&nbsp;
            <b>
              <FormatRawNumberToCurrency value={price} />
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
            <b>Click here&nbsp;</b>
          </Link>
          to do your own Automated DCF for any company you want or see more
          valuations from us
          <Link component={RouterLink} to="/stock-valuations">
            <b>&nbsp;here</b>
          </Link>
          .
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
