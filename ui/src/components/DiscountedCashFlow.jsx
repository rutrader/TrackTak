import React, { useEffect } from "react";
import { useMediaQuery, useTheme } from "@material-ui/core";
import {
  DiscountedCashFlowSheet,
  withFundamentalsLoaded,
} from "@tracktak/intrinsic-valuations";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/actions/snackbarActions";
import useLocalStorageState from "use-local-storage-state";

const DiscountedCashFlow = () => {
  const [rotateSnackbarShown, setRotateSnackbarShown] = useLocalStorageState(
    "rotateSnackbarShown",
  );
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
    <React.Fragment>
      <DiscountedCashFlowSheet />
    </React.Fragment>
  );
};

export default withFundamentalsLoaded(DiscountedCashFlow);
