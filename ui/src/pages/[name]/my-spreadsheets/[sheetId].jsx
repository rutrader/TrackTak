import React, { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { Helmet } from "react-helmet";
import getTitle from "../../../shared/getTitle";
import { useDispatch } from "react-redux";
import useLocalStorageState from "use-local-storage-state";
import Spreadsheet from "../../../../../packages/intrinsic-valuations/src/spreadsheet/SpreadsheetContainer";
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

  return spreadsheetData?.sheetData?.name ? (
    <>
      <Helmet>
        <title>
          {getTitle(`${spreadsheetData?.sheetData?.name} Spreadsheet`)}
        </title>
      </Helmet>
      <Spreadsheet
        ticker={spreadsheetData?.sheetData?.name}
        isSaving={isSaving}
        onSaveEvent={handleSave}
        spreadsheetToRestore={spreadsheetData}
        disableSetQueryParams={true}
      />
    </>
  ) : null;
};

export default withAuthentication(SpreadsheetPage);
