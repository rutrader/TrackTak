import React, { useEffect } from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import { useDispatch } from "react-redux";
import useLocalStorageState from "use-local-storage-state";
import Spreadsheet from "../../../../../packages/intrinsic-valuations/src/spreadsheet/Spreadsheet";
import useFetchSpreadsheet from "../../../hooks/useFetchSpreadsheet";
import usePersistSpreadsheet from "../../../hooks/usePersistSpreadsheet";
import { setMessage } from "../../../redux/actions/snackbarActions";
import withAuthentication from "../../../hocs/withAuthentication";

const SpreadsheetPage = ({ sheetId }) => {
  const [rotateSnackbarShown, setRotateSnackbarShown] = useLocalStorageState(
    "rotateSnackbarShown",
  );
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const [spreadsheetData] = useFetchSpreadsheet(sheetId);
  const { isSaving, persistSpreadsheetData } = usePersistSpreadsheet(sheetId);

  const handleSave = (data) => {
    persistSpreadsheetData(spreadsheetData.sheetData.name, data);
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
      {spreadsheetData?.sheetData?.name && (
        <Helmet>
          <title>
            {getTitle(`${spreadsheetData.sheetData.name} Spreadsheet`)}
          </title>
        </Helmet>
      )}
      <Spreadsheet
        ticker={spreadsheetData?.sheetData?.name}
        isSaving={isSaving}
        onSave={handleSave}
        spreadsheetToRestore={spreadsheetData}
      />
    </>
  );
};

export default withAuthentication(SpreadsheetPage);
