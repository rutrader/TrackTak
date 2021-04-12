import React, { useState } from "react";
import { Box, Typography, FormControlLabel, Switch } from "@material-ui/core";
import ExportToExcel, { DCFControlTypography } from "./ExportToExcel";
import DiscountedCashFlowTable from "./DiscountedCashFlowTable";
import { useDispatch, useSelector } from "react-redux";
import { setIsYoyGrowthToggled } from "../redux/actions/dcfActions";
import selectIsYoyGrowthToggled from "../selectors/dcfSelectors/selectIsYoyGrowthToggled";
import useHasAllRequiredInputsFilledIn from "../hooks/useHasAllRequiredInputsFilledIn";
import withFundamentalsLoaded from "../hoc/withFundamentalsLoaded";
import SensitivityAnalysis from "../components/SensitivityAnalysis";
import Section from "../components/Section";
import { Fragment } from "react";

const DiscountedCashFlowSheet = ({
  columnWidths,
  SubscribeCover,
  loadingCells,
}) => {
  const dispatch = useDispatch();
  const [showFormulas, setShowFormulas] = useState(false);
  const isYoyGrowthToggled = useSelector(selectIsYoyGrowthToggled);
  const hasAllRequiredInputsFilledIn = useHasAllRequiredInputsFilledIn();
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
    <Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          mb: 0.5,
        }}
      >
        <Box>
          <Typography variant="h5" gutterBottom>
            DCF Valuation
          </Typography>
          <Typography gutterBottom>
            Need help? Check out the DCF docs&nbsp;
            <a
              href="https://tracktak.com/how-to-do-a-dcf"
              rel="noreferrer"
              target="_blank"
            >
              here.
            </a>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            rowGap: 1.2,
            columnGap: 2.5,
          }}
        >
          <DCFControlLabel
            disabled={!hasAllRequiredInputsFilledIn}
            control={
              <Switch
                checked={showFormulas}
                onChange={showFormulasToggledOnChange}
                color="primary"
              />
            }
            label={<DCFControlTypography>Formulas</DCFControlTypography>}
          />
          <DCFControlLabel
            disabled={!hasAllRequiredInputsFilledIn}
            control={
              <Switch
                checked={isYoyGrowthToggled}
                onChange={isYoyGrowthToggledOnChange}
                color="primary"
              />
            }
            label={<DCFControlTypography>%YOY Growth</DCFControlTypography>}
          />
          <ExportToExcel />
        </Box>
      </Box>
      <DiscountedCashFlowTable
        columnWidths={columnWidths}
        showFormulas={showFormulas}
        SubscribeCover={SubscribeCover}
        loadingCells={loadingCells}
      />
      <Section>
        <SensitivityAnalysis />
      </Section>
    </Fragment>
  );
};

const DCFControlLabel = (props) => (
  <FormControlLabel
    {...props}
    sx={{
      marginLeft: 0,
      marginRight: 0,
    }}
  />
);

export default withFundamentalsLoaded(DiscountedCashFlowSheet);
