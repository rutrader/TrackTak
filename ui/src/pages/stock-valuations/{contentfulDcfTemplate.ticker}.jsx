import React, { useEffect } from "react";
import { useLocation } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import ContainerDimensions from "react-container-dimensions";
import YouTube from "react-youtube";
import { graphql, Link as RouterLink } from "gatsby";
import {
  setFundamentalsDataThunk,
  setLastPriceClose,
} from "../../redux/actions/fundamentalsActions";
import CompanyOverviewStats from "../../components/CompanyOverviewStats";
import { Box, Link, Typography } from "@material-ui/core";
import ValueDrivingInputs, {
  cagrInYearsOneToFiveLabel,
  ebitTargetMarginInYearTenLabel,
  salesToCapitalRatioLabel,
  yearOfConvergenceLabel,
} from "../../components/ValueDrivingInputs";
import Section from "../../components/Section";
import FormatRawNumberToPercent from "../../components/FormatRawNumberToPercent";
import FormatRawNumberToYear from "../../components/FormatRawNumberToYear";
import FormatRawNumber from "../../components/FormatRawNumber";
import SubscribeMailingList from "../../components/SubscribeMailingList";
import FormatRawNumberToCurrency from "../../components/FormatRawNumberToCurrency";
import * as styles from "../../shared/valuation.module.scss";
import CostOfCapitalResults from "../../components/CostOfCapitalResults";
import dayjs from "dayjs";
import { getPrices } from "../../api/api";
import DiscountedCashFlowSheet from "../../discountedCashFlow/DiscountedCashFlowSheet";
import IndustryAveragesResults from "../../components/IndustryAveragesResults";
import selectPrice from "../../selectors/fundamentalSelectors/selectPrice";
import selectFundamentalsIsLoaded from "../../selectors/fundamentalSelectors/selectFundamentalsIsLoaded";
import selectCells from "../../selectors/dcfSelectors/selectCells";
import { Helmet } from "react-helmet";
import getTitle from "../../shared/getTitle";
import resourceName from "../../shared/resourceName";
import useVirtualExchange from "../../hooks/useVirtualExchange";

export const query = graphql`
  fragment ValuationInformation on ContentfulDcfTemplate {
    ticker
    salesToCapitalRatio
    ebitTargetMarginInYearTen
    cagrYearOneToFive
    dateOfValuation
    yearOfConvergence
    data {
      General {
        Name
        Description
        LogoURL
        Code
      }
    }
  }

  query ValuationQuery($ticker: String) {
    contentfulDcfTemplate(ticker: { eq: $ticker }) {
      ...ValuationInformation
      data {
        internal {
          content
        }
      }
      dateOfValuation
      extraBusinessDescription {
        raw
      }
      competitors {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            fixed(width: 1600) {
              width
              height
              src
              srcSet
            }
          }
        }
      }
      lookingForward {
        raw
      }
      relativeNumbers {
        raw
      }
      cagrYearOneToFiveDescription {
        childMdx {
          excerpt
        }
      }
      ebitTargetMarginInYearTenDescription {
        childMdx {
          excerpt
        }
      }
      salesToCapitalRatioDescription {
        childMdx {
          excerpt
        }
      }
      yearOfConvergenceDescription {
        childMdx {
          excerpt
        }
      }
    }
  }
`;

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      debugger;
      const { fields } = node.data.target;
      return null;
      // const { file } = fields;

      // return (
      //   <Box
      //     sx={{
      //       display: "flex",
      //       justifyContent: "center",
      //       my: 2,
      //     }}
      //   >
      //     <ContainerDimensions>
      //       {({ width }) => (
      //         <img src={`${file.url}?w=${width}`} alt={fields.title} />
      //       )}
      //     </ContainerDimensions>
      //   </Box>
      // );
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

const renderField = (field) => renderRichText(field, options);

