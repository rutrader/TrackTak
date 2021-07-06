import React, { useEffect, useState } from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import {
  DiscountedCashFlowSheet,
  withFundamentalsLoaded,
  useTicker,
} from "@tracktak/intrinsic-valuations";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/actions/snackbarActions";
import useLocalStorageState from "use-local-storage-state";
import AuthenticationFormDialog from "./AuthenticationFormDialog";
import { useAuth } from "../hooks/useAuth";
import { AUTHENTICATION_FORM_STATE } from "./Authentication";
import { saveValuation } from "../api/api";

const DiscountedCashFlow = () => {
  const [rotateSnackbarShown, setRotateSnackbarShown] = useLocalStorageState(
    "rotateSnackbarShown",
  );
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const ticker = useTicker();
  const { isAuthenticated, session } = useAuth();
  const [showAuthenticationDialog, setShowAuthenticationDialog] = useState(
    false,
  );
  const [isSaving, setIsSaving] = useState(false);
  const [spreadsheetDataToSave, setSpreadsheetDataToSave] = useState();

  const handleSave = (data) => {
    setSpreadsheetDataToSave(data);
  };

  const handleSaveClick = async () => {
    setShowAuthenticationDialog(true);
  };

  useEffect(() => {
    async function persistSpreadsheetData() {
      await saveValuation(
        { name: ticker, data: spreadsheetDataToSave },
        session?.getAccessToken()?.jwtToken,
      );
      setIsSaving(false);
    }
    if (isAuthenticated) {
      setIsSaving(true);
      persistSpreadsheetData();
    }
  }, [isAuthenticated, session, spreadsheetDataToSave, ticker]);

  const onSignInSuccess = () => {
    setShowAuthenticationDialog(false);
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
    <React.Fragment>
      <AuthenticationFormDialog
        open={showAuthenticationDialog}
        initialState={AUTHENTICATION_FORM_STATE.SIGN_IN}
        onClose={onSignInSuccess}
      />
      <DiscountedCashFlowSheet
        showSaveButton={!isAuthenticated}
        onSaveClick={handleSaveClick}
        isSaving={isSaving}
        onSaveEvent={handleSave}
      />
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(DiscountedCashFlow);
