import React, { useEffect } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import SubscribeMailingList from "../../../components/SubscribeMailingList";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import resourceName from "../../../shared/resourceName";
import { Section, selectGeneral } from "@tracktak/intrinsic-valuations";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useLocalStorageState from "use-local-storage-state";
import { setMessage } from "../../../redux/actions/snackbarActions";
import Spreadsheet from "../../../../../packages/intrinsic-valuations/src/spreadsheet/SpreadsheetContainer";
import selectFundamentalsIsLoaded from "../../../../../packages/intrinsic-valuations/src/selectors/fundamentalSelectors/selectIsFundamentalsLoaded";
import convertHyphenTickerToDot from "../../../shared/convertHyphenTickerToDot";

const DiscountedCashFlowPage = ({ ticker }) => {
  const general = useSelector(selectGeneral);
  const [rotateSnackbarShown, setRotateSnackbarShown] = useLocalStorageState(
    "rotateSnackbarShown",
  );
  const isLoaded = useSelector(selectFundamentalsIsLoaded);
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!rotateSnackbarShown && isOnMobile) {
      setRotateSnackbarShown(true);

      dispatch(
        setMessage({
          message: "Rotate your device for best viewing",
        }),
      );
    }
  }, [dispatch, isOnMobile, rotateSnackbarShown, setRotateSnackbarShown]);

  return (
    <>
      {isLoaded && (
        <Helmet>
          <title>
            {getTitle(`${general.name} Discounted Cash Flow (DCF)`)}
          </title>
          <link
            rel="canonical"
            href={`${resourceName}/discounted-cash-flow/${ticker}`}
          />
          <meta
            name="description"
            content={`Do your own Automated DCF for ${general.name}. Based on Aswath Damodaran's excel spreadsheets.`}
          />
        </Helmet>
      )}
      <Spreadsheet ticker={convertHyphenTickerToDot(ticker)} />
      {isLoaded && (
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
              style={{ fontWeight: "bold" }}
            >
              Want to keep up to date on the newest features?
            </Typography>
            <SubscribeMailingList
              subscribeText="Join"
              locationSignup="Discounted Cash Flow"
            />
          </Box>
        </Section>
      )}
    </>
  );
};

export default DiscountedCashFlowPage;
