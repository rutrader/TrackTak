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
  const [spreadsheet] = useFetchSpreadsheet(sheetId);
  const saveSheetData = usePersistSpreadsheet(
    sheetId,
    spreadsheet?.financialData?._id,
  );

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
      {spreadsheet?.sheetData.name && (
        <Helmet>
          <title>{getTitle(`${spreadsheet.sheetData.name} Spreadsheet`)}</title>
        </Helmet>
      )}
      <Spreadsheet
        saveSheetData={saveSheetData}
        sheetData={spreadsheet?.sheetData}
        financialData={spreadsheet?.financialData}
      />
    </>
  );
};

export default withAuthentication(SpreadsheetPage);
