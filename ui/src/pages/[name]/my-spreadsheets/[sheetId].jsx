import React, { useState, useEffect } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import resourceName from "../../../shared/resourceName";
import { Section, selectGeneral } from "@tracktak/intrinsic-valuations";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useLocalStorageState from "use-local-storage-state";
import Spreadsheet from "../../../../../packages/intrinsic-valuations/src/spreadsheet/SpreadsheetContainer";
import selectFundamentalsIsLoaded from "../../../../../packages/intrinsic-valuations/src/selectors/fundamentalSelectors/selectIsFundamentalsLoaded";
import useFetchSpreadsheet from "../../../hooks/useFetchSpreadsheet";
import usePersistSpreadsheet from "../../../hooks/usePersistSpreadsheet";
import SubscribeMailingList from "../../../components/SubscribeMailingList";
import { setMessage } from "../../../redux/actions/snackbarActions";
import convertHyphenTickerToDot from "../../../shared/convertHyphenTickerToDot";
import withAuthentication from "../../../hocs/withAuthentication";

const SpreadsheetPage = ({ name, sheetId }) => {
  const general = useSelector(selectGeneral);
  const [rotateSnackbarShown, setRotateSnackbarShown] = useLocalStorageState(
    "rotateSnackbarShown",
  );
  const isLoaded = useSelector(selectFundamentalsIsLoaded);
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const [spreadsheetDataToSave, setSpreadsheetDataToSave] = useState();
  const [spreadsheetData] = useFetchSpreadsheet(sheetId);
  const [isSaving] = usePersistSpreadsheet(
    spreadsheetData?.sheetData?.name,
    spreadsheetDataToSave,
    sheetId,
  );

  const handleSave = (data) => {
    setSpreadsheetDataToSave(data);
  };

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
            href={`${resourceName}/${name}/my-spreadsheets/${sheetId}`}
          />
          <meta
            name="description"
            content={`Do your own Automated DCF for ${general.name}. Based on Aswath Damodaran's excel spreadsheets.`}
          />
        </Helmet>
      )}
      {spreadsheetData?.sheetData?.name && (
        <Spreadsheet
          ticker={convertHyphenTickerToDot(spreadsheetData?.sheetData?.name)}
          isSaving={isSaving}
          onSaveEvent={handleSave}
          spreadsheetToRestore={spreadsheetData}
          disableSetQueryParams={true}
        />
      )}
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

export default withAuthentication(SpreadsheetPage);
