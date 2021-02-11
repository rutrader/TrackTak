import React, { useState } from "react";
import {
  Box,
  Typography,
  Link,
  CircularProgress,
  useTheme,
} from "@material-ui/core";
import "../shared/blueprintTheme.scss";
import { Link as RouterLink } from "react-router-dom";
import LazyLoad from "react-lazyload";
import ExportToExcel from "./ExportToExcel";
import DiscountedCashFlowTable from "./DiscountedCashFlowTable";
import { useDispatch, useSelector } from "react-redux";
import { setIsYoyGrowthToggled } from "../redux/actions/dcfActions";
import selectIsYoyGrowthToggled from "../selectors/dcfSelectors/selectIsYoyGrowthToggled";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import getRequiredInputsNotFilledInTitle from "../shared/getRequiredInputsNotFilledInTitle";
import selectHasAllRequiredInputsFilledIn from "../selectors/routerSelectors/selectHasAllRequiredInputsFilledIn";

const Placeholder = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing(10),
        height: 807,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

const DiscountedCashFlowSheet = ({ columnWidths }) => {
  const dispatch = useDispatch();
  const [showFormulas, setShowFormulas] = useState(false);
  const isYoyGrowthToggled = useSelector(selectIsYoyGrowthToggled);
  const hasAllRequiredInputsFilledIn = useSelector(
    selectHasAllRequiredInputsFilledIn,
  );

  const showFormulasToggledOnChange = (event) => {
    setShowFormulas((state) => !state);
    dispatch(setIsYoyGrowthToggled(false));
  };

  const isYoyGrowthToggledOnChange = (event) => {
    dispatch(setIsYoyGrowthToggled(!isYoyGrowthToggled));
    setShowFormulas(false);
  };

  // TODO: Add an expand button to see it full screen
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0.5,
        }}
      >
        <Typography variant="h5">DCF Valuation</Typography>
        <Box sx={{ display: "flex" }}>
          <FormControlLabel
            disabled={!hasAllRequiredInputsFilledIn}
            title={getRequiredInputsNotFilledInTitle(
              hasAllRequiredInputsFilledIn,
            )}
            control={
              <Switch
                checked={showFormulas}
                onChange={showFormulasToggledOnChange}
                color="primary"
              />
            }
            label="Formulas"
          />
          <Box
            sx={{
              ml: 1,
            }}
          >
            <FormControlLabel
              disabled={!hasAllRequiredInputsFilledIn}
              title={getRequiredInputsNotFilledInTitle(
                hasAllRequiredInputsFilledIn,
              )}
              control={
                <Switch
                  checked={isYoyGrowthToggled}
                  onChange={isYoyGrowthToggledOnChange}
                  color="primary"
                />
              }
              label="%YOY Growth"
            />
          </Box>
          <Box
            sx={{
              ml: 1,
            }}
          >
            <ExportToExcel />
          </Box>
        </Box>
      </Box>
      <Typography gutterBottom>
        Need help? Check out the DCF docs&nbsp;
        <Link
          component={RouterLink}
          to="/how-to-do-a-dcf"
          rel="noreferrer"
          target="_blank"
        >
          here.
        </Link>
      </Typography>
      <LazyLoad offset={300} placeholder={<Placeholder />}>
        <DiscountedCashFlowTable
          columnWidths={columnWidths}
          showFormulas={showFormulas}
        />
      </LazyLoad>
    </Box>
  );
};

export default DiscountedCashFlowSheet;