const Valuation = ({ data }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const price = useSelector(selectPrice);
  const isLoaded = useSelector(selectFundamentalsIsLoaded);
  const estimatedValuePerShare = useSelector(
    (state) => selectCells(state).B36.value,
  );
  const exchange = useVirtualExchange();
  const {
    ticker,
    dateOfValuation,
    data: financialData,
    yearOfConvergence,
    salesToCapitalRatio,
    cagrYearOneToFive,
    ebitTargetMarginInYearTen,
    extraBusinessDescription,
    competitors,
    lookingForward,
    relativeNumbers,
    cagrYearOneToFiveDescription,
    ebitTargetMarginInYearTenDescription,
    salesToCapitalRatioDescription,
    yearOfConvergenceDescription,
  } = data.contentfulDcfTemplate;

  const parsedFinancialData = JSON.parse(financialData.internal.content);
  const { General: general } = parsedFinancialData;

  useEffect(() => {
    const fetchStockData = async () => {
      dispatch(
        setFundamentalsDataThunk({
          data: parsedFinancialData,
          ticker,
          tenYearGovernmentBondLastCloseTo: dateOfValuation,
        }),
      );
      const res = await getPrices(ticker, {
        to: dateOfValuation,
        filter: "last_close",
      });
      dispatch(setLastPriceClose(res.data.value));
    };
    fetchStockData();
  }, [financialData, dateOfValuation, dispatch, ticker, parsedFinancialData]);

  if (!isLoaded) return null;

  const marginOfSafety =
    (estimatedValuePerShare - price) / estimatedValuePerShare;
  const formattedDateOfValuation = dayjs(dateOfValuation).format(
    "Do MMM. YYYY",
  );

  return (
    <>
      <Helmet>
        <title>{getTitle(`${general.Name} Valuation`)}</title>
        <link
          rel="canonical"
          href={`${resourceName}/stock-valuations/${`${general.Code}-${exchange}`.toLowerCase()}${
            location.search
          }`}
        />
      </Helmet>
      <CompanyOverviewStats dateOfValuation={formattedDateOfValuation} />
      <Section>
        <Typography variant="h5" gutterBottom>
          Business Description
        </Typography>
        <Typography paragraph>{general.Description}</Typography>
        {extraBusinessDescription && (
          <Typography paragraph>
            {renderField(extraBusinessDescription)}
          </Typography>
        )}
      </Section>
      <Section>
        <Typography variant="h5" gutterBottom>
          Competitors
        </Typography>
        <Typography paragraph>{renderField(competitors)}</Typography>
      </Section>
      <Section sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Get notified immediately when we post a valuation.
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <b>Free</b>&nbsp;forever.
            </Box>
          </Typography>
          <SubscribeMailingList
            subscribeText="Sign Up"
            locationSignup="Valuation"
          />
        </Box>
      </Section>
      {lookingForward && (
        <Section>
          <Typography variant="h5" gutterBottom>
            Looking Forward
          </Typography>
          <Typography paragraph>{renderField(lookingForward)}</Typography>
        </Section>
      )}
      {relativeNumbers && (
        <Section>
          <Typography variant="h5" gutterBottom>
            Relative Numbers
          </Typography>
          <Typography paragraph>{renderField(relativeNumbers)}</Typography>
        </Section>
      )}
      <Section>
        <Typography variant="h5" gutterBottom>
          The input values I chose for the DCF
        </Typography>
        <Typography variant="h6" gutterBottom>
          {cagrInYearsOneToFiveLabel}
        </Typography>
        <Typography paragraph>
          <NumberSpan>
            <FormatRawNumberToPercent value={cagrYearOneToFive} />
          </NumberSpan>
          {cagrYearOneToFiveDescription.childMdx.excerpt}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {ebitTargetMarginInYearTenLabel}
        </Typography>
        <Typography paragraph>
          <NumberSpan>
            <FormatRawNumberToPercent value={ebitTargetMarginInYearTen} />
          </NumberSpan>
          {ebitTargetMarginInYearTenDescription.childMdx.excerpt}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {yearOfConvergenceLabel}
        </Typography>
        <Typography paragraph>
          <NumberSpan>
            <FormatRawNumberToYear value={yearOfConvergence} />
          </NumberSpan>
          {yearOfConvergenceDescription.childMdx.excerpt}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {salesToCapitalRatioLabel}
        </Typography>
        <Typography paragraph>
          <NumberSpan>
            <FormatRawNumber decimalScale={2} value={salesToCapitalRatio} />
          </NumberSpan>
          {salesToCapitalRatioDescription.childMdx.excerpt}
        </Typography>
      </Section>
      <Section>
        <IndustryAveragesResults />
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
        </Typography>
        <Typography paragraph gutterBottom>
          On the <b>{formattedDateOfValuation}</b> they traded for&nbsp;
          <b>
            <FormatRawNumberToCurrency value={price} />
          </b>
          &nbsp;a share which gives a margin of safety of&nbsp;
          <b>
            <FormatRawNumberToPercent value={marginOfSafety} />
          </b>
          .
        </Typography>
        <Typography>
          <Link
            component={RouterLink}
            to={`/stock/${general.Code}.${exchange}${location.search}/discounted-cash-flow`}
          >
            <b>Click here&nbsp;</b>
          </Link>
          to do your own Automated DCF for any company you want.
        </Typography>
      </Section>
    </>
  );
};

export default Valuation;
