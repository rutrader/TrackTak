import React, { useEffect, useState } from "react";
import {
  Box,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import {
  CompanyOverviewStats,
  DiscountedCashFlowSheet,
  IndustryAveragesResults,
  FinancialsSummary,
  Section,
  SubSection,
  withFundamentalsLoaded,
  useTicker,
} from "@tracktak/intrinsic-valuations";
import { Link as RouterLink } from "gatsby";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/actions/snackbarActions";
import { useLocation } from "@reach/router";
import SubscribeCover from "./SubscribeCover";
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
  const location = useLocation();
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
      <CompanyOverviewStats useDescriptionShowMore />
      <Section>
        <FinancialsSummary />
        <Box sx={{ mt: 1 }}>
          <Typography>
            See the&nbsp;
            <Link
              component={RouterLink}
              to={`/stock/${ticker}/financial-statements${location.search}`}
            >
              Financial Statements
            </Link>
            &nbsp;tab for the full financials.
          </Typography>
        </Box>
      </Section>
      <Section sx={{ display: "flex", gridColumnGap: 20, flexWrap: "wrap" }}>
        <SubSection>
          <IndustryAveragesResults />
        </SubSection>
      </Section>
      <Section>
        <DiscountedCashFlowSheet
          SubscribeCover={SubscribeCover}
          showSaveButton={!isAuthenticated}
          onSaveClick={handleSaveClick}
          isSaving={isSaving}
          onSaveEvent={handleSave}
        />
      </Section>
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(DiscountedCashFlow);
