import React, { useEffect } from "react";
import { useLocation } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import YouTube from "react-youtube";
import { graphql, Link as RouterLink } from "gatsby";
import { Box, Link, Typography } from "@material-ui/core";
import {
  CompanyOverviewStats,
  ValueDrivingInputs,
  cagrInYearsOneToFiveLabel,
  ebitTargetMarginInYearTenLabel,
  salesToCapitalRatioLabel,
  yearOfConvergenceLabel,
  Section,
  FormatRawNumberToPercent,
  FormatRawNumberToYear,
  FormatRawNumber,
  FormatRawNumberToCurrency,
  CostOfCapitalResults,
  DiscountedCashFlowSheet,
  IndustryAveragesResults,
  selectPrice,
  selectCells,
  setFundamentals,
} from "@tracktak/dcf-react";
import SubscribeMailingList from "../../components/SubscribeMailingList";
import * as styles from "./valuation.module.scss";
import dayjs from "dayjs";
import { Helmet } from "react-helmet";
import getTitle from "../../shared/getTitle";
import resourceName from "../../shared/resourceName";
import Img from "gatsby-image";
import ReactMarkdown from "react-markdown";
import {
  getLastPriceCloseThunk,
  getTenYearGovernmentBondLastCloseThunk,
} from "../../redux/thunks/fundamentalsThunks";
import convertFundamentals from "../../shared/convertFundamentals";

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
        CountryISO
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
            fluid(maxWidth: 3080, quality: 90) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
      lookingForward {
        raw
      }
      relativeNumbers {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            fluid(maxWidth: 3080, quality: 90) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
      cagrYearOneToFiveDescription {
        childMarkdownRemark {
          html
        }
      }
      ebitTargetMarginInYearTenDescription {
        childMarkdownRemark {
          html
        }
      }
      salesToCapitalRatioDescription {
        childMarkdownRemark {
          html
        }
      }
      yearOfConvergenceDescription {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      return <Img {...node.data.target} />;
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

const renderHtml = (html) => {
  return <ReactMarkdown allowDangerousHtml>{html}</ReactMarkdown>;
};

const Container = ({ sx, ...props }) => (
  <Typography paragraph sx={{ display: "flex" }} {...props} />
);

const renderField = (field) => renderRichText(field, options);

const Valuation = ({ data }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const price = useSelector(selectPrice);
  const estimatedValuePerShare = useSelector(
    (state) => selectCells(state).B36.value,
  );
  const {
    ticker,
    dateOfValuation,
    yearOfConvergence,
    salesToCapitalRatio,
    cagrYearOneToFive,
    data: financialData,
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

  useEffect(() => {
    const data = JSON.parse(financialData.internal.content);

    dispatch(setFundamentals(convertFundamentals(data)));

    dispatch(
      getTenYearGovernmentBondLastCloseThunk({
        countryISO: financialData.General.CountryISO,
        params: {
          to: dateOfValuation,
        },
      }),
    );

    dispatch(
      getLastPriceCloseThunk({
        ticker,
        params: {
          to: dateOfValuation,
        },
      }),
    );
  }, [
    dateOfValuation,
    dispatch,
    ticker,
    financialData.General.CountryISO,
    financialData,
  ]);

  const marginOfSafety =
    (estimatedValuePerShare - price) / estimatedValuePerShare;
  const formattedDateOfValuation = dayjs(dateOfValuation).format(
    "Do MMM. YYYY",
  );

  return (
    <React.Fragment>
      <Helmet>
        <title>{getTitle(`${financialData.General.Name} Valuation`)}</title>
        <link
          rel="canonical"
          href={`${resourceName}/stock-valuations/${ticker}${location.search}`}
        />
      </Helmet>
      <CompanyOverviewStats dateOfValuation={formattedDateOfValuation} />
      <Section>
        <Typography variant="h5" gutterBottom>
          Business Description
        </Typography>
        <Typography paragraph>{financialData.General.Description}</Typography>
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
        <Container>
          <NumberSpan>
            <FormatRawNumberToPercent value={cagrYearOneToFive} />
          </NumberSpan>
          {renderHtml(cagrYearOneToFiveDescription.childMarkdownRemark.html)}
        </Container>
        <Typography variant="h6" gutterBottom>
          {ebitTargetMarginInYearTenLabel}
        </Typography>
        <Container>
          <NumberSpan>
            <FormatRawNumberToPercent value={ebitTargetMarginInYearTen} />
          </NumberSpan>
          {renderHtml(
            ebitTargetMarginInYearTenDescription.childMarkdownRemark.html,
          )}
        </Container>
        <Typography variant="h6" gutterBottom>
          {yearOfConvergenceLabel}
        </Typography>
        <Container>
          <NumberSpan>
            <FormatRawNumberToYear value={yearOfConvergence} />
          </NumberSpan>
          {renderHtml(yearOfConvergenceDescription.childMarkdownRemark.html)}
        </Container>
        <Typography variant="h6" gutterBottom>
          {salesToCapitalRatioLabel}
        </Typography>
        <Container>
          <NumberSpan>
            <FormatRawNumber decimalScale={2} value={salesToCapitalRatio} />
          </NumberSpan>
          {renderHtml(salesToCapitalRatioDescription.childMarkdownRemark.html)}
        </Container>
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
            to={`/stock/${ticker}/discounted-cash-flow${location.search}`}
          >
            <b>Click here&nbsp;</b>
          </Link>
          to do your own Automated DCF for any company you want.
        </Typography>
      </Section>
    </React.Fragment>
  );
};

export default Valuation;