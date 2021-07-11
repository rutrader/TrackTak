import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFundamentalsThunk,
  getLastPriceCloseThunk,
} from "../redux/thunks/fundamentalsThunks";
import selectFundamentalsIsLoaded from "../selectors/fundamentalSelectors/selectIsFundamentalsLoaded";
import Spreadsheet from "./Spreadsheet";

const SpreadsheetContainer = ({
  ticker,
  isSaving,
  onSaveEvent,
  spreadsheetToRestore,
  disableSetQueryParams = false
}) => {
  const dispatch = useDispatch();
  const isLoaded = useSelector(selectFundamentalsIsLoaded);

  useEffect(() => {
    dispatch(
      getFundamentalsThunk({
        ticker,
      }),
    );

    dispatch(
      getLastPriceCloseThunk({
        ticker,
      }),
    );
  }, [dispatch, ticker]);

  return isLoaded ? (
    <Spreadsheet
      isSaving={isSaving}
      onSaveEvent={onSaveEvent}
      spreadsheetToRestore={spreadsheetToRestore}
      disableSetQueryParams={disableSetQueryParams}
    />
  ) : null;
};

export default SpreadsheetContainer;
